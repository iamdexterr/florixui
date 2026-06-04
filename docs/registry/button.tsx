import { ArrowRightIcon, PlusIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const buttonDoc: ComponentDoc = {
  slug: 'button',
  name: 'Button',
  group: 'Forms',
  description:
    'Triggers an action or event, such as submitting a form or opening a dialog.',
  usage: (
    <>
      <p>
        Use a <code>Button</code> for actions the user takes on the current page
        (submit, save, open a dialog). For navigation to another page, prefer a
        link styled with <code>variant="link"</code>, or render a link element
        via <code>asChild</code>.
      </p>
      <ul>
        <li>
          Reserve the <code>default</code> (primary) variant for the single most
          important action in a view.
        </li>
        <li>
          Use <code>destructive</code> for irreversible actions like delete, and
          pair it with a confirmation step.
        </li>
        <li>
          The button is keyboard focusable and shows a visible focus ring;
          don&apos;t remove the outline.
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
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
      code: `<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
    },
    {
      name: 'Sizes',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      ),
      code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`,
    },
    {
      name: 'Disabled',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Default</Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
        </div>
      ),
      code: `<Button disabled>Default</Button>
<Button variant="outline" disabled>Outline</Button>`,
    },
    {
      name: 'With start / end items',
      description:
        'Pass startItem / endItem for leading or trailing icons (or any node).',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button startItem={<PlusIcon />}>Add item</Button>
          <Button variant="outline" endItem={<ArrowRightIcon />}>
            Continue
          </Button>
          <Button variant="destructive" startItem={<TrashIcon />}>
            Delete
          </Button>
        </div>
      ),
      code: `<Button startItem={<PlusIcon />}>Add item</Button>
<Button variant="outline" endItem={<ArrowRightIcon />}>Continue</Button>
<Button variant="destructive" startItem={<TrashIcon />}>Delete</Button>`,
    },
    {
      name: 'Loading',
      description:
        'loading shows a spinner (in place of startItem) and disables the button.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button loading>Saving…</Button>
          <Button variant="outline" loading>
            Loading
          </Button>
        </div>
      ),
      code: `<Button loading>Saving…</Button>
<Button variant="outline" loading>Loading</Button>`,
    },
    {
      name: 'Icon size',
      description:
        'Icons auto-size to 1rem. Pass a size-* class on the icon to override.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button startItem={<PlusIcon />}>Default icon</Button>
          <Button startItem={<PlusIcon className="size-5" />}>
            Larger icon
          </Button>
        </div>
      ),
      code: `// auto-sized (1rem)
<Button startItem={<PlusIcon />}>Default icon</Button>
// override with a size-* class on the icon
<Button startItem={<PlusIcon className="size-5" />}>Larger icon</Button>`,
    },
    {
      name: 'As a link (asChild)',
      render: () => (
        <Button asChild variant="link">
          <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
            Open shadcn/ui ↗
          </a>
        </Button>
      ),
      code: `<Button asChild variant="link">
  <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
    Open shadcn/ui ↗
  </a>
</Button>`,
    },
  ],
  props: [
    {
      prop: 'variant',
      type: '"default" | "secondary" | "outline" | "destructive" | "ghost" | "link"',
      default: '"default"',
      description: 'Visual style of the button.',
    },
    {
      prop: 'size',
      type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
      default: '"default"',
      description: 'Controls height, padding, and icon sizing.',
    },
    {
      prop: 'startItem',
      type: 'React.ReactNode',
      description: 'Content before the label, e.g. a leading icon.',
    },
    {
      prop: 'endItem',
      type: 'React.ReactNode',
      description: 'Content after the label, e.g. a trailing icon or count.',
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      description:
        'Shows a spinner (replacing startItem) and disables the button.',
    },
    {
      prop: 'asChild',
      type: 'boolean',
      default: 'false',
      description:
        'Merge props onto the single child element instead of rendering a <button>. (Affixes/loading are not injected in this mode.)',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"button">',
      description: 'All native button attributes are forwarded.',
    },
  ],
}
