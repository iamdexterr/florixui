import * as React from 'react'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

/** Stateless example shells live at module scope so render() stays a plain function. */
function CommandDialogExample() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open palette{' '}
        <CommandShortcut className="ml-2">⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              Search Emoji
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export const commandDoc: ComponentDoc = {
  slug: 'command',
  name: 'Command',
  group: 'Overlays',
  description:
    'A fast, composable command menu with fuzzy search for navigating actions, built on cmdk.',
  usage: (
    <>
      <p>
        Use <code>Command</code> to build a searchable list of actions or
        navigation targets. Compose it from <code>CommandInput</code>,{' '}
        <code>CommandList</code>, <code>CommandGroup</code>, and{' '}
        <code>CommandItem</code>. For a global ⌘K palette, render the same parts
        inside <code>CommandDialog</code>.
      </p>
      <ul>
        <li>
          Always include a <code>CommandEmpty</code> so users get feedback when a
          query matches nothing.
        </li>
        <li>
          Group related items with <code>CommandGroup heading="..."</code>{' '}
          and separate groups using <code>CommandSeparator</code>.
        </li>
        <li>
          The input drives arrow-key navigation and type-ahead filtering; let it
          keep focus rather than removing the outline.
        </li>
        <li>
          Handle activation with each item&apos;s <code>onSelect</code> callback so
          mouse and keyboard behave identically.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'An inline command menu with a searchable, grouped list.',
      render: () => (
        <Command className="max-w-md rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
      code: `<Command className="max-w-md rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
    {
      name: 'Groups, separators & shortcuts',
      description:
        'Multiple groups divided by a separator, with keyboard-shortcut hints.',
      render: () => (
        <Command className="max-w-md rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem disabled>
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
      code: `<Command className="max-w-md rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        Profile
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        Billing
        <CommandShortcut>⌘B</CommandShortcut>
      </CommandItem>
      <CommandItem disabled>
        Settings
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
    {
      name: 'Command dialog (⌘K)',
      description:
        'A global command palette toggled by a button or the ⌘K / Ctrl+K shortcut.',
      render: () => <CommandDialogExample />,
      code: `function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open palette <CommandShortcut className="ml-2">⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Search Emoji</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}`,
    },
  ],
  props: [
    {
      prop: 'value',
      type: 'string',
      description:
        'Controlled value of the currently selected item (cmdk). Pair with onValueChange.',
    },
    {
      prop: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called when the selected/highlighted item changes.',
    },
    {
      prop: 'shouldFilter',
      type: 'boolean',
      default: 'true',
      description:
        'Whether the menu filters items by the input value. Disable to filter server-side.',
    },
    {
      prop: 'filter',
      type: '(value: string, search: string, keywords?: string[]) => number',
      description:
        'Custom scoring function for fuzzy matching; return 0 to hide an item.',
    },
    {
      prop: 'loop',
      type: 'boolean',
      default: 'false',
      description: 'Wrap keyboard navigation from the last item back to the first.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Additional classes merged onto the root command element.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof CommandPrimitive>',
      description: 'All cmdk Command props are forwarded to the underlying element.',
    },
  ],
}
