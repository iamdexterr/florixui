import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { ComponentDoc } from './types'

export const tooltipDoc: ComponentDoc = {
  slug: 'tooltip',
  name: 'Tooltip',
  group: 'Overlays',
  description:
    'Displays a brief, contextual label in a popup when the user hovers or focuses an element.',
  usage: (
    <>
      <p>
        Wrap your app (or the nearest interactive region) in a single{' '}
        <code>TooltipProvider</code>, then compose a <code>Tooltip</code> from a{' '}
        <code>TooltipTrigger</code> and a <code>TooltipContent</code>. The
        trigger should be an already-interactive element such as a button or
        link.
      </p>
      <ul>
        <li>
          Use tooltips for supplementary hints only; never put essential
          information or interactive controls inside one.
        </li>
        <li>
          Prefer <code>asChild</code> on <code>TooltipTrigger</code> so the
          tooltip attaches to your real button instead of an extra wrapper.
        </li>
        <li>
          Tooltips open on hover and on keyboard focus, and dismiss on blur or
          Escape, keeping them accessible to keyboard users.
        </li>
        <li>
          Set <code>delayDuration</code> on the provider to tune how long the
          pointer must rest before the tooltip appears.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A tooltip attached to a button via asChild.',
      render: () => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    },
    {
      name: 'Sides',
      description: 'Position the content with the side prop on TooltipContent.',
      render: () => (
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Top</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">Right</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Bottom</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">Left</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
      code: `<TooltipProvider>
  <div className="flex flex-wrap items-center gap-3">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Top</Button>
      </TooltipTrigger>
      <TooltipContent side="top">Top</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Right</Button>
      </TooltipTrigger>
      <TooltipContent side="right">Right</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Bottom</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Bottom</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Left</Button>
      </TooltipTrigger>
      <TooltipContent side="left">Left</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
    },
    {
      name: 'Custom delay',
      description:
        'Use delayDuration on the provider to require a longer hover before opening.',
      render: () => (
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Wait for it</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Appears after 500ms</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      code: `<TooltipProvider delayDuration={500}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Wait for it</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Appears after 500ms</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description:
        'Controlled open state of the tooltip. Use with onOpenChange.',
    },
    {
      prop: 'defaultOpen',
      type: 'boolean',
      description: 'Open state when initially rendered, for uncontrolled use.',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the open state changes.',
    },
    {
      prop: 'delayDuration',
      type: 'number',
      default: '0',
      description:
        'Set on TooltipProvider: delay in ms before the tooltip opens on hover.',
    },
    {
      prop: 'side',
      type: '"top" | "right" | "bottom" | "left"',
      default: '"top"',
      description:
        'Set on TooltipContent: preferred side of the trigger to render against.',
    },
    {
      prop: 'sideOffset',
      type: 'number',
      default: '0',
      description:
        'Set on TooltipContent: distance in px between the content and the trigger.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof TooltipPrimitive.Root>',
      description:
        'All Radix Tooltip props are forwarded to their respective parts.',
    },
  ],
}
