export type Limit = { percent: number; resetsAt?: string }
export type Tokens = { fresh: number; cached: number; out: number }
export type Summary =
  | { status: 'idle' }
  | { status: 'working' }
  | { status: 'ready'; path: string; text: string; atPercent: number }
  | { status: 'error'; reason: string }

declare module 'claude-code' {
  interface PluginState {
    'toro-contexto': {
      ctxPercent: number | null
      ctxTokens: number | null
      ctxWindow: number | null
      limit: Limit | null
      summary: Summary
      isHidden: boolean
      isCollapsed: boolean
      tokens: Tokens
      lastAt: number | null
    }
  }
}
