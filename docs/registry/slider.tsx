import { Slider } from '@/components/ui/slider'
import type { ComponentDoc } from './types'

export const sliderDoc: ComponentDoc = {
  slug: 'slider',
  name: 'Slider',
  group: 'Forms',
  description:
    'Lets users select a value or range from a continuous track by dragging one or more thumbs.',
  usage: (
    <>
      <p>
        Use a <code>Slider</code> for selecting an approximate value within a
        known range (volume, brightness, price). For precise numeric entry,
        pair it with or prefer a number input. Provide multiple values in the{' '}
        <code>defaultValue</code>/<code>value</code> array to render a range
        with several thumbs.
      </p>
      <ul>
        <li>
          Always pair the slider with a visible <code>{'<label>'}</code> (via{' '}
          <code>htmlFor</code>/<code>id</code> or <code>aria-label</code>) so its
          purpose is announced.
        </li>
        <li>
          Each thumb is keyboard focusable and supports arrow keys; tune the{' '}
          <code>step</code> so keyboard adjustments feel reasonable.
        </li>
        <li>
          Set <code>min</code>, <code>max</code>, and <code>step</code>{' '}
          explicitly when the default 0–100 range does not match your data.
        </li>
        <li>
          Use the uncontrolled <code>defaultValue</code> for simple forms;
          reach for the controlled <code>value</code> + <code>onValueChange</code>{' '}
          only when you need to react to changes live.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'A single-thumb slider over the default 0–100 range.',
      render: () => (
        <Slider defaultValue={[50]} max={100} step={1} className="w-72" />
      ),
      code: `<Slider defaultValue={[50]} max={100} step={1} className="w-72" />`,
    },
    {
      name: 'Range',
      description: 'Two thumbs select a lower and upper bound.',
      render: () => (
        <Slider defaultValue={[25, 75]} max={100} step={1} className="w-72" />
      ),
      code: `<Slider defaultValue={[25, 75]} max={100} step={1} className="w-72" />`,
    },
    {
      name: 'Stepped',
      description: 'A custom range with a coarse step.',
      render: () => (
        <Slider
          defaultValue={[40]}
          min={0}
          max={200}
          step={20}
          className="w-72"
        />
      ),
      code: `<Slider defaultValue={[40]} min={0} max={200} step={20} className="w-72" />`,
    },
    {
      name: 'Disabled',
      render: () => (
        <Slider defaultValue={[30]} max={100} step={1} disabled className="w-72" />
      ),
      code: `<Slider defaultValue={[30]} max={100} step={1} disabled className="w-72" />`,
    },
  ],
  props: [
    {
      prop: 'defaultValue',
      type: 'number[]',
      description:
        'Uncontrolled initial value(s). The length of the array determines the number of thumbs.',
    },
    {
      prop: 'value',
      type: 'number[]',
      description:
        'Controlled value(s). Use together with onValueChange to manage state yourself.',
    },
    {
      prop: 'min',
      type: 'number',
      default: '0',
      description: 'Minimum value of the range.',
    },
    {
      prop: 'max',
      type: 'number',
      default: '100',
      description: 'Maximum value of the range.',
    },
    {
      prop: 'step',
      type: 'number',
      default: '1',
      description: 'The stepping interval between selectable values.',
    },
    {
      prop: 'onValueChange',
      type: '(value: number[]) => void',
      description: 'Called as the value changes while dragging or via keyboard.',
    },
    {
      prop: 'orientation',
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: 'The orientation of the slider.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents interaction and dims the slider.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof SliderPrimitive.Root>',
      description: 'All Radix Slider Root props are forwarded.',
    },
  ],
}
