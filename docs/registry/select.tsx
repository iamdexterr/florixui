import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ComponentDoc } from './types'

export const selectDoc: ComponentDoc = {
  slug: 'select',
  name: 'Select',
  group: 'Forms',
  description:
    'Displays a list of options for the user to pick from, triggered by a button.',
  usage: (
    <>
      <p>
        Use a <code>Select</code> when the user must choose a single option from
        a known, mutually exclusive set. Always pair the{' '}
        <code>SelectValue</code> with a <code>placeholder</code> so the trigger
        communicates its purpose before a choice is made.
      </p>
      <ul>
        <li>
          Compose the control from <code>SelectTrigger</code> (the visible
          button) and <code>SelectContent</code> (the dropdown of{' '}
          <code>SelectItem</code>s).
        </li>
        <li>
          Use <code>defaultValue</code> for an uncontrolled default, or{' '}
          <code>value</code> / <code>onValueChange</code> to control it.
        </li>
        <li>
          Group related options with <code>SelectGroup</code> and label them
          with <code>SelectLabel</code>; separate sections with{' '}
          <code>SelectSeparator</code>.
        </li>
        <li>
          Built on Radix: the trigger is keyboard operable, supports type-ahead,
          and exposes correct listbox ARIA roles automatically.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A single-choice select with a placeholder.',
      render: () => (
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
          </SelectContent>
        </Select>
      ),
      code: `<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
  </SelectContent>
</Select>`,
    },
    {
      name: 'Grouped options',
      description:
        'Use SelectGroup with SelectLabel and SelectSeparator to organize items.',
      render: () => (
        <Select defaultValue="cst">
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="est">Eastern (EST)</SelectItem>
              <SelectItem value="cst">Central (CST)</SelectItem>
              <SelectItem value="pst">Pacific (PST)</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
              <SelectItem value="cet">Central European (CET)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
      code: `<Select defaultValue="cst">
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern (EST)</SelectItem>
      <SelectItem value="cst">Central (CST)</SelectItem>
      <SelectItem value="pst">Pacific (PST)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
      <SelectItem value="cet">Central European (CET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
    },
    {
      name: 'Small trigger and disabled item',
      description:
        'The trigger accepts size="sm", and individual items can be disabled.',
      render: () => (
        <Select>
          <SelectTrigger size="sm" className="w-48">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise" disabled>
              Enterprise (contact us)
            </SelectItem>
          </SelectContent>
        </Select>
      ),
      code: `<Select>
  <SelectTrigger size="sm" className="w-48">
    <SelectValue placeholder="Select a plan" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="free">Free</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
    <SelectItem value="enterprise" disabled>
      Enterprise (contact us)
    </SelectItem>
  </SelectContent>
</Select>`,
    },
  ],
  props: [
    {
      prop: 'defaultValue',
      type: 'string',
      description:
        'The value of the item selected by default (uncontrolled usage).',
    },
    {
      prop: 'value',
      type: 'string',
      description: 'The controlled value of the selected item.',
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
      description: 'When true, prevents the user from interacting with the select.',
    },
    {
      prop: 'required',
      type: 'boolean',
      default: 'false',
      description: 'When true, marks the select as required within a form.',
    },
    {
      prop: 'name',
      type: 'string',
      description:
        'The name of the select, submitted with its owning form as a hidden field.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof SelectPrimitive.Root>',
      description: 'All Radix Select Root props are forwarded.',
    },
  ],
}
