import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import type { ComponentDoc } from './types'

export const switchDoc: ComponentDoc = {
  slug: 'switch',
  name: 'Switch',
  group: 'Forms',
  description:
    'A toggle control that lets the user switch a single setting on or off, applying the change immediately.',
  usage: (
    <>
      <p>
        Use a <code>Switch</code> for binary settings that take effect right
        away, such as enabling notifications or dark mode. If the choice is only
        committed when the user submits a form, prefer a <code>Checkbox</code>{' '}
        instead.
      </p>
      <ul>
        <li>
          Always pair the switch with a <code>Label</code> and connect them via{' '}
          <code>id</code>/<code>htmlFor</code> so the label is clickable and
          announced by screen readers.
        </li>
        <li>
          Use it for instant, reversible actions; avoid it for choices that
          require a separate save step.
        </li>
        <li>
          The switch is keyboard operable (Space/Enter toggles) and exposes its
          state via the underlying <code>role="switch"</code>; don&apos;t remove
          the visible focus ring.
        </li>
        <li>
          Prefer the uncontrolled <code>defaultChecked</code> for simple cases,
          and the controlled <code>checked</code>/<code>onCheckedChange</code>{' '}
          pair when you need to react to changes.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'An uncontrolled switch using defaultChecked.',
      render: () => (
        <div className="flex items-center gap-2">
          <Switch id="airplane" defaultChecked />
          <Label htmlFor="airplane">Airplane mode</Label>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Switch id="airplane" defaultChecked />
  <Label htmlFor="airplane">Airplane mode</Label>
</div>`,
    },
    {
      name: 'Sizes',
      description: 'The switch comes in two sizes.',
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Switch id="size-sm" size="sm" defaultChecked />
            <Label htmlFor="size-sm">Small</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="size-default" size="default" defaultChecked />
            <Label htmlFor="size-default">Default</Label>
          </div>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Switch id="size-sm" size="sm" defaultChecked />
  <Label htmlFor="size-sm">Small</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="size-default" size="default" defaultChecked />
  <Label htmlFor="size-default">Default</Label>
</div>`,
    },
    {
      name: 'Disabled',
      description: 'A switch that cannot be toggled.',
      render: () => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Switch id="disabled-off" disabled />
            <Label htmlFor="disabled-off">Off (disabled)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="disabled-on" disabled defaultChecked />
            <Label htmlFor="disabled-on">On (disabled)</Label>
          </div>
        </div>
      ),
      code: `<div className="flex items-center gap-2">
  <Switch id="disabled-off" disabled />
  <Label htmlFor="disabled-off">Off (disabled)</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="disabled-on" disabled defaultChecked />
  <Label htmlFor="disabled-on">On (disabled)</Label>
</div>`,
    },
  ],
  props: [
    {
      prop: 'size',
      type: '"sm" | "default"',
      default: '"default"',
      description: 'Controls the dimensions of the track and thumb.',
    },
    {
      prop: 'checked',
      type: 'boolean',
      description:
        'Controlled checked state. Use together with onCheckedChange.',
    },
    {
      prop: 'defaultChecked',
      type: 'boolean',
      description:
        'Initial checked state when the switch is left uncontrolled.',
    },
    {
      prop: 'onCheckedChange',
      type: '(checked: boolean) => void',
      description: 'Called when the checked state changes.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents the user from interacting with the switch.',
    },
    {
      prop: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Marks the control as required within a form.',
    },
    {
      prop: 'name',
      type: 'string',
      description:
        'Name submitted with the form when the switch is part of a form.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof SwitchPrimitive.Root>',
      description: 'All Radix Switch Root props are forwarded.',
    },
  ],
}
