import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { ComponentDoc } from './types'

export const toggleGroupDoc: ComponentDoc = {
  slug: 'toggle-group',
  name: 'Toggle Group',
  group: 'Forms',
  description:
    'A set of two-state buttons that can be toggled on or off, supporting single or multiple selection.',
  usage: (
    <>
      <p>
        Use a <code>ToggleGroup</code> to let users pick one option
        (<code>type="single"</code>) or several
        (<code>type="multiple"</code>) from a compact, related set — like text
        alignment or formatting controls. For a single binary control, use a
        standalone <code>Toggle</code> instead.
      </p>
      <ul>
        <li>
          Choose <code>type="single"</code> for mutually exclusive choices and
          <code>type="multiple"</code> when options combine.
        </li>
        <li>
          Prefer the uncontrolled <code>defaultValue</code> for simple cases;
          use <code>value</code> with <code>onValueChange</code> when you need
          to drive selection from state.
        </li>
        <li>
          Each <code>ToggleGroupItem</code> is keyboard focusable with a visible
          focus ring; always give icon-only items an <code>aria-label</code>.
        </li>
        <li>
          Set <code>variant</code> and <code>size</code> on the group so all
          items stay visually consistent.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Single selection',
      description: 'Pick exactly one option using an uncontrolled default.',
      render: () => (
        <ToggleGroup type="single" defaultValue="center" variant="outline">
          <ToggleGroupItem value="left" aria-label="Align left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      ),
      code: `<ToggleGroup type="single" defaultValue="center" variant="outline">
  <ToggleGroupItem value="left" aria-label="Align left">
    Left
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    Center
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    Right
  </ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      name: 'Multiple selection',
      description: 'Allow several options to be active at once.',
      render: () => (
        <ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            Bold
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            Italic
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            Underline
          </ToggleGroupItem>
        </ToggleGroup>
      ),
      code: `<ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
  <ToggleGroupItem value="bold" aria-label="Bold">
    Bold
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">
    Italic
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline">
    Underline
  </ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      name: 'Sizes',
      description: 'Set the size on the group; items inherit it.',
      render: () => (
        <div className="flex flex-col items-start gap-3">
          <ToggleGroup type="single" defaultValue="b" size="sm" variant="outline">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
            <ToggleGroupItem value="b">B</ToggleGroupItem>
            <ToggleGroupItem value="c">C</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" defaultValue="b" size="lg" variant="outline">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
            <ToggleGroupItem value="b">B</ToggleGroupItem>
            <ToggleGroupItem value="c">C</ToggleGroupItem>
          </ToggleGroup>
        </div>
      ),
      code: `<ToggleGroup type="single" defaultValue="b" size="sm" variant="outline">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
<ToggleGroup type="single" defaultValue="b" size="lg" variant="outline">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>`,
    },
    {
      name: 'Vertical, joined items',
      description:
        'Use orientation="vertical" and spacing={0} to render a joined segmented control.',
      render: () => (
        <ToggleGroup
          type="single"
          defaultValue="day"
          orientation="vertical"
          spacing={0}
          variant="outline"
        >
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      ),
      code: `<ToggleGroup
  type="single"
  defaultValue="day"
  orientation="vertical"
  spacing={0}
  variant="outline"
>
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
</ToggleGroup>`,
    },
  ],
  props: [
    {
      prop: 'type',
      type: '"single" | "multiple"',
      description:
        'Whether one item or multiple items can be pressed at a time. Required.',
    },
    {
      prop: 'value',
      type: 'string | string[]',
      description:
        'The controlled pressed value(s). A string for single, an array for multiple.',
    },
    {
      prop: 'defaultValue',
      type: 'string | string[]',
      description:
        'The pressed value(s) when uncontrolled. A string for single, an array for multiple.',
    },
    {
      prop: 'onValueChange',
      type: '(value: string | string[]) => void',
      description: 'Called when the pressed value(s) change.',
    },
    {
      prop: 'variant',
      type: '"default" | "outline"',
      default: '"default"',
      description: 'Visual style applied to every item in the group.',
    },
    {
      prop: 'size',
      type: '"default" | "sm" | "lg"',
      default: '"default"',
      description: 'Controls the height and padding of every item.',
    },
    {
      prop: 'orientation',
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: 'Lays the items out in a row or a column.',
    },
    {
      prop: 'spacing',
      type: 'number',
      default: '2',
      description:
        'Gap between items (in spacing units). Use 0 for a joined segmented control.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables all items in the group.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof ToggleGroupPrimitive.Root>',
      description: 'All Radix ToggleGroup Root props are forwarded.',
    },
  ],
}
