import { DollarSignIcon } from 'lucide-react'

import { StatCard } from '@/components/custom/stat-card'
import type { ComponentDoc } from './types'

const sparkData = [12, 18, 15, 22, 19, 14, 24, 21, 28, 26]

export const statCardDoc: ComponentDoc = {
  slug: 'stat-card',
  name: 'Stat Card',
  group: 'Custom',
  description:
    'A dashboard metric card with a title, a bold value, and an optional accessory — a tinted icon, a colored trend delta, a linear progress bar, a sparkline area chart, or a radial ring.',
  usage: (
    <>
      <p>
        <code>StatCard</code> always shows a muted <code>title</code> and a bold{' '}
        <code>value</code>. Add one accessory to change the look:
      </p>
      <ul>
        <li>
          <code>icon</code> — a tinted icon box at the top-right, with a muted{' '}
          <code>description</code> below the value.
        </li>
        <li>
          <code>trend</code> — a colored delta with a trend arrow (
          <code>direction</code> sets up/down and the color).
        </li>
        <li>
          <code>progress</code> — a linear bar with <code>caption</code> /{' '}
          <code>target</code> captions.
        </li>
        <li>
          <code>sparkline</code> — a small filled area chart from an array of
          numbers.
        </li>
        <li>
          <code>ring</code> — a radial progress ring beside the value.
        </li>
      </ul>
      <p>
        Tint every accessory with <code>color</code> (<code>primary</code>,{' '}
        <code>success</code>, <code>warning</code>, <code>danger</code>,{' '}
        <code>muted</code>).
      </p>
    </>
  ),
  examples: [
    {
      name: 'Icon',
      description: 'Title, tinted icon, value, and a muted description.',
      render: () => (
        <StatCard
          className="w-full max-w-md"
          title="Total Revenue"
          value="$45,231"
          description="+20.1% from last month"
          icon={<DollarSignIcon />}
          color="danger"
        />
      ),
      code: `<StatCard
  title="Total Revenue"
  value="$45,231"
  description="+20.1% from last month"
  icon={<DollarSignIcon />}
  color="danger"
/>`,
    },
    {
      name: 'Trend',
      description: 'A colored delta with a trend arrow.',
      render: () => (
        <StatCard
          className="w-full max-w-md"
          title="Total Revenue"
          value="$45,231.89"
          trend={{ value: '+20.1%', direction: 'up', label: 'from last month' }}
        />
      ),
      code: `<StatCard
  title="Total Revenue"
  value="$45,231.89"
  trend={{ value: '+20.1%', direction: 'up', label: 'from last month' }}
/>`,
    },
    {
      name: 'Progress',
      description: 'A linear progress bar with two captions.',
      render: () => (
        <StatCard
          className="w-full max-w-md"
          title="Monthly Goal"
          value="$7,500"
          progress={{
            value: 75,
            caption: '75% complete',
            target: 'Target: $10,000',
          }}
        />
      ),
      code: `<StatCard
  title="Monthly Goal"
  value="$7,500"
  progress={{ value: 75, caption: '75% complete', target: 'Target: $10,000' }}
/>`,
    },
    {
      name: 'Sparkline',
      description: 'A small filled area chart under the value.',
      render: () => (
        <StatCard
          className="w-full max-w-md"
          title="Active Users"
          value="2,350"
          color="warning"
          sparkline={sparkData}
        />
      ),
      code: `const sparkData = [12, 18, 15, 22, 19, 14, 24, 21, 28, 26]

<StatCard
  title="Active Users"
  value="2,350"
  color="warning"
  sparkline={sparkData}
/>`,
    },
    {
      name: 'Ring',
      description: 'A radial progress ring beside the value.',
      render: () => (
        <StatCard
          className="w-full max-w-md"
          title="Storage Used"
          value="75 GB"
          color="warning"
          ring={{ value: 75, caption: 'of 100 GB' }}
        />
      ),
      code: `<StatCard
  title="Storage Used"
  value="75 GB"
  color="warning"
  ring={{ value: 75, caption: 'of 100 GB' }}
/>`,
    },
  ],
  props: [
    { prop: 'title', type: 'React.ReactNode', description: 'Small muted heading.' },
    {
      prop: 'value',
      type: 'React.ReactNode',
      description: 'The headline figure.',
    },
    {
      prop: 'description',
      type: 'React.ReactNode',
      description: 'Muted line under the value (hidden when trend/ring is set).',
    },
    {
      prop: 'icon',
      type: 'React.ReactNode',
      description: 'Icon shown in a tinted box at the top-right.',
    },
    {
      prop: 'color',
      type: '"primary" | "success" | "warning" | "danger" | "muted"',
      default: '"primary"',
      description: 'Accent for the icon box, progress bar, sparkline, and ring.',
    },
    {
      prop: 'trend',
      type: '{ value: string; direction?: "up" | "down"; label?: ReactNode }',
      description: 'A colored delta with a trend arrow, in place of description.',
    },
    {
      prop: 'progress',
      type: '{ value: number; caption?: ReactNode; target?: ReactNode }',
      description: 'A linear progress bar with optional captions.',
    },
    {
      prop: 'sparkline',
      type: 'number[]',
      description: 'A small filled area chart from a series of numbers.',
    },
    {
      prop: 'ring',
      type: '{ value: number; label?: ReactNode; caption?: ReactNode }',
      description: 'A radial progress ring shown beside the value.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the card.',
    },
  ],
}
