import type { ReactNode } from 'react'

export type ChartCategory =
  | 'Area'
  | 'Bar'
  | 'Line'
  | 'Pie'
  | 'Radar'
  | 'Radial'

/** One chart in the gallery: a live render + its copy-able source. */
export interface ChartSpec {
  id: string
  title: string
  description?: string
  category: ChartCategory
  render: () => ReactNode
  code: string
  /** Span the full grid width (for richer, complex charts). */
  wide?: boolean
}
