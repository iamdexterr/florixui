import * as React from 'react'
import {
  DateTimeRangePicker,
  type TimeRange,
} from '@/components/custom/date-time-range-picker'
import { presetToRange } from '@/components/custom/date-time-range-picker-utils'
import type { ComponentDoc } from './types'

function initialRange(): TimeRange {
  return { preset: 'day', ...presetToRange('day') }
}

function BasicExample() {
  const [range, setRange] = React.useState<TimeRange>(initialRange)
  return (
    <div className="flex flex-col items-center gap-3">
      <DateTimeRangePicker value={range} onChange={setRange} />
      <p className="text-xs text-muted-foreground">
        {range.preset
          ? `Preset: ${range.preset}`
          : `${range.from} → ${range.to}`}
      </p>
    </div>
  )
}

function CustomPresetsExample() {
  const [range, setRange] = React.useState<TimeRange>(initialRange)
  return (
    <DateTimeRangePicker
      value={range}
      onChange={setRange}
      presets={[
        { value: 'hour', label: '1h' },
        { value: 'day', label: '24h' },
        { value: 'week', label: '7d' },
      ]}
    />
  )
}

function MaxRangeExample() {
  const [range, setRange] = React.useState<TimeRange>(initialRange)
  return (
    <DateTimeRangePicker value={range} onChange={setRange} maxRangeDays={7} />
  )
}

function TimezoneExample() {
  const [range, setRange] = React.useState<TimeRange>(initialRange)
  return (
    <DateTimeRangePicker
      value={range}
      onChange={setRange}
      timezone="America/New_York"
    />
  )
}

export const dateTimeRangePickerDoc: ComponentDoc = {
  slug: 'date-time-range-picker',
  name: 'Date Time Range Picker',
  group: 'Custom',
  description:
    'A time-range picker with quick presets (hour/day/week/month) and a custom From/To selector — each a calendar plus a precise hour:minute:second time row. Timezone-aware, controlled via ISO strings.',
  usage: (
    <>
      <p>
        <code>DateTimeRangePicker</code> is controlled: pass a{' '}
        <code>value</code> of shape{' '}
        <code>{'{ preset, from, to }'}</code> and an <code>onChange</code>. Picking
        a preset sets <code>preset</code> and computes a concrete{' '}
        <code>from</code>/<code>to</code> ending now; the custom range clears{' '}
        <code>preset</code> and sets exact ISO timestamps.
      </p>
      <ul>
        <li>
          Seed initial state with the exported <code>presetToRange</code> helper,
          e.g. <code>{"{ preset: 'day', ...presetToRange('day') }"}</code>.
        </li>
        <li>
          The custom From/To fields combine our <code>Calendar</code> with an
          hour:minute:second time row (arrow keys step the values).
        </li>
        <li>
          Pass <code>timezone</code> (an IANA name) to interpret and display the
          range in that zone; values are always stored as UTC ISO strings.
        </li>
        <li>
          Use <code>maxRangeDays</code> to cap the span, and a custom{' '}
          <code>presets</code> array to relabel/limit the quick options.
        </li>
        <li>
          The <code>navigateRange</code> helper shifts a range backward/forward
          by its own duration — handy for prev/next buttons next to the picker.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Presets + custom range',
      render: () => <BasicExample />,
      code: `import { DateTimeRangePicker, presetToRange, type TimeRange } from "florixui"

const [range, setRange] = React.useState<TimeRange>({
  preset: "day",
  ...presetToRange("day"),
})

<DateTimeRangePicker value={range} onChange={setRange} />`,
    },
    {
      name: 'Custom presets',
      render: () => <CustomPresetsExample />,
      code: `<DateTimeRangePicker
  value={range}
  onChange={setRange}
  presets={[
    { value: "hour", label: "1h" },
    { value: "day", label: "24h" },
    { value: "week", label: "7d" },
  ]}
/>`,
    },
    {
      name: 'Max range (7 days)',
      description: 'Clamps the To date so the span never exceeds maxRangeDays.',
      render: () => <MaxRangeExample />,
      code: `<DateTimeRangePicker value={range} onChange={setRange} maxRangeDays={7} />`,
    },
    {
      name: 'Timezone',
      description: 'Interpret and display in a specific IANA timezone.',
      render: () => <TimezoneExample />,
      code: `<DateTimeRangePicker value={range} onChange={setRange} timezone="America/New_York" />`,
    },
  ],
  props: [
    {
      prop: 'value',
      type: 'TimeRange { preset, from, to }',
      description: 'Controlled value. preset is a TimePreset or null; from/to are UTC ISO strings.',
    },
    {
      prop: 'onChange',
      type: '(range: TimeRange) => void',
      description: 'Called when a preset is chosen or a custom range is applied.',
    },
    {
      prop: 'timezone',
      type: 'string (IANA)',
      default: '"UTC"',
      description: 'Timezone used to interpret and display the range.',
    },
    {
      prop: 'presets',
      type: '{ value: TimePreset; label: string }[]',
      default: 'Hour / Day / Week / Month',
      description: 'Override the quick-preset buttons.',
    },
    {
      prop: 'maxRangeDays',
      type: 'number',
      description: 'Maximum allowed span; clamps the To date.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Extra classes for the trigger button.',
    },
  ],
}
