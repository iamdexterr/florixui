import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const spinnerDoc: ComponentDoc = {
  slug: 'spinner',
  name: 'Spinner',
  group: 'Display',
  description:
    'An animated loading indicator that communicates that content or an action is in progress.',
  usage: (
    <>
      <p>
        Use a <code>Spinner</code> to signal an indeterminate wait, such as
        loading data or processing a submitted form. It renders a spinning{' '}
        <code>svg</code> sized with the <code>size-*</code> utility, so control
        its dimensions and color through <code>className</code> rather than a
        size prop.
      </p>
      <ul>
        <li>
          The spinner sets <code>role="status"</code> and{' '}
          <code>aria-label="Loading"</code> so assistive technology announces
          the busy state; you can override the label by passing your own{' '}
          <code>aria-label</code>.
        </li>
        <li>
          Match the spinner to surrounding text by setting size with{' '}
          <code>className="size-4"</code> and color with{' '}
          <code>text-*</code> utilities, since it inherits{' '}
          <code>currentColor</code>.
        </li>
        <li>
          For known-duration or measurable work, prefer a determinate progress
          indicator over a spinner.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'The base spinner, sized to match adjacent text.',
      render: () => <Spinner />,
      code: `<Spinner />`,
    },
    {
      name: 'Sizes',
      description: 'Control the dimensions with size-* utility classes.',
      render: () => (
        <div className="flex items-center gap-4">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
      ),
      code: `<Spinner className="size-4" />
<Spinner className="size-6" />
<Spinner className="size-8" />`,
    },
    {
      name: 'Colors',
      description: 'The spinner inherits currentColor via text-* utilities.',
      render: () => (
        <div className="flex items-center gap-4">
          <Spinner className="size-6 text-primary" />
          <Spinner className="size-6 text-muted-foreground" />
          <Spinner className="size-6 text-destructive" />
        </div>
      ),
      code: `<Spinner className="size-6 text-primary" />
<Spinner className="size-6 text-muted-foreground" />
<Spinner className="size-6 text-destructive" />`,
    },
    {
      name: 'Inside a button',
      description: 'Pair with a button label to show a pending action.',
      render: () => (
        <Button disabled>
          <Spinner className="size-4" />
          Saving...
        </Button>
      ),
      code: `<Button disabled>
  <Spinner className="size-4" />
  Saving...
</Button>`,
    },
  ],
  props: [
    {
      prop: 'className',
      type: 'string',
      description:
        'Tailwind classes merged onto the icon; use size-* for dimensions and text-* for color. Defaults include "size-4 animate-spin".',
    },
    {
      prop: 'aria-label',
      type: 'string',
      default: '"Loading"',
      description:
        'Accessible label announced by screen readers for the status role.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"svg">',
      description: 'All native SVG attributes are forwarded to the icon.',
    },
  ],
}
