import { Badge } from '@/components/ui/badge'
import type { ComponentDoc } from './types'

export const badgeDoc: ComponentDoc = {
  slug: 'badge',
  name: 'Badge',
  group: 'Display',
  description:
    'A small label that highlights status, category, or count alongside other content.',
  usage: (
    <>
      <p>
        Use a <code>Badge</code> to surface short, at-a-glance metadata such as a
        status, tag, or count. It renders a <code>{'<span>'}</code> by default,
        so it can sit inline inside text, headings, or other components. For a
        clickable badge, render an anchor via <code>asChild</code> rather than
        attaching click handlers to a static element.
      </p>
      <ul>
        <li>
          Keep the label terse—one or two words—so the badge stays
          compact and scannable.
        </li>
        <li>
          Don&apos;t rely on color alone to convey meaning; pair the{' '}
          <code>destructive</code> variant with clear text for accessibility.
        </li>
        <li>
          When a badge communicates dynamic state, add accessible text (e.g. via{' '}
          <code>aria-label</code>) so screen readers announce it.
        </li>
        <li>
          Use <code>asChild</code> to render a link or button when the badge needs
          to be interactive, preserving correct semantics and focus behavior.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Variants',
      description: 'The full set of visual styles.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="link">Link</Badge>
        </div>
      ),
      code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="link">Link</Badge>`,
    },
    {
      name: 'Colors',
      description:
        'Soft-tinted color variants using the global accent tokens (auto light/dark).',
      render: () => (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="red">Red</Badge>
          <Badge variant="orange">Orange</Badge>
          <Badge variant="yellow">Yellow</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="cyan">Cyan</Badge>
          <Badge variant="blue">Blue</Badge>
          <Badge variant="purple">Purple</Badge>
          <Badge variant="pink">Pink</Badge>
          <Badge variant="gray">Gray</Badge>
        </div>
      ),
      code: `<Badge variant="red">Red</Badge>
<Badge variant="orange">Orange</Badge>
<Badge variant="yellow">Yellow</Badge>
<Badge variant="green">Green</Badge>
<Badge variant="teal">Teal</Badge>
<Badge variant="cyan">Cyan</Badge>
<Badge variant="blue">Blue</Badge>
<Badge variant="purple">Purple</Badge>
<Badge variant="pink">Pink</Badge>
<Badge variant="gray">Gray</Badge>`,
    },
    {
      name: 'With a count',
      description: 'A numeric badge inline next to a label.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2">
            Inbox
            <Badge variant="secondary">12</Badge>
          </span>
          <span className="inline-flex items-center gap-2">
            Errors
            <Badge variant="destructive" aria-label="3 errors">
              3
            </Badge>
          </span>
        </div>
      ),
      code: `<span className="inline-flex items-center gap-2">
  Inbox
  <Badge variant="secondary">12</Badge>
</span>
<span className="inline-flex items-center gap-2">
  Errors
  <Badge variant="destructive" aria-label="3 errors">3</Badge>
</span>`,
    },
    {
      name: 'As a link (asChild)',
      description: 'Render an anchor so the badge is interactive and focusable.',
      render: () => (
        <Badge asChild variant="outline">
          <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
            Docs ↗
          </a>
        </Badge>
      ),
      code: `<Badge asChild variant="outline">
  <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
    Docs ↗
  </a>
</Badge>`,
    },
  ],
  props: [
    {
      prop: 'variant',
      type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "red" | "orange" | "yellow" | "green" | "teal" | "cyan" | "blue" | "purple" | "pink" | "gray"',
      default: '"default"',
      description: 'Visual style of the badge.',
    },
    {
      prop: 'asChild',
      type: 'boolean',
      default: 'false',
      description:
        'Merge props onto the single child element instead of rendering a <span>.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"span">',
      description: 'All native span attributes are forwarded.',
    },
  ],
}
