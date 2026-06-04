import { useState } from 'react'

import { ConfirmPrompt } from '@/components/custom/confirm-prompt'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

function BasicExample() {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setShow(true)}>
        Delete project
      </Button>
      <ConfirmPrompt
        show={show}
        onCancel={() => setShow(false)}
        onConfirm={() => setShow(false)}
        title="Delete project?"
        message="This action cannot be undone. This will permanently delete the project and remove its data from our servers."
        confirmLabel="Delete"
      />
    </>
  )
}

function ValidateExample() {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setShow(true)}>
        Delete &ldquo;my-project&rdquo;
      </Button>
      <ConfirmPrompt
        show={show}
        onCancel={() => setShow(false)}
        onConfirm={() => setShow(false)}
        validate
        item="my-project"
      />
    </>
  )
}

function AsyncExample() {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button variant="destructive" onClick={() => setShow(true)}>
        Delete account
      </Button>
      <ConfirmPrompt
        show={show}
        onCancel={() => setShow(false)}
        onConfirm={async () => {
          // The confirm button shows a spinner until this resolves.
          await new Promise((r) => setTimeout(r, 1500))
          setShow(false)
        }}
        title="Delete account?"
        message="We'll permanently remove your account and all associated data."
        validate
        item="DELETE"
        confirmLabel="Delete account"
      />
    </>
  )
}

export const confirmPromptDoc: ComponentDoc = {
  slug: 'confirm-prompt',
  name: 'Confirm Prompt',
  group: 'Custom',
  description:
    'A confirmation dialog for risky actions — mainly deletes. An amber warning icon sits beside the title with a red confirm button, plus an optional type-to-confirm safeguard and async loading support.',
  usage: (
    <>
      <p>
        <code>ConfirmPrompt</code> is a pre-composed confirmation modal for
        actions you want the user to think twice about. Control it with{' '}
        <code>show</code> / <code>onCancel</code> and handle the action in{' '}
        <code>onConfirm</code>.
      </p>
      <ul>
        <li>
          Set <code>validate</code> to require the user to type{' '}
          <code>item</code> exactly before the confirm button enables — the
          &ldquo;type the name to delete&rdquo; safeguard.
        </li>
        <li>
          Return a promise from <code>onConfirm</code> to show a spinner on the
          confirm button; while loading the prompt can&rsquo;t be dismissed.
        </li>
        <li>
          Customize copy with <code>title</code>, <code>message</code>,{' '}
          <code>confirmLabel</code>, and <code>cancelLabel</code>.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Delete confirmation',
      description: 'One-click confirm with the amber warning icon and red button.',
      render: () => <BasicExample />,
      code: `const [show, setShow] = useState(false)

<Button variant="destructive" onClick={() => setShow(true)}>
  Delete project
</Button>
<ConfirmPrompt
  show={show}
  onCancel={() => setShow(false)}
  onConfirm={() => deleteProject(id)}
  title="Delete project?"
  message="This action cannot be undone…"
  confirmLabel="Delete"
/>`,
    },
    {
      name: 'Type to confirm',
      description: 'Require typing an exact string before the confirm enables.',
      render: () => <ValidateExample />,
      code: `<ConfirmPrompt
  show={show}
  onCancel={() => setShow(false)}
  onConfirm={() => deleteItem(id)}
  validate
  item="my-project"
/>`,
    },
    {
      name: 'Async (loading)',
      description: 'onConfirm returns a promise — the button shows a spinner.',
      render: () => <AsyncExample />,
      code: `<ConfirmPrompt
  show={show}
  onCancel={() => setShow(false)}
  onConfirm={async () => {
    await api.deleteAccount()
    setShow(false)
  }}
  title="Delete account?"
  validate
  item="DELETE"
  confirmLabel="Delete account"
/>`,
    },
  ],
  props: [
    {
      prop: 'show',
      type: 'boolean',
      description: 'Whether the prompt is open (controlled).',
    },
    {
      prop: 'onCancel',
      type: '() => void',
      description: 'Runs when the user cancels or dismisses.',
    },
    {
      prop: 'onConfirm',
      type: '() => void | Promise<void>',
      description:
        'Runs on confirm. Return a promise to show a spinner while it resolves.',
    },
    {
      prop: 'title',
      type: 'ReactNode',
      default: '"Are you absolutely sure?"',
      description: 'Heading shown next to the warning icon.',
    },
    {
      prop: 'message',
      type: 'ReactNode',
      description: 'Supporting copy explaining the consequence.',
    },
    {
      prop: 'validate',
      type: 'boolean',
      default: 'false',
      description: 'Require typing `item` exactly before confirm enables.',
    },
    {
      prop: 'item',
      type: 'string | null',
      default: '"CONFIRM"',
      description: 'The string the user must type when `validate` is set.',
    },
    {
      prop: 'loading',
      type: 'boolean',
      description: 'Show a spinner on confirm and block dismissal.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      description: 'Disable the confirm button regardless of validation.',
    },
    {
      prop: 'confirmLabel / cancelLabel',
      type: 'string',
      default: '"Confirm" / "Cancel"',
      description: 'Button labels.',
    },
  ],
}
