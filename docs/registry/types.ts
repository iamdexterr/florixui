import type { ReactNode } from 'react'

/** A single live example: a rendered preview paired with its source code. */
export interface Example {
  name: string
  description?: string
  render: () => ReactNode
  code: string
}

/** One row in a component's props/API table. */
export interface PropDoc {
  prop: string
  type: string
  default?: string
  description: string
}

/** A documented component — drives both the sidebar and its doc page. */
export interface ComponentDoc {
  /** URL slug, e.g. "button" -> #/button */
  slug: string
  name: string
  description: string
  /** Optional grouping for the sidebar (e.g. "Forms", "Overlays"). */
  group?: string
  /** Short prose: when to use, a11y notes, do's & don'ts. */
  usage?: ReactNode
  examples: Example[]
  props: PropDoc[]
}
