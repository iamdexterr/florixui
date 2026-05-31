import * as React from 'react'
import { Progress } from '@/components/ui/progress'
import type { ComponentDoc } from './types'

/** Stateless animated demo: walks the bar from 0 to 100 and loops. */
function AnimatedProgress() {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 600)
    return () => clearInterval(id)
  }, [])

  return <Progress value={value} />
}

export const progressDoc: ComponentDoc = {
  slug: 'progress',
  name: 'Progress',
  group: 'Display',
  description:
    'Displays an indicator showing the completion progress of a task, such as a download or upload.',
  usage: (
    <>
      <p>
        Use a <code>Progress</code> bar to communicate the proportion of a
        determinate task that has completed. Set <code>value</code> as a number
        between <code>0</code> and <code>max</code> (defaults to{' '}
        <code>100</code>); leave it undefined for an indeterminate state.
      </p>
      <ul>
        <li>
          Reserve it for determinate progress where you can measure completion;
          for unknown durations prefer a spinner.
        </li>
        <li>
          The component renders a Radix progress role, so pair it with a visible
          label or <code>aria-label</code> describing what is loading.
        </li>
        <li>
          Provide <code>aria-valuetext</code> when a percentage alone is not
          meaningful (e.g. &ldquo;Step 2 of 4&rdquo;).
        </li>
        <li>
          Keep the bar full-width within its container; constrain width on a
          wrapping element rather than the bar itself.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Default',
      description: 'A static bar at 60% completion.',
      render: () => (
        <div className="w-full max-w-sm">
          <Progress value={60} aria-label="Loading" />
        </div>
      ),
      code: `<Progress value={60} aria-label="Loading" />`,
    },
    {
      name: 'Levels',
      description: 'A few discrete completion values.',
      render: () => (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Progress value={0} aria-label="0 percent" />
          <Progress value={25} aria-label="25 percent" />
          <Progress value={50} aria-label="50 percent" />
          <Progress value={100} aria-label="100 percent" />
        </div>
      ),
      code: `<Progress value={0} aria-label="0 percent" />
<Progress value={25} aria-label="25 percent" />
<Progress value={50} aria-label="50 percent" />
<Progress value={100} aria-label="100 percent" />`,
    },
    {
      name: 'Animated',
      description: 'Drive value from state to show live progress.',
      render: () => (
        <div className="w-full max-w-sm">
          <AnimatedProgress />
        </div>
      ),
      code: `function AnimatedProgress() {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 600)
    return () => clearInterval(id)
  }, [])

  return <Progress value={value} />
}`,
    },
    {
      name: 'Custom max',
      description: 'Report progress against a non-percentage scale.',
      render: () => (
        <div className="w-full max-w-sm">
          <Progress
            value={3}
            max={5}
            aria-label="Step 3 of 5"
            aria-valuetext="Step 3 of 5"
          />
        </div>
      ),
      code: `<Progress
  value={3}
  max={5}
  aria-label="Step 3 of 5"
  aria-valuetext="Step 3 of 5"
/>`,
    },
  ],
  props: [
    {
      prop: 'value',
      type: 'number | null',
      default: 'undefined',
      description:
        'Current progress, from 0 to max. Omit (or pass null) for an indeterminate bar.',
    },
    {
      prop: 'max',
      type: 'number',
      default: '100',
      description: 'The maximum value, defining the upper bound of progress.',
    },
    {
      prop: 'getValueLabel',
      type: '(value: number, max: number) => string',
      description:
        'Returns a human-readable label for the current value, used for accessibility.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Additional classes merged onto the root track element.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof ProgressPrimitive.Root>',
      description: 'All Radix Progress root props are forwarded to the element.',
    },
  ],
}
