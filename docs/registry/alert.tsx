import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Terminal, AlertCircle } from 'lucide-react'
import type { ComponentDoc } from './types'

export const alertDoc: ComponentDoc = {
  slug: 'alert',
  name: 'Alert',
  group: 'Display',
  description:
    'Displays a short, important message that draws attention without interrupting the user.',
  usage: (
    <>
      <p>
        Use an <code>Alert</code> to surface inline, contextual information such
        as a status update, a warning, or a result of an action. It renders with{' '}
        <code>role="alert"</code>, so assistive technology announces it when it
        appears. Compose it from <code>AlertTitle</code>,{' '}
        <code>AlertDescription</code>, and an optional <code>AlertAction</code>.
      </p>
      <ul>
        <li>
          Reserve the <code>destructive</code> variant for errors and failures,
          not for routine information.
        </li>
        <li>
          Place an optional leading icon as the first child; the layout reserves
          a column for it automatically.
        </li>
        <li>
          Keep the message concise and actionable; for transient feedback that
          dismisses itself, prefer a toast instead.
        </li>
        <li>
          Because it announces immediately, avoid mounting many alerts at once
          on the same screen.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A title and a short supporting description.',
      render: () => (
        <Alert>
          <Terminal />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the CLI.
          </AlertDescription>
        </Alert>
      ),
      code: `<Alert>
  <Terminal />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`,
    },
    {
      name: 'Destructive',
      description: 'Use for errors and failed operations.',
      render: () => (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Unable to save changes</AlertTitle>
          <AlertDescription>
            Your session has expired. Please sign in again to continue.
          </AlertDescription>
        </Alert>
      ),
      code: `<Alert variant="destructive">
  <AlertCircle />
  <AlertTitle>Unable to save changes</AlertTitle>
  <AlertDescription>
    Your session has expired. Please sign in again to continue.
  </AlertDescription>
</Alert>`,
    },
    {
      name: 'With action',
      description: 'Pair the message with a follow-up action.',
      render: () => (
        <Alert>
          <Terminal />
          <AlertTitle>Update available</AlertTitle>
          <AlertDescription>
            A new version is ready to install.
          </AlertDescription>
          <AlertAction>
            <Button size="sm" variant="outline">
              Update
            </Button>
          </AlertAction>
        </Alert>
      ),
      code: `<Alert>
  <Terminal />
  <AlertTitle>Update available</AlertTitle>
  <AlertDescription>
    A new version is ready to install.
  </AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outline">
      Update
    </Button>
  </AlertAction>
</Alert>`,
    },
    {
      name: 'Title only',
      description: 'A compact alert with no description.',
      render: () => (
        <Alert>
          <Terminal />
          <AlertTitle>Your changes have been saved.</AlertTitle>
        </Alert>
      ),
      code: `<Alert>
  <Terminal />
  <AlertTitle>Your changes have been saved.</AlertTitle>
</Alert>`,
    },
  ],
  props: [
    {
      prop: 'variant',
      type: '"default" | "destructive"',
      default: '"default"',
      description:
        'Visual style of the alert. Use "destructive" for errors and failures.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"div">',
      description:
        'All native div attributes are forwarded; the root renders with role="alert".',
    },
  ],
}
