# toro-contexto

Mod de Claude Code (escritorio y terminal) que dibuja sobre la barra de texto:

- **Contexto (CTX)** y **ventana de uso de 5h**: un toro de Osborne avanza por una pista con etapas (pasto 0–50%, agua 50–70%, llamitas 70–80%, llamas 80–100% con el toro en fuego).
- **Aviso a 70% / 80%** y resumen de continuidad automático (objetivo, decisiones, datos, pendientes, próximos pasos) guardado en `~/.claude/continuidad/`.
- **Caché de prompts**: vigente (con minutos restantes) o frío.
- **Tokens acumulados** de la conversación (propios, nuevos, salida y leídos de caché).
- **Minimizable**: `/toro` o el botón ▸/▾. `/continuidad` genera el resumen cuando quieras.

## Uso

```bash
claude --plugin-dir mods/toro-contexto
```

Opción `cacheTtlMinutes` (5 o 60, por defecto 60): vigencia del caché de tu sesión.

## Notas

- La silueta del toro se trazó de una foto CC0 de Wikimedia Commons. El toro de Osborne es marca registrada en España: sustitúyela si vas a distribuir el mod.
- Los contadores empiezan en cero al abrir o reanudar la sesión y se reinician con `/clear`.
