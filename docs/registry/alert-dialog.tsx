import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const alertDialogDoc: ComponentDoc = {
  slug: 'alert-dialog',
  name: 'Alert Dialog',
  group: 'Overlays',
  description:
    'A modal dialog that interrupts the user with important content and expects a confirm or cancel response before continuing.',
  usage: (
    <>
      <p>
        Use an <code>AlertDialog</code> to confirm a consequential or
        irreversible action (delete, sign out, discard changes). Unlike a plain
        dialog, it is intentionally interruptive and traps focus until the user
        chooses <code>AlertDialogAction</code> or <code>AlertDialogCancel</code>.
      </p>
      <ul>
        <li>
          Always include an <code>AlertDialogTitle</code> and{' '}
          <code>AlertDialogDescription</code>; they are wired to the dialog for
          screen readers.
        </li>
        <li>
          Give the destructive <code>AlertDialogAction</code> a{' '}
          <code>variant="destructive"</code> and a clear, action-specific label
          like &ldquo;Delete&rdquo; rather than &ldquo;OK&rdquo;.
        </li>
        <li>
          Reserve alert dialogs for moments that truly require a decision;
          overuse trains users to dismiss them reflexively.
        </li>
        <li>
          Focus is trapped while open and returns to the trigger on close;
          <code>Escape</code> activates the cancel action.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Confirm a destructive action',
      description:
        'The canonical pattern: a title, description, and a cancel/action pair in the footer.',
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently deletes your account and removes your data from
                our servers. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Delete account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This permanently deletes your account and removes your data from
        our servers. This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">
        Delete account
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
    {
      name: 'With media icon',
      description:
        'Use AlertDialogMedia to lead the header with an icon for added emphasis.',
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Sign out</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </AlertDialogMedia>
              <AlertDialogTitle>Sign out of this device?</AlertDialogTitle>
              <AlertDialogDescription>
                You will need to sign in again to access your workspace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay signed in</AlertDialogCancel>
              <AlertDialogAction>Sign out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Sign out</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogMedia>
        <LogOutIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Sign out of this device?</AlertDialogTitle>
      <AlertDialogDescription>
        You will need to sign in again to access your workspace.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Stay signed in</AlertDialogCancel>
      <AlertDialogAction>Sign out</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
    {
      name: 'Compact (size="sm")',
      description:
        'A smaller content surface that stacks footer buttons into two equal columns.',
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Discard draft</Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Discard this draft?</AlertDialogTitle>
              <AlertDialogDescription>
                Your unsaved changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep editing</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Discard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Discard draft</Button>
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogTitle>Discard this draft?</AlertDialogTitle>
      <AlertDialogDescription>
        Your unsaved changes will be lost.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep editing</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Discard</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description:
        'Controls the open state of the dialog. Use with onOpenChange for a controlled dialog.',
    },
    {
      prop: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Open state when initially rendered (uncontrolled).',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the open state changes.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof AlertDialogPrimitive.Root>',
      description:
        'All props of the underlying Radix AlertDialog Root are forwarded.',
    },
  ],
}
