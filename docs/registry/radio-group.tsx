import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { ComponentDoc } from './types'

export const radioGroupDoc: ComponentDoc = {
  slug: 'radio-group',
  name: 'Radio Group',
  group: 'Forms',
  description:
    'A set of checkable buttons where no more than one can be selected at a time.',
  usage: (
    <>
      <p>
        Use a <code>RadioGroup</code> when the user must pick exactly one option
        from a short, mutually exclusive list. For many options, prefer a select;
        for non-exclusive choices, use checkboxes instead.
      </p>
      <ul>
        <li>
          Give every <code>RadioGroupItem</code> a unique <code>value</code> and
          associate a <code>Label</code> via matching <code>id</code>/
          <code>htmlFor</code> so the whole label is clickable.
        </li>
        <li>
          Set <code>defaultValue</code> for an uncontrolled group, or pair{' '}
          <code>value</code> with <code>onValueChange</code> to control it.
        </li>
        <li>
          Arrow keys move between options and roving focus stays within the
          group; don&apos;t remove the visible focus ring.
        </li>
        <li>
          Use the <code>disabled</code> prop on the group or an individual item
          to convey unavailable choices.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'An uncontrolled group with a pre-selected option.',
      render: () => (
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      ),
      code: `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`,
    },
    {
      name: 'Disabled',
      description:
        'Disable the entire group, or only individual items.',
      render: () => (
        <RadioGroup defaultValue="card" disabled>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="card" id="p1" />
            <Label htmlFor="p1">Card</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="paypal" id="p2" />
            <Label htmlFor="p2">PayPal</Label>
          </div>
        </RadioGroup>
      ),
      code: `<RadioGroup defaultValue="card" disabled>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="card" id="p1" />
    <Label htmlFor="p1">Card</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="paypal" id="p2" />
    <Label htmlFor="p2">PayPal</Label>
  </div>
</RadioGroup>`,
    },
    {
      name: 'Single disabled item',
      description: 'Mark one choice as unavailable while the rest stay active.',
      render: () => (
        <RadioGroup defaultValue="standard">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="standard" id="s1" />
            <Label htmlFor="s1">Standard</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="express" id="s2" />
            <Label htmlFor="s2">Express</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="overnight" id="s3" disabled />
            <Label htmlFor="s3">Overnight (unavailable)</Label>
          </div>
        </RadioGroup>
      ),
      code: `<RadioGroup defaultValue="standard">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="standard" id="s1" />
    <Label htmlFor="s1">Standard</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="express" id="s2" />
    <Label htmlFor="s2">Express</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="overnight" id="s3" disabled />
    <Label htmlFor="s3">Overnight (unavailable)</Label>
  </div>
</RadioGroup>`,
    },
  ],
  props: [
    {
      prop: 'defaultValue',
      type: 'string',
      description:
        'The value of the item that should be checked initially (uncontrolled).',
    },
    {
      prop: 'value',
      type: 'string',
      description: 'The controlled value of the currently checked item.',
    },
    {
      prop: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called when the selected value changes.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'When true, prevents interaction with every item in the group.',
    },
    {
      prop: 'orientation',
      type: '"horizontal" | "vertical" | undefined',
      description: 'The orientation used for keyboard arrow navigation.',
    },
    {
      prop: 'name',
      type: 'string',
      description:
        'The name submitted with the group when used inside a form.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof RadioGroupPrimitive.Root>',
      description: 'All Radix RadioGroup Root props are forwarded.',
    },
  ],
}
