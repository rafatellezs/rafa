import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'
import type { EngineInterface as Engine } from 'claude-code'

import type { Summary, Tokens } from '../types'

const ctxPercent = atom({ plugin: 'toro-contexto', key: 'ctxPercent' } as const, null)
const ctxTokens = atom({ plugin: 'toro-contexto', key: 'ctxTokens' } as const, null)
const ctxWindow = atom({ plugin: 'toro-contexto', key: 'ctxWindow' } as const, null)
const limit = atom({ plugin: 'toro-contexto', key: 'limit' } as const, null)
const summary = atom({ plugin: 'toro-contexto', key: 'summary' } as const, { status: 'idle' } as Summary)
const isHidden = atom({ plugin: 'toro-contexto', key: 'isHidden' } as const, false)
const isCollapsed = atom({ plugin: 'toro-contexto', key: 'isCollapsed' } as const, true)
const tokens = atom({ plugin: 'toro-contexto', key: 'tokens' } as const, { fresh: 0, cached: 0, out: 0 } as Tokens)
const lastAt = atom({ plugin: 'toro-contexto', key: 'lastAt' } as const, null)

const state = { isBusy: false }
const WARN = 70
const CRIT = 80

const PROMPT = `Prepara un RESUMEN DE CONTINUIDAD para migrar este trabajo a una conversación nueva. Debe poder pegarse como primer mensaje y retomar sin perder calidad. Usa exactamente estas secciones en Markdown, en español, tuteando:

## Objetivo
## Decisiones tomadas (con su porqué)
## Datos relevantes (cifras, rutas de archivos, nombres, supuestos, estado de archivos modificados)
## Pendientes
## Próximos pasos (ordenados, el primero accionable de inmediato)
## Riesgos / cosas no verificadas

Sé concreto y denso; no inventes: si algo no consta en la conversación, márcalo [No verificado]. No uses herramientas.`

const STAGES = [
  { from: 0, name: 'Despejado', color: 'success' },
  { from: 50, name: 'Atento', color: 'suggestion' },
  { from: 70, name: 'Alerta', color: 'warning' },
  { from: 80, name: 'Crítico', color: 'error' },
] as const

const HEX: Record<string, string> = { success: '#3fb950', suggestion: '#58a6ff', warning: '#d29922', error: '#f85149' }

const stageOf = (pct: number) => [...STAGES].reverse().find(s => pct >= s.from) ?? STAGES[0]
const color = (pct: number) => stageOf(pct).color

const fmt = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}k` : `${n}`)

const mins = (ms: number) => {
  const m = Math.max(0, Math.round(ms / 60000))
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`
}

const OSBORNE = {
  body: 'M30.1,0.0L29.3,0.1L30.1,0.4L30.7,1.0L31.1,2.3L30.7,3.3L29.9,4.0L29.1,4.3L27.0,3.9L25.1,4.3L23.2,4.3L20.6,5.3L19.0,5.5L18.1,4.8L18.2,2.9L19.0,1.8L18.4,2.1L17.2,3.8L17.0,4.7L17.0,5.9L17.7,6.9L19.5,7.5L19.3,8.0L18.0,8.7L19.2,9.3L19.3,9.8L16.5,12.0L14.1,14.6L12.9,14.9L9.1,15.3L5.8,15.3L2.1,15.8L1.8,16.2L1.8,16.8L1.1,18.7L1.0,20.0L1.3,23.5L0.2,27.4L0.0,28.7L0.9,28.7L0.8,27.1L1.2,26.8L1.0,26.6L1.2,25.7L1.6,25.8L1.7,28.7L6.2,28.7L6.3,27.9L6.8,28.0L6.8,28.7L6.8,28.3L7.2,28.3L7.5,28.7L10.5,28.7L10.6,28.4L11.1,28.7L12.5,28.7L12.9,28.4L14.5,28.7L25.4,28.7L25.4,28.4L25.8,28.3L25.5,27.7L25.7,26.8L26.4,26.9L26.5,28.7L26.4,24.8L27.3,22.0L27.5,20.3L27.0,16.5L28.0,11.4L28.2,8.5L28.8,8.4L30.1,8.7L30.1,8.1L30.7,8.1L31.2,7.5L31.5,7.0L30.3,6.4L30.2,6.0L30.9,5.4L31.2,5.4L31.3,5.9L31.3,5.1L31.7,4.6L32.3,3.1L32.2,2.1L31.8,1.2L31.1,0.4L30.2,0.1Z',
  legs: 'M25.1,27.9L22.5,27.9L22.7,35.7L22.7,38.0L24.7,38.0L24.5,35.7Z M18.4,27.9L15.8,27.9L15.9,35.7L15.9,38.0L18.0,38.0L18.0,35.7Z M12.1,27.9L8.1,27.9L8.3,32.4L10.1,37.8L11.7,37.8L10.0,34.0Z M4.4,27.9L1.2,27.9L1.6,34.0L1.8,37.6L3.5,37.6L3.5,34.0Z',
  tail: 'M1.6,20.0L0.4,24.2L-0.2,28.3L0.0,34.5L0.8,34.7L0.9,29.9L1.3,25.8Z',
}


// Llamas: base en (cx, base), altura h, ancho w; tres capas anidadas.
const flame = (cx: number, base: number, h: number, w: number, c: string) =>
  `<path d="M${cx},${base}C${cx - w},${base - h * 0.3} ${cx - w * 0.5},${base - h * 0.7} ${cx},${base - h}C${cx + w * 0.5},${base - h * 0.65} ${cx + w},${base - h * 0.3} ${cx},${base}Z" fill="${c}"/>`

const FIRE = ['#f85149', '#ff8c3a', '#ffd166']
const fire = (cx: number, base: number, h: number, w: number) =>
  flame(cx, base, h, w, FIRE[0]!) + flame(cx, base, h * 0.72, w * 0.62, FIRE[1]!) + flame(cx, base, h * 0.42, w * 0.32, FIRE[2]!)

const BACK: [number, number, number][] = [[4, 15.6, 6], [8, 15.4, 7.5], [12, 15, 6.5], [15.5, 13.6, 8], [19, 10.8, 7], [22, 8.4, 7.5], [25, 6, 6.5]]

const bullSvg = (x: number, y: number, c: string, k: number, isFire: boolean) => {
  return `<g transform="translate(${x - 32.3 * k},${y - 38 * k}) scale(${k})">
  <ellipse cx="16" cy="38.4" rx="19" ry="1.2" fill="${c}" opacity=".5"/>
  <g stroke="${c}" stroke-width="1.3" stroke-linecap="round" opacity=".75"><path d="M-22,14H-6"/><path d="M-18,21H-4"/><path d="M-14,28H-2"/></g>
  <g fill="#14181d" stroke="#d0d7de" stroke-width=".35" stroke-linejoin="round">
    <path d="${OSBORNE.body}"/><path d="${OSBORNE.legs}"/><path d="${OSBORNE.tail}"/><rect x="1.3" y="26" width="25.7" height="3.2" stroke="none"/>
  </g>
  ${isFire ? BACK.map(([bx, by, h]) => fire(bx, by + 1, h, h * 0.42)).join('') : ''}
  </g>`
}

const WIDTH = 560
const HALF = 270
const BH = 8

// Decorado de cada etapa: pasto, agua, llamitas, llamas rojas.
const scenery = (i: number, x: number, w: number, Y: number) => {
  const b = Y + BH
  let out = ''
  if (i === 0) {
    out += `<rect x="${x}" y="${b - 4}" width="${w}" height="4" rx="1.5" fill="#2ea043"/>`
    for (let bx = x + 1; bx < x + w - 2; bx += 3) {
      const hh = 4 + ((bx * 7) % 4)
      out += `<path d="M${bx},${b - 3}L${bx + 1.2},${b - 3 - hh}L${bx + 2.4},${b - 3}Z" fill="${bx % 2 ? '#3fb950' : '#56d364'}"/>`
    }
  } else if (i === 1) {
    out += `<rect x="${x}" y="${Y + 2}" width="${w}" height="${BH - 2}" rx="2" fill="#1f6feb"/>`
    let d1 = '', d2 = ''
    for (let bx = x; bx <= x + w; bx += 2) {
      d1 += `${bx === x ? 'M' : 'L'}${bx},${(Y + 3 + Math.sin(bx * 0.9) * 1.4).toFixed(1)}`
      d2 += `${bx === x ? 'M' : 'L'}${bx},${(Y + 6.5 + Math.sin(bx * 0.9 + 2) * 1.2).toFixed(1)}`
    }
    out += `<path d="${d1}" fill="none" stroke="#79c0ff" stroke-width="1.2"/><path d="${d2}" fill="none" stroke="#a5d6ff" stroke-width=".9" opacity=".6"/>`
  } else if (i === 2) {
    out += `<rect x="${x}" y="${b - 3}" width="${w}" height="3" rx="1.5" fill="#9e6a03"/>`
    for (let bx = x + 2; bx < x + w - 1; bx += 4)
      out += flame(bx, b - 2, 5 + ((bx * 5) % 4), 1.9, bx % 8 < 4 ? '#d29922' : '#f2cc60')
  } else {
    out += `<rect x="${x}" y="${b - 3}" width="${w}" height="3" rx="1.5" fill="#8e1519"/>`
    for (let bx = x + 2; bx < x + w - 1; bx += 4) out += fire(bx, b - 2, 9 + ((bx * 3) % 5), 2.6)
  }
  return out
}

// Un medidor: etiqueta, avance escénico por etapas, toro y porcentaje.
const meterSvg = (ox: number, label: string, pct: number) => {
  const X0 = ox + 22, W = 196, Y = 30
  const p = Math.max(0, Math.min(100, pct))
  const st = stageOf(p)
  const hex = HEX[st.color]!
  let defs = '', bands = ''
  STAGES.forEach((s, i) => {
    const a = s.from
    const b = i < 3 ? STAGES[i + 1]!.from : 100
    const x = X0 + (W * a) / 100 + (i ? 1 : 0)
    const w = (W * (b - a)) / 100 - (i ? 1 : 0) - (i < 3 ? 1 : 0)
    const fillW = (Math.max(0, Math.min(b, p) - a) / (b - a)) * w
    const art = scenery(i, x, w, Y)
    bands += `<g opacity=".22">${art}</g>`
    if (fillW > 0) {
      defs += `<clipPath id="c${ox}_${i}"><rect x="${x}" y="${Y - 16}" width="${fillW}" height="${BH + 18}"/></clipPath>`
      bands += `<g clip-path="url(#c${ox}_${i})">${art}</g>`
    }
  })
  const nose = X0 + (W * p) / 100 + 6
  return `<defs>${defs}</defs><text x="${ox}" y="${Y + 7}" font-size="8.5" font-weight="700" fill="#8b949e">${label}</text>${bands}${bullSvg(nose, Y + 3, hex, 0.7, p >= CRIT)}<text x="${ox + HALF - 4}" y="${Y + 7}" font-size="10" font-weight="700" fill="${hex}" text-anchor="end">${Math.round(p)}%</text>`
}

type Line = { color: string; text: string }

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;')

const svgText = (lines: Line[], y0: number) =>
  lines.map((l, i) => `<text x="0" y="${y0 + i * 11}" font-size="8.5" fill="${l.color}">${esc(l.text)}</text>`).join('')

const bandSvg = (ctx: number | null, five: number | null, lines: Line[]) => {
  const h = 42 + lines.length * 11
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${h}" width="${WIDTH}" height="${h}" font-family="-apple-system,Helvetica,Arial,sans-serif">${ctx !== null ? meterSvg(0, 'CTX', ctx) : ''}${five !== null ? meterSvg(ctx !== null ? HALF + 20 : 0, '5h', five) : ''}${svgText(lines, 50)}</svg>`
}

// Línea mínima (modo minimizado) con tramos de color.
const stripSvg = (parts: Line[]) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} 14" width="${WIDTH}" height="14" font-family="-apple-system,Helvetica,Arial,sans-serif"><text x="0" y="10.5" font-size="9.5">${parts.map(q => `<tspan fill="${q.color}" font-weight="600">${esc(q.text)}</tspan>`).join('')}</text></svg>`

const eta = (iso: string | undefined, now: number) => {
  if (!iso) return ''
  const ms = Date.parse(iso) - now
  if (!Number.isFinite(ms) || ms <= 0) return ''
  return `reinicia en ${mins(ms)}`
}

const stamp = (ms: number) => {
  const d = new Date(ms)
  const z = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}_${z(d.getHours())}${z(d.getMinutes())}`
}

async function prepare($: Engine, pct: number) {
  if (state.isBusy) return
  state.isBusy = true
  await update($, summary, () => ({ status: 'working' }) as Summary)
  try {
    const r = await $.model.fork({ prompt: PROMPT })
    if (!r.isAnswered) {
      await update($, summary, () => ({ status: 'error', reason: r.reason }) as Summary)
      return
    }
    const home = (await $.env.get('HOME')) ?? '.'
    const path = `${home}/.claude/continuidad/continuidad_${stamp(await $.clock.now())}.md`
    await $.fs.write(path, r.text)
    await update($, tokens, t => ({
      fresh: t.fresh + r.usage.input_tokens + r.usage.cache_creation_input_tokens,
      cached: t.cached + r.usage.cache_read_input_tokens,
      out: t.out + r.usage.output_tokens,
    }))
    await update($, summary, () => ({ status: 'ready', path, text: r.text, atPercent: pct }) as Summary)
    $.ui.toast(`Resumen de continuidad listo (${pct}%)`)
  } catch (err) {
    await update($, summary, () => ({ status: 'error', reason: String(err) }) as Summary)
  } finally {
    state.isBusy = false
  }
}

export const register: Register = (on, options) => {
  let lastLevel = 0
  const ttlMs = (Number(options.cacheTtlMinutes) || 60) * 60000
  let timer: { cancel: () => void } | null = null

  on('session.measure', async ($, e, next) => {
    const c = e.context
    await update($, ctxPercent, () => c.percent ?? null)
    await update($, ctxTokens, () => c.tokens ?? null)
    await update($, ctxWindow, () => c.window ?? null)
    const five = e.rateLimits.find(l => l.kind === 'five_hour')
    await update($, limit, () => (five ? { percent: five.percentUsed, resetsAt: five.resetsAt } : null))

    const pct = c.percent ?? 0
    const level = pct >= CRIT ? 2 : pct >= WARN ? 1 : 0
    if (pct < 60 && lastLevel !== 0) {
      lastLevel = 0
      await update($, summary, () => ({ status: 'idle' }) as Summary)
      await update($, isHidden, () => false)
    }
    if (level > lastLevel) {
      lastLevel = level
      await update($, isHidden, () => false)
      await update($, isCollapsed, () => false)
      $.ui.toast(
        level === 2
          ? `Contexto al ${pct}%: migra a una conversación nueva`
          : `Contexto al ${pct}%: preparando resumen de continuidad`,
      )
      void prepare($, pct)
    }
    return next(e)
  })

  on('turn.step', async function* ($, e, next) {
    const r = yield* next(e)
    const u = r.usage
    if (u) {
      await update($, tokens, t => ({
        fresh: t.fresh + u.input_tokens + u.cache_creation_input_tokens,
        cached: t.cached + u.cache_read_input_tokens,
        out: t.out + u.output_tokens,
      }))
      if (!e.agentId) await update($, lastAt, () => Date.now())
    }
    return r
  })

  on('session.end', async ($, e, next) => {
    if (e.reason === 'clear') {
      await update($, tokens, () => ({ fresh: 0, cached: 0, out: 0 }))
      await update($, lastAt, () => null)
      await update($, summary, () => ({ status: 'idle' }) as Summary)
      lastLevel = 0
    }
    return next(e)
  })

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'continuidad',
      description: 'Genera ahora el resumen de continuidad para migrar de conversación',
    })
    await $.command.register({ name: 'toro', description: 'Minimiza o expande el medidor del toro' })
    timer?.cancel()
    timer = $.clock.every(30000, () => $.ui.invalidate('ui.render'))
    return next(e)
  })

  on('command.run', { command: 'continuidad' }, async $ => {
    const pct = (await read($, ctxPercent)) ?? 0
    void prepare($, pct)
    return { text: 'Preparando resumen de continuidad…' }
  })

  on('command.run', { command: 'toro' }, async $ => {
    await update($, isCollapsed, v => !v)
    return { text: 'Listo.' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const pct = await read($, ctxPercent)
    const lim = await read($, limit)
    if (pct === null && lim === null) return next(e)

    const { Box, Text, Button, Svg: SvgEl } = $.ui.resolve(e) as any
    const Svg = e.surface === 'terminal' ? null : SvgEl
    const now = Date.now()
    const sum = await read($, summary)
    const hidden = await read($, isHidden)
    const used = await read($, ctxTokens)
    const win = await read($, ctxWindow)
    const collapsed = await read($, isCollapsed)
    const tot = await read($, tokens)
    const at = await read($, lastAt)

    const left = at === null ? null : at + ttlMs - now
    const isWarm = left !== null && left > 0
    const cacheColor = left === null ? 'inactive' : left < 120000 ? 'warning' : 'success'
    const cacheHex = left === null ? '#8b949e' : left < 120000 ? HEX.warning! : HEX.success!
    const cacheShort = left === null ? 'caché —' : isWarm ? `caché ${mins(left)}` : 'caché frío'
    const cacheLong =
      left === null
        ? 'Caché: sin datos todavía en esta sesión.'
        : isWarm
          ? `Caché vigente · expira en ${mins(left)} (cada mensaje la renueva) · tu siguiente mensaje cuesta poco`
          : `Caché frío · tu siguiente mensaje reescribe ~${fmt(used ?? 0)} tokens a tarifa de escritura (más caro)`
    const own = tot.fresh + tot.out
    const resetNote = lim ? eta(lim.resetsAt, now) : ''
    const warn = pct !== null && pct >= WARN && !hidden
    const detail =
      `${win && used ? `Contexto ${fmt(used)}/${fmt(win)} · ` : ''}${resetNote ? `5h ${resetNote} · ` : ''}` +
      `Tokens: ${fmt(own)} propios (${fmt(tot.fresh)} nuevos + ${fmt(tot.out)} salida) · ${fmt(tot.cached)} leídos de caché`

    const toggle = (label: string) => (
      <Button key="toggle" label={label} onPress={() => update($, isCollapsed, v => !v)} />
    )

    if (collapsed) {
      const parts: Line[] = []
      if (pct !== null) parts.push({ color: HEX[color(pct)]!, text: `CTX ${Math.round(pct)}%` })
      if (lim) parts.push({ color: '#8b949e', text: ' · ' }, { color: HEX[color(lim.percent)]!, text: `5h ${Math.round(lim.percent)}%` })
      parts.push({ color: '#8b949e', text: ' · ' }, { color: cacheHex, text: cacheShort })
      parts.push({ color: '#8b949e', text: ` · Σ ${fmt(own)}` })
      if (warn) parts.push({ color: HEX[color(pct)]!, text: ' · ⚠ migra (/continuidad)' })
      return (
        <Box>
          {toggle('▸ ')}
          {Svg ? (
            <Svg source={stripSvg(parts)} alt={parts.map(q => q.text).join('')} />
          ) : (
            <Text dimColor>{parts.map(q => q.text).join('')}</Text>
          )}
        </Box>
      )
    }

    const bar = (p: number) => {
      const n = Math.round((Math.max(0, Math.min(100, p)) / 100) * 12)
      return { on: '━'.repeat(n), off: '─'.repeat(12 - n) }
    }
    const cell = (label: string, p: number) => {
      const b = bar(p)
      return (
        <Text>
          <Text bold>{label} </Text>
          <Text color={color(p)}>{b.on}▶</Text>
          <Text dimColor>{b.off}</Text>
          <Text color={color(p)} bold> {Math.round(p)}%</Text>
        </Text>
      )
    }
    const strip = Svg ? (
      <Svg
        source={bandSvg(pct, lim ? lim.percent : null, [{ color: cacheHex, text: cacheLong }, { color: '#8b949e', text: detail }])}
        alt={`Contexto ${pct ?? '—'}%${lim ? `, ventana 5h ${Math.round(lim.percent)}%` : ''}`}
      />
    ) : (
      <Box>
        {pct !== null && cell('CTX', pct)}
        {lim && <Text dimColor>  </Text>}
        {lim && cell('5h', lim.percent)}
      </Box>
    )

    return (
      <Box flexDirection="column">
        {toggle('▾ Minimizar')}
        {strip}
        {!Svg && <Text color={cacheColor}>{cacheLong}</Text>}
        {!Svg && <Text dimColor>{detail}</Text>}
        {warn && (
          <Box flexDirection="column">
            <Text color={color(pct)} bold>
              {pct >= CRIT ? '⚠ Contexto crítico' : '⚠ Contexto alto'} ({pct}%): migra a una conversación nueva antes de que baje la calidad.
            </Text>
            <Text dimColor>
              {sum.status === 'working' && 'Preparando resumen de continuidad…'}
              {sum.status === 'ready' && `Resumen listo (${sum.atPercent}%): ${sum.path}`}
              {sum.status === 'error' && `No pude generar el resumen: ${sum.reason}. Reintenta con /continuidad`}
              {sum.status === 'idle' && 'Usa /continuidad para generar el resumen.'}
            </Text>
            <Box>
              {sum.status === 'ready' && (
                <Button
                  key="copy"
                  label="Copiar resumen "
                  onPress={async (press: { surface: any }) => {
                    const r = await $.ui.copy({ text: sum.text, surface: press.surface })
                    $.ui.toast(r.isCopied ? 'Resumen copiado' : 'No pude copiar; abre el archivo')
                  }}
                />
              )}
              <Button key="regen" label="Regenerar " onPress={() => prepare($, pct)} />
              <Button key="hide" label="Ocultar aviso" onPress={() => update($, isHidden, () => true)} />
            </Box>
          </Box>
        )}
      </Box>
    )
  })
}
