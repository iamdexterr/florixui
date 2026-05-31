import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import type { ComponentDoc } from './types'

function SingleCalendarExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}

function RangeCalendarExample() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
  })
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-md border"
    />
  )
}

export const calendarDoc: ComponentDoc = {
  slug: 'calendar',
  name: 'Calendar',
  group: 'Layout',
  description:
    'A date field that lets users view a month grid and select a single day, multiple days, or a range.',
  usage: (
    <>
      <p>
        <code>Calendar</code> wraps <code>react-day-picker</code>&apos;s{' '}
        <code>DayPicker</code>, so it accepts the same props. Set{' '}
        <code>mode</code> to <code>"single"</code>, <code>"multiple"</code>, or{' '}
        <code>"range"</code> and drive it as a controlled component via{' '}
        <code>selected</code> and <code>onSelect</code>.
      </p>
      <ul>
        <li>
          Pair it with a popover and a trigger button when used as a date
          picker, rather than always rendering it inline.
        </li>
        <li>
          Use the <code>disabled</code> prop to block invalid days (for example
          past dates) so users can&apos;t select them.
        </li>
        <li>
          Days are real buttons: they are keyboard focusable and navigable with
          the arrow keys, and the focused day shows a visible focus ring.
        </li>
        <li>
          Set <code>captionLayout="dropdown"</code> to let users jump across
          months and years quickly instead of paging one month at a time.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Single date',
      description: 'The default mode — pick one day.',
      render: () => <SingleCalendarExample />,
      code: `const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
)`,
    },
    {
      name: 'Date range',
      description: 'Select a start and end day across two months.',
      render: () => <RangeCalendarExample />,
      code: `const [range, setRange] = React.useState<DateRange | undefined>({
  from: new Date(),
})

return (
  <Calendar
    mode="range"
    selected={range}
    onSelect={setRange}
    numberOfMonths={2}
    className="rounded-md border"
  />
)`,
    },
    {
      name: 'Dropdown caption',
      description: 'Use month/year dropdowns for fast navigation.',
      render: () => (
        <Calendar
          mode="single"
          captionLayout="dropdown"
          defaultMonth={new Date()}
          className="rounded-md border"
        />
      ),
      code: `<Calendar
  mode="single"
  captionLayout="dropdown"
  defaultMonth={new Date()}
  className="rounded-md border"
/>`,
    },
    {
      name: 'Disabled days',
      description: 'Block past dates and outline the nav buttons.',
      render: () => (
        <Calendar
          mode="single"
          disabled={{ before: new Date() }}
          buttonVariant="outline"
          className="rounded-md border"
        />
      ),
      code: `<Calendar
  mode="single"
  disabled={{ before: new Date() }}
  buttonVariant="outline"
  className="rounded-md border"
/>`,
    },
  ],
  props: [
    {
      prop: 'mode',
      type: '"single" | "multiple" | "range"',
      default: '"single"',
      description: 'Selection behavior: one day, several days, or a range.',
    },
    {
      prop: 'selected',
      type: 'Date | Date[] | DateRange | undefined',
      description:
        'The controlled selected value; its shape depends on the chosen mode.',
    },
    {
      prop: 'onSelect',
      type: '(value) => void',
      description: 'Called when the selection changes (controlled usage).',
    },
    {
      prop: 'showOutsideDays',
      type: 'boolean',
      default: 'true',
      description: 'Render days from adjacent months to fill the grid.',
    },
    {
      prop: 'captionLayout',
      type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
      default: '"label"',
      description: 'How the month/year caption is shown for navigation.',
    },
    {
      prop: 'buttonVariant',
      type: 'React.ComponentProps<typeof Button>["variant"]',
      default: '"ghost"',
      description: 'Button variant applied to the previous/next nav buttons.',
    },
    {
      prop: 'numberOfMonths',
      type: 'number',
      default: '1',
      description: 'Number of months to display side by side.',
    },
    {
      prop: 'disabled',
      type: 'Matcher | Matcher[]',
      description: 'Day matcher(s) describing which days cannot be selected.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<typeof DayPicker>',
      description:
        'All other react-day-picker DayPicker props are forwarded (locale, formatters, components, etc.).',
    },
  ],
}
