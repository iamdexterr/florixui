import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { ComponentDoc } from './types'

export const textareaDoc: ComponentDoc = {
  slug: 'textarea',
  name: 'Textarea',
  group: 'Forms',
  description:
    'A multi-line text input for longer free-form content such as comments, descriptions, or messages.',
  usage: (
    <>
      <p>
        Use a <code>Textarea</code> when you expect more than a single line of
        input. It renders a native <code>{'<textarea>'}</code> and forwards all
        native attributes, so it works with uncontrolled (<code>defaultValue</code>)
        or controlled (<code>value</code> + <code>onChange</code>) patterns and
        auto-grows with its content.
      </p>
      <ul>
        <li>
          Always pair it with a <code>Label</code> via matching{' '}
          <code>htmlFor</code>/<code>id</code> so the field is announced to
          screen readers.
        </li>
        <li>
          Set <code>aria-invalid</code> on validation errors; the component shows
          a destructive ring automatically.
        </li>
        <li>
          Use <code>placeholder</code> for an example of expected input, not as a
          replacement for a visible label.
        </li>
        <li>
          The field is keyboard focusable and shows a visible focus ring;
          don&apos;t remove the outline.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'A basic textarea with placeholder text.',
      render: () => <Textarea placeholder="Type your message here." />,
      code: `<Textarea placeholder="Type your message here." />`,
    },
    {
      name: 'With label',
      description: 'Associate a label with the field for accessibility.',
      render: () => (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="message">Your message</Label>
          <Textarea id="message" placeholder="Type your message here." />
        </div>
      ),
      code: `<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="message">Your message</Label>
  <Textarea id="message" placeholder="Type your message here." />
</div>`,
    },
    {
      name: 'Disabled',
      description: 'Prevent interaction while keeping the field readable.',
      render: () => (
        <Textarea
          disabled
          defaultValue="This field is currently disabled."
        />
      ),
      code: `<Textarea disabled defaultValue="This field is currently disabled." />`,
    },
    {
      name: 'Invalid',
      description: 'Signal a validation error with aria-invalid.',
      render: () => (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            aria-invalid
            defaultValue="Too short"
          />
          <p className="text-sm text-destructive">
            Bio must be at least 20 characters.
          </p>
        </div>
      ),
      code: `<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" aria-invalid defaultValue="Too short" />
  <p className="text-sm text-destructive">
    Bio must be at least 20 characters.
  </p>
</div>`,
    },
  ],
  props: [
    {
      prop: 'value',
      type: 'string',
      description:
        'The controlled value. Pair with onChange to manage state yourself.',
    },
    {
      prop: 'defaultValue',
      type: 'string',
      description: 'The initial value for uncontrolled usage.',
    },
    {
      prop: 'placeholder',
      type: 'string',
      description: 'Hint text shown when the field is empty.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents interaction and applies a muted, dimmed style.',
    },
    {
      prop: 'rows',
      type: 'number',
      description:
        'Visible number of text lines. The field also auto-sizes to its content.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"textarea">',
      description: 'All native textarea attributes are forwarded.',
    },
  ],
}
