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
      prop: 'asChild',
      type: 'boolean',
      default: 'false',
      description:
        'Merge props onto the single child element instead of rendering a <button>.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"button">',
      description: 'All native button attributes are forwarded.',
    },
  ],
}
