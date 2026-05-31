import { Checkbox } from '@/components/ui/checkbox'
import type { ComponentDoc } from './types'

export const checkboxDoc: ComponentDoc = {
  slug: 'checkbox',
  name: 'Checkbox',
  group: 'Forms',
  description:
    'A control that lets the user toggle a single option on or off, or select multiple options from a set.',
  usage: (
    <>
      <p>
        Use a <code>Checkbox</code> for binary on/off choices or to pick several
        items from a list. For mutually exclusive options use radio buttons
        instead, and for an immediate on/off setting prefer a switch.
      </p>
      <ul>
        <li>
          Always associate a visible <code>label</code> with the checkbox via a
          shared <code>id</code>/<code>htmlFor</code> so the text is clickable.
        </li>
        <li>
          Use <code>defaultChecked</code> for uncontrolled forms, or pair{' '}
          <code>checked</code> with <code>onCheckedChange</code> to control it.
        </li>
        <li>
          The checkbox is keyboard focusable, toggles with{' '}
          <kbd>Space</kbd>, and shows a visible focus ring; don&apos;t remove
          the outline.
        </li>
        <li>
          When disabled, the control is dimmed and skipped by tab order; convey
          why it&apos;s unavailable nearby.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'A single checkbox with an associated label.',
      render: () => (
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm leading-none">
            Accept terms and conditions
          </label>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm leading-none">
    Accept terms and conditions
  </label>
</div>`,
    },
    {
      name: 'Checked by default (uncontrolled)',
      description: 'Use defaultChecked to set the initial state without managing it.',
      render: () => (
        <div className="flex items-center gap-2">
          <Checkbox id="newsletter" defaultChecked />
          <label htmlFor="newsletter" className="text-sm leading-none">
            Subscribe to the newsletter
          </label>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Checkbox id="newsletter" defaultChecked />
  <label htmlFor="newsletter" className="text-sm leading-none">
    Subscribe to the newsletter
  </label>
</div>`,
    },
    {
      name: 'Disabled',
      description: 'Disabled checkboxes are dimmed and not focusable.',
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-off" disabled />
            <label htmlFor="disabled-off" className="text-sm leading-none">
              Unavailable option
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-on" disabled defaultChecked />
            <label htmlFor="disabled-on" className="text-sm leading-none">
              Locked-in option
            </label>
          </div>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Checkbox id="disabled-off" disabled />
  <label htmlFor="disabled-off" className="text-sm leading-none">
    Unavailable option
  </label>
</div>
<div className="flex items-center gap-2">
  <Checkbox id="disabled-on" disabled defaultChecked />
  <label htmlFor="disabled-on" className="text-sm leading-none">
    Locked-in option
  </label>
</div>`,
    },
  ],
  props: [
    {
      prop: 'checked',
      type: 'boolean | "indeterminate"',
      description:
        'The controlled checked state. Use together with onCheckedChange.',
    },
    {
      prop: 'defaultChecked',
      type: 'boolean | "indeterminate"',
      description:
        'The checked state when uncontrolled. Use when you do not need to control the value.',
    },
    {
      prop: 'onCheckedChange',
      type: '(checked: boolean | "indeterminate") => void',
      description: 'Called when the checked state changes.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents user interaction and dims the control.',
    },
    {
      prop: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Marks the checkbox as required when used inside a form.',
    },
    {
      prop: 'name',
      type: 'string',
      description: 'The name submitted with the form when used as a form control.',
    },
    {
      prop: 'value',
      type: 'string',
      default: '"on"',
      description: 'The value submitted with the form when the checkbox is checked.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof CheckboxPrimitive.Root>',
      description: 'All Radix Checkbox root props are forwarded.',
    },
  ],
}
