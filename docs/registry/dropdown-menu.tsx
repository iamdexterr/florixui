import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import type { ComponentDoc } from './types'

/** Stateful example: controlled checkbox items. */
function CheckboxItemsExample() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Stateful example: controlled radio group. */
function RadioGroupExample() {
  const [position, setPosition] = React.useState('bottom')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Panel position</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const dropdownMenuDoc: ComponentDoc = {
  slug: 'dropdown-menu',
  name: 'Dropdown Menu',
  group: 'Overlays',
  description:
    'Displays a menu of actions or options triggered by a button, built on Radix UI with full keyboard and focus support.',
  usage: (
    <>
      <p>
        Compose a <code>DropdownMenu</code> from a{' '}
        <code>DropdownMenuTrigger</code> (use <code>asChild</code> to render your
        own button) and a <code>DropdownMenuContent</code> holding{' '}
        <code>DropdownMenuItem</code>, checkbox, radio, label, separator, and
        submenu parts. Use it for contextual actions, not for selecting a form
        value (prefer a <code>Select</code> for that).
      </p>
      <ul>
        <li>
          Group related actions with <code>DropdownMenuGroup</code> and{' '}
          <code>DropdownMenuLabel</code>, and divide groups with{' '}
          <code>DropdownMenuSeparator</code>.
        </li>
        <li>
          Mark dangerous actions with <code>variant="destructive"</code> on{' '}
          <code>DropdownMenuItem</code> so they read as irreversible.
        </li>
        <li>
          The menu is fully keyboard operable: open with{' '}
          <kbd>Enter</kbd>/<kbd>Space</kbd>, move with the arrow keys, and close
          with <kbd>Esc</kbd>. Focus returns to the trigger on close.
        </li>
        <li>
          Reach for <code>DropdownMenuCheckboxItem</code> /{' '}
          <code>DropdownMenuRadioItem</code> for toggle or single-choice options
          that stay visible while the menu is open.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A trigger with a labeled group of actions and shortcuts.',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      name: 'Checkbox items',
      description: 'Toggleable options driven by controlled state.',
      render: () => <CheckboxItemsExample />,
      code: `function CheckboxItemsExample() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    },
    {
      name: 'Radio group',
      description: 'A single-choice group with controlled value.',
      render: () => <RadioGroupExample />,
      code: `function RadioGroupExample() {
  const [position, setPosition] = React.useState('bottom')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Panel position</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    },
    {
      name: 'Submenu',
      description: 'Nest a secondary menu with DropdownMenuSub.',
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>New file</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem>Email</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>New file</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Copy link</DropdownMenuItem>
        <DropdownMenuItem>Email</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description:
        'Controlled open state of the menu (on DropdownMenu root). Pair with onOpenChange.',
    },
    {
      prop: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Open state when initially rendered, for uncontrolled usage.',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the open state changes.',
    },
    {
      prop: 'modal',
      type: 'boolean',
      default: 'true',
      description:
        'When true, interaction with outside elements is disabled and content blocks the page.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof DropdownMenuPrimitive.Root>',
      description: 'Remaining Radix DropdownMenu.Root props are forwarded.',
    },
  ],
}
