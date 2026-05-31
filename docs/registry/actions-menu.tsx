import { Copy, Pencil, Settings, Share, Trash2 } from 'lucide-react'
import { ActionsMenu } from '@/components/custom/actions-menu'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const actionsMenuDoc: ComponentDoc = {
  slug: 'actions-menu',
  name: 'Actions Menu',
  group: 'Custom',
  description:
    'A drop-in "three-dot" overflow menu. Pass a flat list of items (actions, labels, separators) and it renders a kebab-triggered dropdown.',
  usage: (
    <>
      <p>
        <code>ActionsMenu</code> is the quick way to attach row/card actions
        without wiring up <code>DropdownMenu</code> by hand. Describe the menu as
        data — an array of items — and it builds the trigger and content for you.
      </p>
      <ul>
        <li>
          Items default to clickable actions; set <code>type: "separator"</code>{' '}
          for a divider or <code>type: "label"</code> for a section heading.
        </li>
        <li>
          Mark an action <code>destructive</code> (e.g. delete) to color it with
          the destructive token; add a <code>shortcut</code> string for a hint.
        </li>
        <li>
          The default trigger is an accessible ghost icon button; override it
          entirely with the <code>trigger</code> prop for non-icon triggers.
        </li>
        <li>
          Provide a <code>triggerLabel</code> so screen readers announce what the
          button opens.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A kebab button with a few actions.',
      render: () => (
        <ActionsMenu
          triggerLabel="Open row actions"
          items={[
            { label: 'Edit', icon: Pencil },
            { label: 'Duplicate', icon: Copy },
            { type: 'separator' },
            { label: 'Delete', icon: Trash2, destructive: true },
          ]}
        />
      ),
      code: `<ActionsMenu
  triggerLabel="Open row actions"
  items={[
    { label: "Edit", icon: Pencil },
    { label: "Duplicate", icon: Copy },
    { type: "separator" },
    { label: "Delete", icon: Trash2, destructive: true },
  ]}
/>`,
    },
    {
      name: 'Labels & shortcuts',
      render: () => (
        <ActionsMenu
          width="12rem"
          items={[
            { type: 'label', label: 'Actions' },
            { label: 'Edit', icon: Pencil, shortcut: '⌘E' },
            { label: 'Copy', icon: Copy, shortcut: '⌘C' },
            { label: 'Share', icon: Share, shortcut: '⌘S' },
            { type: 'separator' },
            { type: 'label', label: 'Danger zone' },
            { label: 'Delete', icon: Trash2, destructive: true, shortcut: '⌫' },
          ]}
        />
      ),
      code: `<ActionsMenu
  width="12rem"
  items={[
    { type: "label", label: "Actions" },
    { label: "Edit", icon: Pencil, shortcut: "⌘E" },
    { label: "Copy", icon: Copy, shortcut: "⌘C" },
    { label: "Share", icon: Share, shortcut: "⌘S" },
    { type: "separator" },
    { type: "label", label: "Danger zone" },
    { label: "Delete", icon: Trash2, destructive: true, shortcut: "⌫" },
  ]}
/>`,
    },
    {
      name: 'Disabled item',
      render: () => (
        <ActionsMenu
          items={[
            { label: 'Edit', icon: Pencil },
            { label: 'Share', icon: Share, disabled: true },
            { label: 'Delete', icon: Trash2, destructive: true },
          ]}
        />
      ),
      code: `<ActionsMenu
  items={[
    { label: "Edit", icon: Pencil },
    { label: "Share", icon: Share, disabled: true },
    { label: "Delete", icon: Trash2, destructive: true },
  ]}
/>`,
    },
    {
      name: 'Custom trigger',
      description: 'Override the kebab button with any element via `trigger`.',
      render: () => (
        <ActionsMenu
          align="start"
          trigger={
            <Button variant="outline" size="sm">
              <Settings /> Manage
            </Button>
          }
          items={[
            { label: 'Settings', icon: Settings },
            { label: 'Share', icon: Share },
            { type: 'separator' },
            { label: 'Delete', icon: Trash2, destructive: true },
          ]}
        />
      ),
      code: `<ActionsMenu
  align="start"
  trigger={
    <Button variant="outline" size="sm">
      <Settings /> Manage
    </Button>
  }
  items={[
    { label: "Settings", icon: Settings },
    { label: "Share", icon: Share },
    { type: "separator" },
    { label: "Delete", icon: Trash2, destructive: true },
  ]}
/>`,
    },
  ],
  props: [
    {
      prop: 'items',
      type: 'ActionsMenuItem[]',
      description:
        'Menu content: actions ({ label, icon?, onSelect?, shortcut?, destructive?, disabled? }), { type: "separator" }, or { type: "label" }.',
    },
    {
      prop: 'trigger',
      type: 'ReactNode',
      description: 'Custom trigger element (overrides the default icon button).',
    },
    {
      prop: 'triggerIcon',
      type: 'LucideIcon',
      default: 'MoreVertical',
      description: 'Icon for the default trigger button.',
    },
    {
      prop: 'triggerLabel',
      type: 'string',
      default: '"Open menu"',
      description: 'Visually-hidden accessible label for the trigger.',
    },
    {
      prop: 'width',
      type: 'string',
      default: '"10rem"',
      description: 'Width of the dropdown content.',
    },
    {
      prop: 'align',
      type: '"start" | "center" | "end"',
      default: '"end"',
      description: 'Alignment of the dropdown relative to the trigger.',
    },
    {
      prop: 'open / onOpenChange',
      type: 'boolean / (open) => void',
      description: 'Controlled open state.',
    },
  ],
}
