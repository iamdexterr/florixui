import { BlindsIcon, ThermometerIcon } from 'lucide-react'

import { SensorCard } from '@/components/custom/sensor-card'
import type { ComponentDoc } from './types'

export const sensorCardDoc: ComponentDoc = {
  slug: 'sensor-card',
  name: 'Sensor Card',
  group: 'Custom',
  description:
    'A compact info/action card with a left side (icon, mode label, description) and a right side (accent bar + value). Tint it with colorVariant, wrap it with variant, and wire onClick / onValueClick for actions.',
  usage: (
    <>
      <p>
        <code>SensorCard</code> shows a labelled reading: an icon and{' '}
        <code>mode</code>/<code>description</code> on the left, and a colored
        accent bar plus <code>value</code> on the right.
      </p>
      <ul>
        <li>
          Tint with <code>colorVariant</code> (<code>primary</code>,{' '}
          <code>warning</code>, <code>danger</code>, <code>muted</code>);
          override the bar or value independently with{' '}
          <code>accentColorVariant</code> / <code>valueColorVariant</code>.
        </li>
        <li>
          Pick a wrapper with <code>variant</code>: <code>standalone</code> adds
          a Card surface, while <code>default</code> is a bare row for nesting
          inside another container.
        </li>
        <li>
          Show a unit above the value with <code>unit</code>, toggle the percent
          suffix with <code>showPercentSign</code>, and make the card or value
          actionable with <code>onClick</code> / <code>onValueClick</code>.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Standalone',
      description: 'A status card with an accent bar and a colored value.',
      render: () => (
        <SensorCard
          className="max-w-md"
          variant="standalone"
          icon={<BlindsIcon className="size-5 text-primary" />}
          mode="Shades & Curtains"
          description="shade 01"
          value="Active"
          showAccent
          colorVariant="primary"
          valueColorVariant="primary"
        />
      ),
      code: `<SensorCard
  variant="standalone"
  icon={<BlindsIcon className="size-5 text-primary" />}
  mode="Shades & Curtains"
  description="shade 01"
  value="Active"
  showAccent
  valueColorVariant="primary"
/>`,
    },
    {
      name: 'Color variants',
      description: 'primary, warning, danger, and muted.',
      render: () => (
        <div className="grid w-full max-w-md gap-3">
          <SensorCard
            variant="standalone"
            mode="Auto"
            description="Vent 02"
            value="80"
            showAccent
            colorVariant="primary"
          />
          <SensorCard
            variant="standalone"
            mode="Manual"
            description="Pump 01"
            value="Not synced"
            showAccent
            colorVariant="warning"
            showPercentSign={false}
          />
          <SensorCard
            variant="standalone"
            mode="Fault"
            description="Heater 03"
            value="Error"
            showAccent
            colorVariant="danger"
            valueColorVariant="danger"
            showPercentSign={false}
          />
          <SensorCard
            variant="standalone"
            mode="Offline"
            description="Sensor 09"
            value="--"
            colorVariant="muted"
            showPercentSign={false}
          />
        </div>
      ),
      code: `<SensorCard variant="standalone" mode="Auto" description="Vent 02" value="80" showAccent colorVariant="primary" />
<SensorCard variant="standalone" mode="Manual" description="Pump 01" value="Not synced" showAccent colorVariant="warning" showPercentSign={false} />
<SensorCard variant="standalone" mode="Fault" description="Heater 03" value="Error" showAccent colorVariant="danger" valueColorVariant="danger" showPercentSign={false} />
<SensorCard variant="standalone" mode="Offline" description="Sensor 09" value="--" colorVariant="muted" showPercentSign={false} />`,
    },
    {
      name: 'With unit',
      description: 'Stack a unit above the value.',
      render: () => (
        <SensorCard
          className="max-w-md"
          variant="standalone"
          icon={<ThermometerIcon className="size-5 text-primary" />}
          mode="Auto"
          description="Zone temperature"
          value="72.4"
          unit="°F"
          showAccent
        />
      ),
      code: `<SensorCard
  variant="standalone"
  icon={<ThermometerIcon className="size-5 text-primary" />}
  mode="Auto"
  description="Zone temperature"
  value="72.4"
  unit="°F"
  showAccent
/>`,
    },
  ],
  props: [
    { prop: 'value', type: 'string', description: 'Value shown on the right.' },
    {
      prop: 'mode',
      type: 'string',
      description: 'Mode label, e.g. "Manual" or "Auto".',
    },
    {
      prop: 'description',
      type: 'string',
      description: 'Main description / name.',
    },
    {
      prop: 'icon',
      type: 'React.ReactNode',
      description:
        'Leading icon. Falls back to a variant-tinted default based on mode.',
    },
    {
      prop: 'variant',
      type: '"default" | "standalone"',
      default: '"default"',
      description: 'default = bare row; standalone = Card-wrapped.',
    },
    {
      prop: 'colorVariant',
      type: '"primary" | "warning" | "danger" | "muted"',
      default: '"primary"',
      description: 'Color of the accent bar, mode label, and default icon.',
    },
    {
      prop: 'accentColorVariant',
      type: 'SensorCardColorVariant',
      description: 'Override the accent-bar color only.',
    },
    {
      prop: 'valueColorVariant',
      type: 'SensorCardColorVariant',
      description: 'Color the value text (defaults to foreground).',
    },
    {
      prop: 'showAccent',
      type: 'boolean',
      default: 'false',
      description: 'Show the colored accent bar before the value.',
    },
    {
      prop: 'unit',
      type: 'string',
      description: 'Unit shown above the value in a stacked layout.',
    },
    {
      prop: 'showPercentSign',
      type: 'boolean',
      default: 'true',
      description: 'Append "%" to numeric values.',
    },
    {
      prop: 'stackedLayout',
      type: 'boolean',
      default: 'false',
      description: 'Icon on the left with mode/description stacked beside it.',
    },
    {
      prop: 'onClick',
      type: '() => void',
      description: 'Click handler for the whole card.',
    },
    {
      prop: 'onValueClick',
      type: '() => void',
      description: 'Click handler for just the value.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the card container.',
    },
  ],
}
