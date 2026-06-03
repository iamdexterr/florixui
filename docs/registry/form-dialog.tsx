import { useState } from 'react'

import { FormDialog } from '@/components/custom/form-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { ComponentDoc } from './types'

function BasicExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit profile</Button>
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Edit profile"
        description="Update your details. Changes are saved when you submit."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </>
        }
      >
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fd-name">Name</Label>
            <Input id="fd-name" defaultValue="Ada Lovelace" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fd-bio">Bio</Label>
            <Textarea id="fd-bio" rows={4} placeholder="Tell us about yourself" />
          </div>
        </form>
      </FormDialog>
    </>
  )
}

function NotDismissableExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open required form
      </Button>
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        notDismissable
        title="Confirm your email"
        description="The overlay and Escape are disabled — use a button to close."
        footer={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        <div className="grid gap-2">
          <Label htmlFor="fd-email">Email</Label>
          <Input id="fd-email" type="email" placeholder="you@example.com" />
        </div>
      </FormDialog>
    </>
  )
}

export const formDialogDoc: ComponentDoc = {
  slug: 'form-dialog',
  name: 'Form Dialog',
  group: 'Custom',
  description:
    'A pre-composed modal for forms: a fixed bordered header (title, description, close button), a scrollable body, and an optional pinned footer for actions. Controlled via open/onClose.',
  usage: (
    <>
      <p>
        <code>FormDialog</code> wraps the base <code>Dialog</code> with the
        common form-modal layout so you only supply content. It is{' '}
        <strong>controlled</strong> — drive it with <code>open</code> and{' '}
        <code>onClose</code>.
      </p>
      <ul>
        <li>
          The <code>title</code> and <code>description</code> render in a fixed,
          bordered header with a close button; the body scrolls when it
          overflows (capped at <code>75vh</code>).
        </li>
        <li>
          Pass actions via <code>footer</code> — it stays pinned below the
          scroll area with a top border.
        </li>
        <li>
          Set <code>notDismissable</code> to disable overlay-click and Escape so
          the user must take an explicit action.
        </li>
        <li>
          Always provide a <code>title</code> so assistive tech can announce the
          dialog (Radix requires an accessible title).
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A controlled form modal with header, scrollable body, and footer actions.',
      render: () => <BasicExample />,
      code: `function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit profile</Button>
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Edit profile"
        description="Update your details. Changes are saved when you submit."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </>
        }
      >
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Ada Lovelace" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={4} />
          </div>
        </form>
      </FormDialog>
    </>
  )
}`,
    },
    {
      name: 'Not dismissable',
      description:
        'Disable overlay-click and Escape so the user must use an action to close.',
      render: () => <NotDismissableExample />,
      code: `<FormDialog
  open={open}
  onClose={() => setOpen(false)}
  notDismissable
  title="Confirm your email"
  footer={<Button onClick={() => setOpen(false)}>Done</Button>}
>
  {/* ... */}
</FormDialog>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description: 'Whether the dialog is open. Controlled.',
    },
    {
      prop: 'onClose',
      type: '() => void',
      description: 'Called when the dialog requests to close (X, overlay, or Esc).',
    },
    {
      prop: 'title',
      type: 'React.ReactNode',
      description: 'Heading shown in the bordered header. Omit to hide the header.',
    },
    {
      prop: 'description',
      type: 'React.ReactNode',
      description: 'Optional supporting text under the title.',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      description: 'Body content — typically a form. Scrolls when it overflows.',
    },
    {
      prop: 'footer',
      type: 'React.ReactNode',
      description: 'Footer actions, pinned below the body with a top border.',
    },
    {
      prop: 'notDismissable',
      type: 'boolean',
      default: 'false',
      description: 'Disable overlay-click and Escape dismissal.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the dialog content surface.',
    },
  ],
}
