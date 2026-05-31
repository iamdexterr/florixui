import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ComponentDoc } from './types'

export const popoverDoc: ComponentDoc = {
  slug: 'popover',
  name: 'Popover',
  group: 'Overlays',
  description:
    'Displays rich, floating content in a portal, anchored to a trigger and toggled by click.',
  usage: (
    <>
      <p>
        Use a <code>Popover</code> for interactive, non-modal content that
        appears on demand — small forms, settings, or extra detail anchored to a
        control. For purely informational hover text prefer a tooltip, and for
        flows that should block the rest of the page use a dialog instead.
      </p>
      <ul>
        <li>
          Always wrap a <code>PopoverContent</code> with a{' '}
          <code>PopoverTrigger</code> inside the same <code>Popover</code> root
          so focus and the open state stay connected.
        </li>
        <li>
          Use <code>PopoverHeader</code>, <code>PopoverTitle</code>, and{' '}
          <code>PopoverDescription</code> to give the panel an accessible,
          readable structure.
        </li>
        <li>
          Control placement with the <code>align</code> and{' '}
          <code>sideOffset</code> props on <code>PopoverContent</code>; the
          content is rendered in a portal so it escapes parent overflow.
        </li>
        <li>
          The popover traps focus and closes on <kbd>Esc</kbd> or an outside
          click — keep the trigger keyboard focusable.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A trigger that reveals a titled panel of content.',
      render: () => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the size for the selected layer.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ),
      code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the size for the selected layer.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`,
    },
    {
      name: 'With a form',
      description: 'Compose inputs inside the panel for a quick edit affordance.',
      render: () => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Edit width</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the width in pixels.
              </PopoverDescription>
            </PopoverHeader>
            <div className="grid gap-1.5">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100" />
            </div>
          </PopoverContent>
        </Popover>
      ),
      code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Edit width</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the width in pixels.
      </PopoverDescription>
    </PopoverHeader>
    <div className="grid gap-1.5">
      <Label htmlFor="width">Width</Label>
      <Input id="width" defaultValue="100" />
    </div>
  </PopoverContent>
</Popover>`,
    },
    {
      name: 'Alignment',
      description:
        'Control where the panel sits relative to its trigger with align.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Align start</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <PopoverDescription>Aligned to the start edge.</PopoverDescription>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Align end</Button>
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={8}>
              <PopoverDescription>Aligned to the end edge.</PopoverDescription>
            </PopoverContent>
          </Popover>
        </div>
      ),
      code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Align start</Button>
  </PopoverTrigger>
  <PopoverContent align="start">
    <PopoverDescription>Aligned to the start edge.</PopoverDescription>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Align end</Button>
  </PopoverTrigger>
  <PopoverContent align="end" sideOffset={8}>
    <PopoverDescription>Aligned to the end edge.</PopoverDescription>
  </PopoverContent>
</Popover>`,
    },
    {
      name: 'Custom anchor',
      description:
        'Anchor the panel to an element other than the trigger via PopoverAnchor.',
      render: () => (
        <Popover>
          <PopoverAnchor asChild>
            <span className="inline-block rounded-md border px-3 py-1.5 text-sm">
              Anchored here
            </span>
          </PopoverAnchor>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-3">
              Toggle
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverDescription>
              This panel positions relative to the anchor, not the trigger.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      ),
      code: `<Popover>
  <PopoverAnchor asChild>
    <span className="inline-block rounded-md border px-3 py-1.5 text-sm">
      Anchored here
    </span>
  </PopoverAnchor>
  <PopoverTrigger asChild>
    <Button variant="outline" className="ml-3">
      Toggle
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverDescription>
      This panel positions relative to the anchor, not the trigger.
    </PopoverDescription>
  </PopoverContent>
</Popover>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description:
        'Controlled open state of the popover (Popover root). Pair with onOpenChange.',
    },
    {
      prop: 'defaultOpen',
      type: 'boolean',
      default: 'false',
      description: 'Open state when uncontrolled (Popover root).',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the open state changes (Popover root).',
    },
    {
      prop: 'modal',
      type: 'boolean',
      default: 'false',
      description:
        'When true, interaction with outside elements is disabled while open (Popover root).',
    },
    {
      prop: 'align',
      type: '"start" | "center" | "end"',
      default: '"center"',
      description: 'Alignment against the anchor on PopoverContent.',
    },
    {
      prop: 'sideOffset',
      type: 'number',
      default: '4',
      description: 'Distance in pixels between the content and the anchor (PopoverContent).',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof PopoverPrimitive.*>',
      description:
        'All Radix Popover primitive props are forwarded to the matching part (Root, Trigger, Content, Anchor).',
    },
  ],
}
