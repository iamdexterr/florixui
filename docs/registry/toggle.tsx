import { Bold, Italic, Underline } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import type { ComponentDoc } from './types'

export const toggleDoc: ComponentDoc = {
  slug: 'toggle',
  name: 'Toggle',
  group: 'Forms',
  description:
    'A two-state button that can be either on or off, toggling the active state when pressed.',
  usage: (
    <>
      <p>
        Use a <code>Toggle</code> for a single, self-contained on/off control,
        such as bold or italic in a text formatting bar. For a set of mutually
        exclusive or multi-select options, group several toggles together and
        give each an accessible label.
      </p>
      <ul>
        <li>
          Prefer the uncontrolled <code>defaultPressed</code> prop for simple
          cases; use <code>pressed</code> with <code>onPressedChange</code> when
          you need to drive state from outside.
        </li>
        <li>
          Icon-only toggles must have an accessible name — pass
          <code>aria-label</code> so screen readers announce the action.
        </li>
        <li>
          The pressed state is exposed via <code>aria-pressed</code> and
          <code>data-[state=on]</code>; the control is keyboard focusable and
          toggles on Space or Enter.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'A basic icon toggle with an accessible label.',
      render: () => (
        <Toggle aria-label="Toggle bold">
          <Bold />
        </Toggle>
      ),
      code: `<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>`,
    },
    {
      name: 'Variants',
      description: 'The default (borderless) and outline styles.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Toggle aria-label="Toggle italic">
            <Italic />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle italic">
            <Italic />
          </Toggle>
        </div>
      ),
      code: `<Toggle aria-label="Toggle italic">
  <Italic />
</Toggle>
<Toggle variant="outline" aria-label="Toggle italic">
  <Italic />
</Toggle>`,
    },
    {
      name: 'Sizes',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Toggle size="sm" aria-label="Toggle underline">
            <Underline />
          </Toggle>
          <Toggle size="default" aria-label="Toggle underline">
            <Underline />
          </Toggle>
          <Toggle size="lg" aria-label="Toggle underline">
            <Underline />
          </Toggle>
        </div>
      ),
      code: `<Toggle size="sm" aria-label="Toggle underline">
  <Underline />
</Toggle>
<Toggle size="default" aria-label="Toggle underline">
  <Underline />
</Toggle>
<Toggle size="lg" aria-label="Toggle underline">
  <Underline />
</Toggle>`,
    },
    {
      name: 'With text, pressed and disabled',
      description:
        'Toggles can hold text, start pressed (uncontrolled), or be disabled.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Toggle defaultPressed aria-label="Toggle bold">
            <Bold />
            Bold
          </Toggle>
          <Toggle disabled aria-label="Toggle italic">
            <Italic />
            Italic
          </Toggle>
        </div>
      ),
      code: `<Toggle defaultPressed aria-label="Toggle bold">
  <Bold />
  Bold
</Toggle>
<Toggle disabled aria-label="Toggle italic">
  <Italic />
  Italic
</Toggle>`,
    },
  ],
  props: [
    {
      prop: 'variant',
      type: '"default" | "outline"',
      default: '"default"',
      description: 'Visual style of the toggle.',
    },
    {
      prop: 'size',
      type: '"default" | "sm" | "lg"',
      default: '"default"',
      description: 'Controls height, padding, and icon sizing.',
    },
    {
      prop: 'pressed',
      type: 'boolean',
      description:
        'The controlled pressed state. Use together with onPressedChange.',
    },
    {
      prop: 'defaultPressed',
      type: 'boolean',
      default: 'false',
      description:
        'The pressed state when uncontrolled, set on initial render.',
    },
    {
      prop: 'onPressedChange',
      type: '(pressed: boolean) => void',
      description: 'Event handler called when the pressed state changes.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents the user from interacting with the toggle.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof Toggle> (Radix Toggle.Root)',
      description:
        'All Radix Toggle root props and native button attributes are forwarded.',
    },
  ],
}
