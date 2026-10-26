import { expect, test } from 'claude-code/testing'

const BAND = {
  plugin: 'toro-contexto',
  component: 'AbovePrompt',
  requestId: 'band',
  props: { hasSurvey: false, isWorking: false, maxRows: 10, bodyColumns: 100, scroll: { offset: 0, bodyRows: 10 }, view: {} },
} as const

test('el toro dibuja contexto y límite de 5h, y avisa al 75%', async ($, on) => {
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('command.register', () => ({ value: { command: 'continuidad' } }))
  on('session.measure', (_, e) => ({ changed: e.changed }))
  on('clock.now', () => ({ value: 1_000_000 }))
  on('ui.toast', () => ({ value: undefined }))
  on('model.fork', () => ({ value: { isAnswered: false, reason: 'nothing-to-fork', usage: {} } }))

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  await $.session.measure({
    context: { window: 200000, tokens: 150000, percent: 75 },
    rateLimits: [{ kind: 'five_hour', percentUsed: 40 }],
    changed: ['context', 'rateLimits'],
  })

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect(await ui.find({ type: 'Text', text: /CTX/ })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: /75%/ })).toBeTruthy()
  expect(await ui.find({ type: 'Text', text: /Contexto alto/ })).toBeTruthy()
  await ui.unmount()

  const d = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await d.find({ type: 'Svg' })).toBeTruthy()
  await d.unmount()
})

test('minimizado muestra la línea resumen y cuenta los tokens de cada paso', async ($, on) => {
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('command.register', () => ({ value: { command: 'toro' } }))
  on('clock.every', () => ({ value: undefined }))
  on('session.measure', (_, e) => ({ changed: e.changed }))
  on('turn.step', async function* (_, e) {
    return {
      turnId: e.turnId,
      index: e.index,
      answer: '',
      toolUses: [],
      stopReason: 'end_turn',
      usage: { input_tokens: 1000, output_tokens: 500, cache_read_input_tokens: 9000, cache_creation_input_tokens: 2000, model: 'm' },
    }
  })

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  await $.session.measure({
    context: { window: 200000, tokens: 40000, percent: 20 },
    rateLimits: [],
    changed: ['context'],
  })
  const stream = $.turn.step({ turnId: 't1', index: 0, model: 'm', messageCount: 1 })
  for await (const _ of stream) void _
  await stream.result

  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  const strip = await ui.find({ type: 'Svg' })
  // 1000 + 2000 nuevos + 500 salida = 3.5k propios; la caché leída no entra en Σ
  expect(strip?.props?.source).toContain('Σ 4k')
  await ui.unmount()
})
