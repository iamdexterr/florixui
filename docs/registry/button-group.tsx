import { Button } from '@/components/ui/button'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group'
import type { ComponentDoc } from './types'

export const buttonGroupDoc: ComponentDoc = {
  slug: 'button-group',
  name: 'Button Group',
  group: 'Forms',
  description:
    'Visually and semantically groups a set of related buttons (or button-like elements) into a single connected control.',
  usage: (
    <>
      <p>
        Wrap related <code>Button</code> elements in a <code>ButtonGroup</code>{' '}
        to merge their adjacent borders and corners into one cohesive control.
        Use <code>ButtonGroupText</code> for inline labels or affixes and{' '}
        <code>ButtonGroupSeparator</code> to divide segments. The group renders a{' '}
        <code>role="group"</code> container.
      </p>
      <ul>
        <li>
          Group only buttons that perform <em>related</em> actions; unrelated
          actions should stand on their own.
        </li>
        <li>
          Use <code>orientation="vertical"</code> for stacked layouts
          such as toolbars in narrow containers.
        </li>
        <li>
          Provide an <code>aria-label</code> on the group so assistive
          technology can announce its purpose.
        </li>
        <li>
          Each member keeps its own focus ring and raises its z-index on focus;
          don&apos;t remove the outline.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A row of connected buttons sharing a single outline.',
      render: () => (
        <ButtonGroup aria-label="Text alignment">
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      ),
      code: `<ButtonGroup aria-label="Text alignment">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`,
    },
    {
      name: 'Vertical orientation',
      description: 'Stack members top-to-bottom with orientation="vertical".',
      render: () => (
        <ButtonGroup orientation="vertical" aria-label="View options">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      ),
      code: `<ButtonGroup orientation="vertical" aria-label="View options">
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`,
    },
    {
      name: 'With text and separator',
      description:
        'Combine ButtonGroupText for an inline label and ButtonGroupSeparator to divide segments.',
      render: () => (
        <ButtonGroup aria-label="Amount">
          <ButtonGroupText>$</ButtonGroupText>
          <Button variant="outline">10</Button>
          <Button variant="outline">25</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Custom</Button>
        </ButtonGroup>
      ),
      code: `<ButtonGroup aria-label="Amount">
  <ButtonGroupText>$</ButtonGroupText>
  <Button variant="outline">10</Button>
  <Button variant="outline">25</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Custom</Button>
</ButtonGroup>`,
    },
    {
      name: 'Nested groups',
      description:
        'Groups placed side by side are automatically spaced apart with a gap.',
      render: () => (
        <ButtonGroup aria-label="Editor toolbar">
          <ButtonGroup>
            <Button variant="outline">Bold</Button>
            <Button variant="outline">Italic</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Undo</Button>
            <Button variant="outline">Redo</Button>
          </ButtonGroup>
        </ButtonGroup>
      ),
      code: `<ButtonGroup aria-label="Editor toolbar">
  <ButtonGroup>
    <Button variant="outline">Bold</Button>
    <Button variant="outline">Italic</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Undo</Button>
    <Button variant="outline">Redo</Button>
  </ButtonGroup>
</ButtonGroup>`,
    },
  ],
  props: [
    {
      prop: 'orientation',
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description:
        'Lays the members out in a row or a column, adjusting which borders and corners are merged.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Additional classes merged onto the group container.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"div">',
      description:
        'All native div attributes are forwarded (the container renders role="group").',
    },
  ],
}
