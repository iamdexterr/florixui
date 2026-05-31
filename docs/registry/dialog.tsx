import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const dialogDoc: ComponentDoc = {
  slug: 'dialog',
  name: 'Dialog',
  group: 'Overlays',
  description:
    'A modal window overlaid on the page that interrupts the user to require a response, such as a confirmation or a focused form.',
  usage: (
    <>
      <p>
        Compose a <code>Dialog</code> from a <code>DialogTrigger</code> and a{' '}
        <code>DialogContent</code>. The content is portalled to the document
        body and renders an overlay that traps focus until dismissed. Always
        give the dialog a <code>DialogTitle</code> so assistive technology can
        announce it.
      </p>
      <ul>
        <li>
          Include a <code>DialogTitle</code> (and ideally a{' '}
          <code>DialogDescription</code>) so screen readers can label and
          describe the dialog.
        </li>
        <li>
          Use <code>DialogClose</code> for buttons that should dismiss the
          dialog, including the implicit confirm/cancel actions in the footer.
        </li>
        <li>
          The dialog traps focus, closes on <kbd>Esc</kbd> or overlay click, and
          restores focus to the trigger on close; don&apos;t override these.
        </li>
        <li>
          Reserve dialogs for tasks that genuinely require interrupting the
          user; prefer inline UI for non-blocking information.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A trigger that opens a titled, described dialog.',
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share document</DialogTitle>
              <DialogDescription>
                Anyone with the link will be able to view this document.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Copy link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Share document</DialogTitle>
      <DialogDescription>
        Anyone with the link will be able to view this document.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Copy link</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      name: 'Confirmation',
      description:
        'A destructive action confirmed in a dialog, with a built-in close button on the footer.',
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This permanently deletes your account and removes your data from
                our servers. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This permanently deletes your account and removes your data from
        our servers. This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter showCloseButton>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      name: 'Without close button',
      description:
        'Hide the default top-right close affordance with showCloseButton={false} when the footer fully controls dismissal.',
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Accept terms</DialogTitle>
              <DialogDescription>
                You must choose an option below to continue.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Decline</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Accept</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Accept terms</DialogTitle>
      <DialogDescription>
        You must choose an option below to continue.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Decline</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button>Accept</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description:
        'Controlled open state of the dialog. Use with onOpenChange for controlled usage (Dialog).',
    },
    {
      prop: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Open state when initially rendered, for uncontrolled usage (Dialog).',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the open state changes (Dialog).',
    },
    {
      prop: 'modal',
      type: 'boolean',
      default: 'true',
      description:
        'Whether the dialog is modal, blocking interaction with the rest of the page (Dialog).',
    },
    {
      prop: 'showCloseButton',
      type: 'boolean',
      default: 'true',
      description:
        'Renders the top-right close button inside DialogContent. Set false to manage dismissal yourself.',
    },
    {
      prop: 'showCloseButton (DialogFooter)',
      type: 'boolean',
      default: 'false',
      description:
        'When true, DialogFooter appends an outline "Close" button wired to DialogClose.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof DialogPrimitive.Root>',
      description:
        'All Radix Dialog props are forwarded; sub-components forward their respective Radix and native element props.',
    },
  ],
}
