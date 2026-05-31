import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const hoverCardDoc: ComponentDoc = {
  slug: 'hover-card',
  name: 'Hover Card',
  group: 'Overlays',
  description:
    'Shows rich preview content in a floating card when the user hovers over or focuses a trigger.',
  usage: (
    <>
      <p>
        Use a <code>HoverCard</code> to give sighted users a quick preview of
        content behind a link or name (a profile, a definition, a thumbnail)
        without requiring a click. It is purely supplementary, so never hide
        essential information or actions inside it.
      </p>
      <ul>
        <li>
          Open on hover <em>and</em> focus is handled for you, but the card is
          not keyboard-reachable on touch devices, so don&apos;t use it for
          critical content.
        </li>
        <li>
          Wrap an interactive element (link or button) in{' '}
          <code>HoverCardTrigger</code> via <code>asChild</code> so the trigger
          stays focusable.
        </li>
        <li>
          Tune <code>openDelay</code> / <code>closeDelay</code> to avoid the
          card flickering as the pointer passes over the trigger.
        </li>
        <li>
          For an instructional tooltip with a short text label, prefer a
          Tooltip instead.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'Hover the trigger to reveal a preview card.',
      render: () => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="font-medium">@shadcn</p>
            <p className="text-muted-foreground">
              Creator of the component library. Hover to learn more.
            </p>
          </HoverCardContent>
        </HoverCard>
      ),
      code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@shadcn</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <p className="font-medium">@shadcn</p>
    <p className="text-muted-foreground">
      Creator of the component library. Hover to learn more.
    </p>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      name: 'Custom alignment',
      description:
        'Position the content with align and sideOffset (forwarded to Radix).',
      render: () => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent align="start" sideOffset={8}>
            Aligned to the start edge of the trigger with extra offset.
          </HoverCardContent>
        </HoverCard>
      ),
      code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </HoverCardTrigger>
  <HoverCardContent align="start" sideOffset={8}>
    Aligned to the start edge of the trigger with extra offset.
  </HoverCardContent>
</HoverCard>`,
    },
    {
      name: 'Custom delays',
      description: 'Control how quickly the card opens and closes.',
      render: () => (
        <HoverCard openDelay={100} closeDelay={200}>
          <HoverCardTrigger asChild>
            <Button variant="link">Quick preview</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Opens after 100ms and closes 200ms after the pointer leaves.
          </HoverCardContent>
        </HoverCard>
      ),
      code: `<HoverCard openDelay={100} closeDelay={200}>
  <HoverCardTrigger asChild>
    <Button variant="link">Quick preview</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    Opens after 100ms and closes 200ms after the pointer leaves.
  </HoverCardContent>
</HoverCard>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description:
        'Controlled open state of the hover card. Pair with onOpenChange.',
    },
    {
      prop: 'defaultOpen',
      type: 'boolean',
      description: 'Open state when initially rendered (uncontrolled).',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the open state changes.',
    },
    {
      prop: 'openDelay',
      type: 'number',
      default: '700',
      description:
        'Duration in ms from when the pointer enters the trigger until the card opens.',
    },
    {
      prop: 'closeDelay',
      type: 'number',
      default: '300',
      description:
        'Duration in ms from when the pointer leaves the trigger or content until the card closes.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof HoverCardPrimitive.Root>',
      description: 'All Radix HoverCard.Root props are forwarded.',
    },
  ],
}
