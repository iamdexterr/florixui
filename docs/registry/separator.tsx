import { Separator } from '@/components/ui/separator'
import type { ComponentDoc } from './types'

export const separatorDoc: ComponentDoc = {
  slug: 'separator',
  name: 'Separator',
  group: 'Layout',
  description:
    'Visually or semantically divides content, either horizontally or vertically.',
  usage: (
    <>
      <p>
        Use a <code>Separator</code> to group related content and create visual
        breaks between sections, lists, or inline items. It renders a thin line
        that adapts to the current border color.
      </p>
      <ul>
        <li>
          Keep <code>decorative</code> at its default <code>true</code> when the
          line is purely visual; this hides it from assistive technology.
        </li>
        <li>
          Set <code>decorative={'{false}'}</code> when the divider conveys
          meaning, so it is exposed with the correct <code>separator</code> role.
        </li>
        <li>
          Use <code>orientation="vertical"</code> only inside a flex container
          that gives the separator a height (e.g. <code>h-4</code> or
          <code>self-stretch</code>), otherwise it collapses.
        </li>
        <li>
          Prefer a separator over manual margins when the goal is to communicate
          a boundary between distinct groups of content.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Horizontal',
      description: 'The default orientation, spanning the full width.',
      render: () => (
        <div className="w-full max-w-sm">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
            <p className="text-sm text-muted-foreground">
              An open-source UI component library.
            </p>
          </div>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">Built with care.</p>
        </div>
      ),
      code: `<div className="w-full max-w-sm">
  <div className="space-y-1">
    <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
    <p className="text-sm text-muted-foreground">
      An open-source UI component library.
    </p>
  </div>
  <Separator className="my-4" />
  <p className="text-sm text-muted-foreground">Built with care.</p>
</div>`,
    },
    {
      name: 'Vertical',
      description:
        'Use orientation="vertical" inside a flex row that gives it height.',
      render: () => (
        <div className="flex h-5 items-center gap-4 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      ),
      code: `<div className="flex h-5 items-center gap-4 text-sm">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>`,
    },
    {
      name: 'Semantic (non-decorative)',
      description:
        'Exposed to assistive tech with role="separator" via decorative={false}.',
      render: () => (
        <div className="w-full max-w-sm space-y-4">
          <section className="text-sm">First section of content.</section>
          <Separator decorative={false} />
          <section className="text-sm">Second, distinct section.</section>
        </div>
      ),
      code: `<div className="w-full max-w-sm space-y-4">
  <section className="text-sm">First section of content.</section>
  <Separator decorative={false} />
  <section className="text-sm">Second, distinct section.</section>
</div>`,
    },
  ],
  props: [
    {
      prop: 'orientation',
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description:
        'The orientation of the separator. Vertical requires a parent with a defined height.',
    },
    {
      prop: 'decorative',
      type: 'boolean',
      default: 'true',
      description:
        'When true, the separator is purely visual and hidden from assistive technology. When false, it is exposed with role="separator".',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof SeparatorPrimitive.Root>',
      description:
        'All Radix Separator.Root props (including className) are forwarded.',
    },
  ],
}
