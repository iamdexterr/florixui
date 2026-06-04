import type { ReactNode } from 'react'

/** One small "bit" component in the gallery: a live render + copy-able source. */
export interface BitSpec {
  id: string
  /** Component name, e.g. "QuickStat". */
  name: string
  /** One-line description of what it's for. */
  description: string
  /** Live preview. */
  render: () => ReactNode
  /** Copy-able usage snippet. */
  code: string
}
