import { Input } from '@/components/ui/input'
import type { ComponentDoc } from './types'

export const inputDoc: ComponentDoc = {
  slug: 'input',
  name: 'Input',
  group: 'Forms',
  description:
    'A single-line text field for collecting short, free-form user input such as names, emails, or passwords.',
  usage: (
    <>
      <p>
        <code>Input</code> is a thin wrapper around the native{' '}
        <code>{'<input>'}</code> element, so every standard attribute (
        <code>type</code>, <code>placeholder</code>, <code>value</code>,{' '}
        <code>onChange</code>, <code>disabled</code>, etc.) is forwarded
        directly. Set the <code>type</code> to match the data you collect so
        browsers and assistive tech can offer the right keyboard and validation.
      </p>
      <ul>
        <li>
          Always pair an input with a visible <code>{'<label>'}</code> (linked
          via <code>htmlFor</code>/<code>id</code>) rather than relying on the
          placeholder alone.
        </li>
        <li>
          For validation errors, set <code>aria-invalid</code>; the field shows
          a destructive focus ring automatically.
        </li>
        <li>
          The field shows a visible focus ring on keyboard focus; don&apos;t
          remove the outline.
        </li>
        <li>
          Use the appropriate <code>type</code> (e.g. <code>email</code>,{' '}
          <code>password</code>, <code>number</code>) to improve mobile keyboards
          and autofill.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'A basic text input with a placeholder.',
      render: () => <Input type="text" placeholder="Enter your name" />,
      code: `<Input type="text" placeholder="Enter your name" />`,
    },
    {
      name: 'With label',
      description: 'Associate a label with the input via htmlFor/id.',
      render: () => (
        <div className="grid w-full max-w-sm gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      ),
      code: `<div className="grid w-full max-w-sm gap-1.5">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
    },
    {
      name: 'Disabled',
      render: () => (
        <Input type="text" placeholder="Disabled" disabled />
      ),
      code: `<Input type="text" placeholder="Disabled" disabled />`,
    },
    {
      name: 'Invalid',
      description: 'Set aria-invalid to surface a validation error.',
      render: () => (
        <Input
          type="email"
          defaultValue="not-an-email"
          aria-invalid
        />
      ),
      code: `<Input type="email" defaultValue="not-an-email" aria-invalid />`,
    },
  ],
  props: [
    {
      prop: 'type',
      type: 'React.HTMLInputTypeAttribute',
      description:
        'The native input type, e.g. "text", "email", "password", "number", or "file". Forwarded directly to the underlying input.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Additional classes merged with the default styles.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"input">',
      description:
        'All native input attributes are forwarded (value, defaultValue, onChange, placeholder, disabled, aria-invalid, etc.).',
    },
  ],
}
