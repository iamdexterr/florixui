import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import type { ComponentDoc } from './types'

export const inputGroupDoc: ComponentDoc = {
  slug: 'input-group',
  name: 'Input Group',
  group: 'Forms',
  description:
    'Wraps an input or textarea with aligned addons such as icons, text, or buttons to form a single composed control.',
  usage: (
    <>
      <p>
        Compose an <code>InputGroup</code> from an{' '}
        <code>InputGroupInput</code> (or <code>InputGroupTextarea</code>) plus
        one or more <code>InputGroupAddon</code> regions. Each addon is aligned
        with the <code>align</code> prop, and clicking an addon focuses the
        control so the whole group behaves like one field.
      </p>
      <ul>
        <li>
          Use <code>inline-start</code> / <code>inline-end</code> for leading and
          trailing icons or buttons, and <code>block-start</code> /{' '}
          <code>block-end</code> to stack addons above or below a textarea.
        </li>
        <li>
          Put visible labels or units in <code>InputGroupText</code>; for
          icon-only addons add an <code>aria-label</code> on the icon button so
          screen readers announce its purpose.
        </li>
        <li>
          The group reflects focus and <code>aria-invalid</code> state from the
          control onto its border, so set those attributes on the input rather
          than the wrapper.
        </li>
        <li>
          Disabling the control automatically dims the group and its addons via
          the <code>has-disabled</code> styles.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Leading text addon',
      description: 'A static prefix aligned to the start of the field.',
      render: () => (
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      ),
      code: `<InputGroup className="max-w-sm">
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>`,
    },
    {
      name: 'Trailing button addon',
      description: 'An action button aligned to the end of the field.',
      render: () => (
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Search…" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ),
      code: `<InputGroup className="max-w-sm">
  <InputGroupInput placeholder="Search…" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      name: 'Leading and trailing addons',
      description: 'A currency prefix with a trailing unit label.',
      render: () => (
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput type="number" placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      ),
      code: `<InputGroup className="max-w-sm">
  <InputGroupAddon>
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput type="number" placeholder="0.00" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      name: 'Textarea with a block-end toolbar',
      description: 'A multiline control with addons stacked below it.',
      render: () => (
        <InputGroup className="max-w-sm">
          <InputGroupTextarea placeholder="Write a comment…" />
          <InputGroupAddon align="block-end">
            <InputGroupText>Markdown supported</InputGroupText>
            <InputGroupButton className="ml-auto" variant="default">
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ),
      code: `<InputGroup className="max-w-sm">
  <InputGroupTextarea placeholder="Write a comment…" />
  <InputGroupAddon align="block-end">
    <InputGroupText>Markdown supported</InputGroupText>
    <InputGroupButton className="ml-auto" variant="default">
      Send
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
  ],
  props: [
    {
      prop: 'InputGroup / ...props',
      type: 'React.ComponentProps<"div">',
      description:
        'The container. Renders a role="group" <div>; forwards all native div attributes.',
    },
    {
      prop: 'InputGroupAddon / align',
      type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
      default: '"inline-start"',
      description:
        'Position of the addon relative to the control. Block alignments stack the addon above/below and make the group grow vertically.',
    },
    {
      prop: 'InputGroupButton / size',
      type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
      default: '"xs"',
      description:
        'Compact button sizing tuned for addons. The icon-* sizes square the button for icon-only actions.',
    },
    {
      prop: 'InputGroupButton / variant',
      type: '"default" | "secondary" | "outline" | "destructive" | "ghost" | "link"',
      default: '"ghost"',
      description: 'Visual style, forwarded to the underlying Button.',
    },
    {
      prop: 'InputGroupInput / ...props',
      type: 'React.ComponentProps<"input">',
      description:
        'The text control. Wraps Input with borderless styling; all native input attributes are forwarded.',
    },
    {
      prop: 'InputGroupTextarea / ...props',
      type: 'React.ComponentProps<"textarea">',
      description:
        'A multiline control. Wraps Textarea with borderless styling; all native textarea attributes are forwarded.',
    },
    {
      prop: 'InputGroupText / ...props',
      type: 'React.ComponentProps<"span">',
      description:
        'Inline label or unit text rendered inside an addon; forwards all native span attributes.',
    },
  ],
}
