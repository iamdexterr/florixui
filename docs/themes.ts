// Docs metadata for the shippable themes defined in src/themes.css.
// `swatch` is the theme's primary color (light mode) for the picker preview.

export interface ThemeMeta {
  slug: string
  label: string
  /** Primary color, used as the picker swatch. */
  swatch: string
  /** Short note about the typeface / feel. */
  note: string
}

export const themes: ThemeMeta[] = [
  {
    slug: 'slate-blue',
    label: 'Slate Blue',
    swatch: 'hsl(208.8889 55.5556% 52.3529%)',
    note: 'Calm blue on slate · Inter',
  },
  {
    slug: 'crimson',
    label: 'Crimson',
    swatch: 'hsl(356.9460 95.8988% 57.7229%)',
    note: 'Vivid red · Inter + JetBrains Mono',
  },
  {
    slug: 'terracotta',
    label: 'Terracotta',
    swatch: 'hsl(8.5185 64.2857% 50.5882%)',
    note: 'Warm rust · DM Sans family',
  },
  {
    slug: 'indigo',
    label: 'Indigo',
    swatch: 'hsl(226.3043 87.6190% 58.8235%)',
    note: 'Bold indigo · Inter + Merriweather',
  },
  {
    slug: 'azure',
    label: 'Azure',
    swatch: 'hsl(217.2193 91.2195% 59.8039%)',
    note: 'Bright blue · Inter + JetBrains Mono',
  },
]

export const DEFAULT_THEME = themes[0].slug
