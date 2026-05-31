import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ComponentDoc } from './types'

export const tabsDoc: ComponentDoc = {
  slug: 'tabs',
  name: 'Tabs',
  group: 'Navigation',
  description:
    'A set of layered sections of content (tab panels) where only one panel is shown at a time.',
  usage: (
    <>
      <p>
        Compose <code>Tabs</code> from <code>TabsList</code> (containing one{' '}
        <code>TabsTrigger</code> per panel) and a matching <code>TabsContent</code>{' '}
        for each value. Use the uncontrolled <code>defaultValue</code> for most
        cases, or control selection with <code>value</code> and{' '}
        <code>onValueChange</code>.
      </p>
      <ul>
        <li>
          Every <code>TabsTrigger</code> needs a <code>value</code> that matches
          exactly one <code>TabsContent</code> <code>value</code>.
        </li>
        <li>
          Triggers are roving-tabindex focusable: use Arrow keys to move between
          tabs and Tab to leave the list, per the WAI-ARIA tabs pattern.
        </li>
        <li>
          Set <code>orientation="vertical"</code> when the tab list sits beside
          its content; this also switches arrow-key navigation to Up/Down.
        </li>
        <li>
          Prefer tabs for switching views of related content, not for sequential
          steps (use a stepper) or page navigation (use links).
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'An uncontrolled tab group with a default selected panel.',
      render: () => (
        <Tabs defaultValue="account" className="w-[360px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-muted-foreground">
              Make changes to your account here.
            </p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-muted-foreground">
              Change your password here.
            </p>
          </TabsContent>
        </Tabs>
      ),
      code: `<Tabs defaultValue="account" className="w-[360px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p className="text-muted-foreground">Make changes to your account here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p className="text-muted-foreground">Change your password here.</p>
  </TabsContent>
</Tabs>`,
    },
    {
      name: 'Line variant',
      description: 'A lighter underline style via the TabsList variant.',
      render: () => (
        <Tabs defaultValue="overview" className="w-[360px]">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-muted-foreground">Overview panel.</p>
          </TabsContent>
          <TabsContent value="activity">
            <p className="text-muted-foreground">Activity panel.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-muted-foreground">Settings panel.</p>
          </TabsContent>
        </Tabs>
      ),
      code: `<Tabs defaultValue="overview" className="w-[360px]">
  <TabsList variant="line">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <p className="text-muted-foreground">Overview panel.</p>
  </TabsContent>
  <TabsContent value="activity">
    <p className="text-muted-foreground">Activity panel.</p>
  </TabsContent>
  <TabsContent value="settings">
    <p className="text-muted-foreground">Settings panel.</p>
  </TabsContent>
</Tabs>`,
    },
    {
      name: 'Vertical orientation',
      description: 'A tab list placed beside its content.',
      render: () => (
        <Tabs
          defaultValue="general"
          orientation="vertical"
          className="w-[420px]"
        >
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <p className="text-muted-foreground">General settings.</p>
          </TabsContent>
          <TabsContent value="billing">
            <p className="text-muted-foreground">Billing settings.</p>
          </TabsContent>
          <TabsContent value="team">
            <p className="text-muted-foreground">Team settings.</p>
          </TabsContent>
        </Tabs>
      ),
      code: `<Tabs defaultValue="general" orientation="vertical" className="w-[420px]">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
  </TabsList>
  <TabsContent value="general">
    <p className="text-muted-foreground">General settings.</p>
  </TabsContent>
  <TabsContent value="billing">
    <p className="text-muted-foreground">Billing settings.</p>
  </TabsContent>
  <TabsContent value="team">
    <p className="text-muted-foreground">Team settings.</p>
  </TabsContent>
</Tabs>`,
    },
    {
      name: 'Disabled tab',
      description: 'Individual triggers can be disabled.',
      render: () => (
        <Tabs defaultValue="active" className="w-[360px]">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived" disabled>
              Archived
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <p className="text-muted-foreground">Your active items.</p>
          </TabsContent>
          <TabsContent value="archived">
            <p className="text-muted-foreground">Archived items.</p>
          </TabsContent>
        </Tabs>
      ),
      code: `<Tabs defaultValue="active" className="w-[360px]">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
  </TabsList>
  <TabsContent value="active">
    <p className="text-muted-foreground">Your active items.</p>
  </TabsContent>
  <TabsContent value="archived">
    <p className="text-muted-foreground">Archived items.</p>
  </TabsContent>
</Tabs>`,
    },
  ],
  props: [
    {
      prop: 'defaultValue',
      type: 'string',
      description:
        'The value of the tab selected by default (uncontrolled usage).',
    },
    {
      prop: 'value',
      type: 'string',
      description: 'The controlled value of the currently selected tab.',
    },
    {
      prop: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called when the selected tab changes.',
    },
    {
      prop: 'orientation',
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description:
        'Layout direction; also sets the arrow-key navigation axis.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof TabsPrimitive.Root>',
      description: 'All Radix Tabs Root props are forwarded.',
    },
  ],
}
