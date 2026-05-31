import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import type { ComponentDoc } from './types'

export const fieldDoc: ComponentDoc = {
  slug: 'field',
  name: 'Field',
  group: 'Forms',
  description:
    'Layout primitives that pair a form control with its label, description, and error message in a consistent, accessible structure.',
  usage: (
    <>
      <p>
        Wrap each form control in a <code>Field</code> together with a{' '}
        <code>FieldLabel</code> and optional <code>FieldDescription</code> /{' '}
        <code>FieldError</code>. Use <code>FieldGroup</code> to stack several
        fields, and <code>FieldSet</code> with a <code>FieldLegend</code> to
        group related controls (such as a set of checkboxes or radios) under a
        single caption.
      </p>
      <ul>
        <li>
          Associate the label with its control by giving the control an{' '}
          <code>id</code> and the <code>FieldLabel</code> a matching{' '}
          <code>htmlFor</code>.
        </li>
        <li>
          Use <code>orientation="horizontal"</code> for compact controls like
          checkboxes and switches, and the default vertical orientation for
          text inputs.
        </li>
        <li>
          <code>FieldError</code> renders with <code>role="alert"</code> and
          only appears when it has children or non-empty <code>errors</code>,
          so it announces validation problems to assistive technology.
        </li>
        <li>
          Set <code>data-invalid</code> on the <code>Field</code> to switch the
          label and control into the destructive (error) styling.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic field',
      description: 'A labelled text input with a helper description.',
      render: () => (
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
          <FieldDescription>
            We&apos;ll only use this to send receipts.
          </FieldDescription>
        </Field>
      ),
      code: `<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" placeholder="you@example.com" />
  <FieldDescription>
    We'll only use this to send receipts.
  </FieldDescription>
</Field>`,
    },
    {
      name: 'Field group',
      description: 'Stack multiple fields with consistent spacing.',
      render: () => (
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" placeholder="Ada Lovelace" />
          </Field>
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea id="bio" placeholder="Tell us about yourself" />
            <FieldDescription>Max 280 characters.</FieldDescription>
          </Field>
        </FieldGroup>
      ),
      code: `<FieldGroup className="max-w-sm">
  <Field>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input id="name" placeholder="Ada Lovelace" />
  </Field>
  <Field>
    <FieldLabel htmlFor="bio">Bio</FieldLabel>
    <Textarea id="bio" placeholder="Tell us about yourself" />
    <FieldDescription>Max 280 characters.</FieldDescription>
  </Field>
</FieldGroup>`,
    },
    {
      name: 'Horizontal with control',
      description:
        'A switch and checkbox laid out horizontally with FieldContent.',
      render: () => (
        <FieldGroup className="max-w-sm">
          <Field orientation="horizontal">
            <Switch id="notifications" defaultChecked />
            <FieldContent>
              <FieldLabel htmlFor="notifications">
                Email notifications
              </FieldLabel>
              <FieldDescription>
                Receive an email when something needs your attention.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="terms" />
            <FieldContent>
              <FieldLabel htmlFor="terms">Accept terms</FieldLabel>
              <FieldDescription>
                You agree to our Terms of Service.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      ),
      code: `<FieldGroup className="max-w-sm">
  <Field orientation="horizontal">
    <Switch id="notifications" defaultChecked />
    <FieldContent>
      <FieldLabel htmlFor="notifications">Email notifications</FieldLabel>
      <FieldDescription>
        Receive an email when something needs your attention.
      </FieldDescription>
    </FieldContent>
  </Field>
  <Field orientation="horizontal">
    <Checkbox id="terms" />
    <FieldContent>
      <FieldLabel htmlFor="terms">Accept terms</FieldLabel>
      <FieldDescription>
        You agree to our Terms of Service.
      </FieldDescription>
    </FieldContent>
  </Field>
</FieldGroup>`,
    },
    {
      name: 'Fieldset, error & separator',
      description:
        'A grouped set with a legend, an invalid field, and a labelled separator.',
      render: () => (
        <FieldSet className="max-w-sm">
          <FieldLegend>Account</FieldLegend>
          <FieldDescription>Set up your login details.</FieldDescription>
          <FieldGroup>
            <Field data-invalid>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" aria-invalid defaultValue="" />
              <FieldError>This username is already taken.</FieldError>
            </Field>
            <FieldSeparator>Optional</FieldSeparator>
            <Field>
              <FieldLabel htmlFor="referral">Referral code</FieldLabel>
              <Input id="referral" placeholder="ABC123" />
            </Field>
          </FieldGroup>
        </FieldSet>
      ),
      code: `<FieldSet className="max-w-sm">
  <FieldLegend>Account</FieldLegend>
  <FieldDescription>Set up your login details.</FieldDescription>
  <FieldGroup>
    <Field data-invalid>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" aria-invalid defaultValue="" />
      <FieldError>This username is already taken.</FieldError>
    </Field>
    <FieldSeparator>Optional</FieldSeparator>
    <Field>
      <FieldLabel htmlFor="referral">Referral code</FieldLabel>
      <Input id="referral" placeholder="ABC123" />
    </Field>
  </FieldGroup>
</FieldSet>`,
    },
  ],
  props: [
    {
      prop: 'orientation',
      type: '"vertical" | "horizontal" | "responsive"',
      default: '"vertical"',
      description:
        'Layout direction of the field. Use horizontal for inline controls like checkboxes and switches; responsive switches based on container width.',
    },
    {
      prop: 'data-invalid',
      type: 'boolean',
      description:
        'When present, applies destructive styling to the field label and content to indicate a validation error.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"div">',
      description:
        'All native div attributes are forwarded; the field renders with role="group".',
    },
  ],
}
