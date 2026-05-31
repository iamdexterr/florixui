import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const cardDoc: ComponentDoc = {
  slug: 'card',
  name: 'Card',
  group: 'Display',
  description:
    'A bordered surface that groups related content and actions into a single container.',
  usage: (
    <>
      <p>
        Compose a <code>Card</code> from its parts: <code>CardHeader</code> (with{' '}
        <code>CardTitle</code>, <code>CardDescription</code>, and an optional{' '}
        <code>CardAction</code>), <code>CardContent</code> for the body, and{' '}
        <code>CardFooter</code> for actions or metadata.
      </p>
      <ul>
        <li>
          Use a single <code>CardTitle</code> per card so the heading hierarchy
          stays clear; render it as a heading element when the card is a landmark
          region.
        </li>
        <li>
          Place primary actions in <code>CardFooter</code> and contextual controls
          (like a menu) in <code>CardAction</code>, which aligns to the top-right of
          the header.
        </li>
        <li>
          Use <code>size="sm"</code> for dense layouts; it tightens padding and gaps
          across all card parts.
        </li>
        <li>
          The card is a plain <code>div</code> with no implicit semantics; add{' '}
          <code>role</code>/<code>aria-*</code> attributes if it conveys structure.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'Header, content, and footer composed together.',
      render: () => (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Name your project and choose a region to get started.
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      ),
      code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>
      Deploy your new project in one click.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">
      Name your project and choose a region to get started.
    </p>
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`,
    },
    {
      name: 'With action',
      description:
        'A CardAction renders a control aligned to the top-right of the header.',
      render: () => (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm">
                Mark all read
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Choose what you want to be notified about.
            </p>
          </CardContent>
        </Card>
      ),
      code: `<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="sm">
        Mark all read
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">
      Choose what you want to be notified about.
    </p>
  </CardContent>
</Card>`,
    },
    {
      name: 'Small',
      description: 'Use size="sm" for a denser card with tighter spacing.',
      render: () => (
        <Card size="sm" className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Storage</CardTitle>
            <CardDescription>4.2 GB of 10 GB used</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Upgrade for more space.</p>
          </CardContent>
        </Card>
      ),
      code: `<Card size="sm" className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Storage</CardTitle>
    <CardDescription>4.2 GB of 10 GB used</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Upgrade for more space.</p>
  </CardContent>
</Card>`,
    },
  ],
  props: [
    {
      prop: 'size',
      type: '"default" | "sm"',
      default: '"default"',
      description:
        'Controls the density of the card and its parts (padding and gaps).',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"div">',
      description: 'All native div attributes are forwarded to the root element.',
    },
  ],
}
