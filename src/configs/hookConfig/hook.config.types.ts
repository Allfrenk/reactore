export type HookActionConfig = {
  id: string
  title: string
  subtitle?: string
  ctaLabel: string
  actionKey: string
}

export type HookExplainConfig = {
  id: string
  title: string
  subtitle?: string
  description: string
  code?: string
  note?: string
}

export type HookConfig = {
  actions: HookActionConfig[]
  explain: HookExplainConfig[]
}
