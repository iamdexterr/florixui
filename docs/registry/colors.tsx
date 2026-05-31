import type { ComponentDoc } from './types'

const ACCENTS = [
  { name: 'red', bg: 'bg-red', fg: 'text-red-foreground' },
  { name: 'orange', bg: 'bg-orange', fg: 'text-orange-foreground' },
  { name: 'blue', bg: 'bg-blue', fg: 'text-blue-foreground' },
  { name: 'green', bg: 'bg-green', fg: 'text-green-foreground' },
] as const

function Swatch({
  name,
  bg,
  fg,
}: {
  name: string
  bg: string
  fg: string
}) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div
        className={`flex h-20 items-end p-3 ${bg} ${fg}`}
      >
        <span className="text-sm font-medium">Aa</span>
      </div>
      <div className="space-y-0.5 p-3 text-xs">
        <p className="font-mono">bg-{name}</p>
        <p className="font-mono text-muted-foreground">text-{name}-foreground</p>
      </div>
    </div>
  )
}

export const colorsDoc: ComponentDoc = {
  slug: 'colors',
  name: 'Colors',
  group: 'Custom',
  description:
    'Global semantic accent colors — red, orange, blue, green — each with a foreground pairing and distinct light/dark shades. Independent of the active theme.',
  usage: (
    <>
      <p>
        These accents are defined once globally, so they stay consistent across
        all themes (unlike <code>primary</code>, which changes per theme). Each
        color has a matching <code>-foreground</code> for text/icons placed on
        it, and each has its own light- and dark-mode shade.
      </p>
      <ul>
        <li>
          Use them as Tailwind utilities: <code>bg-red</code>,{' '}
          <code>text-blue</code>, <code>border-green</code>,{' '}
          <code>text-orange-foreground</code>, etc.
        </li>
        <li>
          Pair a background with its foreground for legible contrast — e.g.{' '}
          <code>bg-red text-red-foreground</code>.
        </li>
        <li>
          They&apos;re great for status chips, tags, and callouts where the
          meaning (error, warning, info, success) should not shift with the
          theme.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Swatches',
      description: 'Toggle dark mode (top bar) to see the dark shades.',
      render: () => (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {ACCENTS.map((a) => (
            <Swatch key={a.name} name={a.name} bg={a.bg} fg={a.fg} />
          ))}
        </div>
      ),
      code: `<div className="bg-red text-red-foreground">…</div>
<div className="bg-orange text-orange-foreground">…</div>
<div className="bg-blue text-blue-foreground">…</div>
<div className="bg-green text-green-foreground">…</div>`,
    },
    {
      name: 'As status chips',
      render: () => (
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-red px-2 py-0.5 text-xs font-medium text-red-foreground">
            Error
          </span>
          <span className="rounded-md bg-orange px-2 py-0.5 text-xs font-medium text-orange-foreground">
            Warning
          </span>
          <span className="rounded-md bg-blue px-2 py-0.5 text-xs font-medium text-blue-foreground">
            Info
          </span>
          <span className="rounded-md bg-green px-2 py-0.5 text-xs font-medium text-green-foreground">
            Success
          </span>
        </div>
      ),
      code: `<span className="rounded-md bg-red px-2 py-0.5 text-red-foreground">Error</span>
<span className="rounded-md bg-orange px-2 py-0.5 text-orange-foreground">Warning</span>
<span className="rounded-md bg-blue px-2 py-0.5 text-blue-foreground">Info</span>
<span className="rounded-md bg-green px-2 py-0.5 text-green-foreground">Success</span>`,
    },
    {
      name: 'Text & border',
      render: () => (
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-medium text-red">Red text</span>
          <span className="font-medium text-blue">Blue text</span>
          <span className="rounded-md border-2 border-green px-3 py-1 text-green">
            Green outline
          </span>
        </div>
      ),
      code: `<span className="text-red">Red text</span>
<span className="text-blue">Blue text</span>
<span className="border-2 border-green text-green">Green outline</span>`,
    },
  ],
  props: [
    {
      prop: 'bg-{color}',
      type: 'utility',
      description: 'Background: bg-red, bg-orange, bg-blue, bg-green.',
    },
    {
      prop: 'text-{color}',
      type: 'utility',
      description: 'Text color: text-red, text-orange, text-blue, text-green.',
    },
    {
      prop: 'text-{color}-foreground',
      type: 'utility',
      description: 'Foreground for content placed on the matching background.',
    },
    {
      prop: 'border-{color}',
      type: 'utility',
      description: 'Border color: border-red, border-blue, etc.',
    },
    {
      prop: '--{color} / --{color}-foreground',
      type: 'CSS variable',
      description: 'Raw tokens, e.g. var(--green), with light/dark shades.',
    },
  ],
}
