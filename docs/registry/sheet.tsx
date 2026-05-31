import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const sheetDoc: ComponentDoc = {
  slug: 'sheet',
  name: 'Sheet',
  group: 'Overlays',
  description:
    'A panel that slides in from an edge of the screen to show supplementary content or actions without leaving the current page.',
  usage: (
    <>
      <p>
        A <code>Sheet</code> is a Dialog rendered as an edge-anchored drawer. Wrap
        a <code>SheetTrigger</code> and a <code>SheetContent</code> in a single{' '}
        <code>Sheet</code> root; choose the edge with the <code>side</code> prop
        on <code>SheetContent</code>. Use it for secondary tasks like filters,
        navigation, or a quick edit form.
      </p>
      <ul>
        <li>
          Always include a <code>SheetTitle</code> inside the content so screen
          readers can announce the panel; add a <code>SheetDescription</code> for
          extra context.
        </li>
        <li>
          Focus is trapped while open and returns to the trigger on close; the
          panel also closes on <kbd>Esc</kbd> and on overlay click.
        </li>
        <li>
          Prefer a Sheet over a full Dialog when the content is a list, form, or
          navigation that benefits from the extra vertical space.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A trigger that opens a panel from the right edge.',
      render: () => (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Save changes</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ),
      code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Save changes</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
    {
      name: 'Sides',
      description: 'Anchor the panel to any edge with the side prop.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline">{side}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Side: {side}</SheetTitle>
                  <SheetDescription>
                    This panel slides in from the {side} edge.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      ),
      code: `{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
  <Sheet key={side}>
    <SheetTrigger asChild>
      <Button variant="outline">{side}</Button>
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Side: {side}</SheetTitle>
        <SheetDescription>
          This panel slides in from the {side} edge.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
))}`,
    },
    {
      name: 'Without close button',
      description:
        'Hide the built-in close button and provide your own dismissal.',
      render: () => (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent showCloseButton={false}>
            <SheetHeader>
              <SheetTitle>Custom dismissal</SheetTitle>
              <SheetDescription>
                The default top-right close button is hidden.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button>Done</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ),
      code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent showCloseButton={false}>
    <SheetHeader>
      <SheetTitle>Custom dismissal</SheetTitle>
      <SheetDescription>
        The default top-right close button is hidden.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Done</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    },
  ],
  props: [
    {
      prop: 'side',
      type: '"top" | "right" | "bottom" | "left"',
      default: '"right"',
      description:
        'Edge of the screen the SheetContent panel slides in from. Set on SheetContent.',
    },
    {
      prop: 'showCloseButton',
      type: 'boolean',
      default: 'true',
      description:
        'Whether SheetContent renders the built-in top-right close button.',
    },
    {
      prop: 'open',
      type: 'boolean',
      description:
        'Controlled open state of the Sheet root. Pair with onOpenChange.',
    },
    {
      prop: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Open state of the Sheet root when uncontrolled.',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the open state changes (trigger, Esc, overlay).',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof Dialog.Root> / Dialog.Content',
      description:
        'Sheet forwards Radix Dialog Root props; SheetContent forwards Radix Dialog Content props.',
    },
  ],
}
