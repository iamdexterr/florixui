import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import type { ComponentDoc } from './types'

export const labelDoc: ComponentDoc = {
  slug: 'label',
  name: 'Label',
  group: 'Forms',
  description:
    'Renders an accessible caption for a form control, associating text with an input via htmlFor.',
  usage: (
    <>
      <p>
        Use a <code>Label</code> to give every form control a visible,
        programmatically associated caption. Set <code>htmlFor</code> to the
        control&apos;s <code>id</code> so clicking the label focuses or toggles
        the control, or nest the control inside the label to associate them
        implicitly.
      </p>
      <ul>
        <li>
          Always pair a label with its control via matching{' '}
          <code>htmlFor</code> and <code>id</code> — placeholder text is not a
          substitute.
        </li>
        <li>
          The label clicks through to its control, enlarging the hit target for
          checkboxes, radios, and switches.
        </li>
        <li>
          When the associated control is <code>disabled</code> (using the{' '}
          <code>peer</code> class) the label automatically dims and shows a
          not-allowed cursor.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'With an input',
      description: 'Associate a label and input with matching htmlFor / id.',
      render: () => (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      ),
      code: `<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
    },
    {
      name: 'With a checkbox',
      description:
        'Place the label beside the control; clicking the text toggles the checkbox.',
      render: () => (
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
    },
    {
      name: 'Disabled control',
      description:
        'A disabled peer input dims the label and shows a not-allowed cursor.',
      render: () => (
        <div className="grid w-full max-w-sm gap-2">
          <Input id="username" className="peer" placeholder="Unavailable" disabled />
          <Label htmlFor="username">Username</Label>
        </div>
      ),
      code: `<div className="grid w-full max-w-sm gap-2">
  <Input id="username" className="peer" placeholder="Unavailable" disabled />
  <Label htmlFor="username">Username</Label>
</div>`,
    },
  ],
  props: [
    {
      prop: 'htmlFor',
      type: 'string',
      description:
        "The id of the form control this label describes; clicking the label activates that control.",
    },
    {
      prop: 'className',
      type: 'string',
      description:
        'Additional classes merged onto the label (e.g. "peer" relationships or layout overrides).',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof LabelPrimitive.Root>',
      description:
        'All props of the Radix Label.Root (which renders a native <label>) are forwarded.',
    },
  ],
}
