import { Mail, Search } from 'lucide-react'
import { AdvancedInput } from '@/components/custom/advanced-input'
import type { ComponentDoc } from './types'

export const advancedInputDoc: ComponentDoc = {
  slug: 'advanced-input',
  name: 'Advanced Input',
  group: 'Custom',
  description:
    'A batteries-included input that bundles label, description, icons, affixes, password toggle, loading, error/helper text, and a textarea mode into one component.',
  usage: (
    <>
      <p>
        <code>AdvancedInput</code> is a single control for the common case where
        a form field needs more than a bare input: a label, validation message,
        leading/trailing icons, or attached affixes. Reach for the primitive{' '}
        <code>Input</code> when you need none of that.
      </p>
      <ul>
        <li>
          Pass <code>errorMessage</code> to put the field in an error state
          automatically; it is wired to the input via <code>aria-describedby</code>.
        </li>
        <li>
          <code>helperText</code> shows only when there is no error, so the two
          never collide.
        </li>
        <li>
          A <code>type="password"</code> field gets a show/hide toggle for free;
          set <code>loading</code> to swap the left icon for a spinner.
        </li>
        <li>
          Use <code>startItem</code> / <code>endItem</code> for attached affixes
          (currency, units, a select), or <code>leftIcon</code> /{' '}
          <code>rightIcon</code> for icons inside the field.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Label, description & helper',
      render: () => (
        <AdvancedInput
          className="max-w-sm"
          label="Email"
          required
          type="email"
          placeholder="m@example.com"
          helperText="We'll never share your email."
          description="Used for sign-in and notifications."
        />
      ),
      code: `<AdvancedInput
  label="Email"
  required
  type="email"
  placeholder="m@example.com"
  helperText="We'll never share your email."
  description="Used for sign-in and notifications."
/>`,
    },
    {
      name: 'Icons',
      render: () => (
        <div className="flex max-w-sm flex-col gap-4">
          <AdvancedInput leftIcon={<Search />} placeholder="Search…" />
          <AdvancedInput
            rightIcon={<Mail />}
            type="email"
            placeholder="Email address"
          />
        </div>
      ),
      code: `<AdvancedInput leftIcon={<Search />} placeholder="Search…" />
<AdvancedInput rightIcon={<Mail />} type="email" placeholder="Email address" />`,
    },
    {
      name: 'Password & loading',
      render: () => (
        <div className="flex max-w-sm flex-col gap-4">
          <AdvancedInput
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <AdvancedInput loading placeholder="Checking availability…" />
        </div>
      ),
      code: `<AdvancedInput label="Password" type="password" placeholder="••••••••" />
<AdvancedInput loading placeholder="Checking availability…" />`,
    },
    {
      name: 'Input group (affixes)',
      render: () => (
        <div className="flex max-w-sm flex-col gap-4">
          <AdvancedInput startItem="https://" placeholder="example.com" />
          <AdvancedInput
            startItem="$"
            endItem="USD"
            type="number"
            placeholder="0.00"
          />
        </div>
      ),
      code: `<AdvancedInput startItem="https://" placeholder="example.com" />
<AdvancedInput startItem="$" endItem="USD" type="number" placeholder="0.00" />`,
    },
    {
      name: 'Error state',
      render: () => (
        <AdvancedInput
          className="max-w-sm"
          label="Username"
          defaultValue="taken_name"
          errorMessage="This username is already taken."
        />
      ),
      code: `<AdvancedInput
  label="Username"
  defaultValue="taken_name"
  errorMessage="This username is already taken."
/>`,
    },
    {
      name: 'Sizes & variant',
      render: () => (
        <div className="flex max-w-sm flex-col gap-4">
          <AdvancedInput size="sm" placeholder="Small" />
          <AdvancedInput size="default" placeholder="Default" />
          <AdvancedInput variant="alt" placeholder="Alt background" />
        </div>
      ),
      code: `<AdvancedInput size="sm" placeholder="Small" />
<AdvancedInput size="default" placeholder="Default" />
<AdvancedInput variant="alt" placeholder="Alt background" />`,
    },
    {
      name: 'Textarea mode',
      render: () => (
        <AdvancedInput
          as="textarea"
          className="max-w-sm"
          label="Bio"
          placeholder="Tell us about yourself"
          helperText="Max 200 characters."
        />
      ),
      code: `<AdvancedInput
  as="textarea"
  label="Bio"
  placeholder="Tell us about yourself"
  helperText="Max 200 characters."
/>`,
    },
  ],
  props: [
    {
      prop: 'as',
      type: '"input" | "textarea"',
      default: '"input"',
      description: 'Render an <input> or a <textarea>.',
    },
    {
      prop: 'label',
      type: 'ReactNode',
      description: 'Label rendered above the control.',
    },
    {
      prop: 'description',
      type: 'ReactNode',
      description: 'Muted helper text below the field (always shown).',
    },
    {
      prop: 'error',
      type: 'boolean',
      default: 'false',
      description: 'Invalid state. Forced true when errorMessage is set.',
    },
    {
      prop: 'errorMessage',
      type: 'string',
      description: 'Message shown below the control when in an error state.',
    },
    {
      prop: 'helperText',
      type: 'string',
      description: 'Hint shown below the control when not in an error state.',
    },
    {
      prop: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Adds a red asterisk after the label.',
    },
    {
      prop: 'size',
      type: '"sm" | "default"',
      default: '"default"',
      description: 'Control height (input only).',
    },
    {
      prop: 'variant',
      type: '"default" | "alt"',
      default: '"default"',
      description: 'default = input background; alt = muted background.',
    },
    {
      prop: 'leftIcon / rightIcon',
      type: 'ReactNode',
      description: 'Icons rendered inside the control.',
    },
    {
      prop: 'startItem / endItem',
      type: 'ReactNode',
      description: 'Attached affix segments before/after the input (input-group).',
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Replaces the left icon with a spinner.',
    },
    {
      prop: 'wrapperClassName',
      type: 'string',
      description: 'Class for the outer wrapper element.',
    },
    {
      prop: '...props',
      type: 'React.InputHTMLAttributes | React.TextareaHTMLAttributes',
      description: 'All native attributes are forwarded to the control.',
    },
  ],
}
