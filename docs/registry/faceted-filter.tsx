import { useState } from 'react'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleIcon,
  CircleOffIcon,
  TimerIcon,
} from 'lucide-react'

import { FacetedFilter } from '@/components/custom/faceted-filter'
import type { ComponentDoc } from './types'

interface Task {
  id: string
  title: string
  status: string
  priority: string
}

const TASKS: Task[] = [
  { id: '1', title: 'Index the multi-byte pixel', status: 'in-progress', priority: 'medium' },
  { id: '2', title: 'Bypass the open-source panel', status: 'backlog', priority: 'low' },
  { id: '3', title: 'Driver the API matrix', status: 'todo', priority: 'high' },
  { id: '4', title: 'Quantify the bandwidth', status: 'done', priority: 'medium' },
  { id: '5', title: 'Reboot the cross-platform array', status: 'canceled', priority: 'low' },
  { id: '6', title: 'Parse the optical sensor', status: 'in-progress', priority: 'high' },
]

const STATUS = [
  { value: 'backlog', label: 'Backlog', icon: <CircleDashedIcon /> },
  { value: 'todo', label: 'Todo', icon: <CircleIcon /> },
  { value: 'in-progress', label: 'In Progress', icon: <TimerIcon /> },
  { value: 'done', label: 'Done', icon: <CircleCheckIcon /> },
  { value: 'canceled', label: 'Canceled', icon: <CircleOffIcon /> },
]

const PRIORITY = [
  { value: 'low', label: 'Low', icon: <ArrowDownIcon /> },
  { value: 'medium', label: 'Medium', icon: <ArrowRightIcon /> },
  { value: 'high', label: 'High', icon: <ArrowUpIcon /> },
]

/** Counts how many tasks fall under each option value. */
function withCounts(
  opts: { value: string; label: string; icon: React.ReactNode }[],
  key: keyof Task
) {
  return opts.map((o) => ({
    ...o,
    count: TASKS.filter((t) => t[key] === o.value).length,
  }))
}

function MultiExample() {
  const [status, setStatus] = useState<string[]>(['backlog', 'todo'])
  const filtered =
    status.length === 0 ? TASKS : TASKS.filter((t) => status.includes(t.status))
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <FacetedFilter
        title="Status"
        options={withCounts(STATUS, 'status')}
        value={status}
        onChange={setStatus}
      />
      <ul className="rounded-md border text-sm">
        {filtered.map((t) => (
          <li key={t.id} className="border-b px-3 py-2 last:border-0">
            {t.title}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-3 py-2 text-muted-foreground">No matches.</li>
        )}
      </ul>
    </div>
  )
}

function SingleExample() {
  const [priority, setPriority] = useState<string | null>('medium')
  const filtered = priority
    ? TASKS.filter((t) => t.priority === priority)
    : TASKS
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <FacetedFilter
        mode="single"
        title="Priority"
        searchable={false}
        options={withCounts(PRIORITY, 'priority')}
        value={priority}
        onChange={setPriority}
      />
      <ul className="rounded-md border text-sm">
        {filtered.map((t) => (
          <li key={t.id} className="border-b px-3 py-2 last:border-0">
            {t.title}{' '}
            <span className="text-muted-foreground">· {t.priority}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ToolbarExample() {
  const [status, setStatus] = useState<string[]>([])
  const [priority, setPriority] = useState<string[]>([])
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FacetedFilter
        title="Status"
        options={withCounts(STATUS, 'status')}
        value={status}
        onChange={setStatus}
      />
      <FacetedFilter
        title="Priority"
        options={withCounts(PRIORITY, 'priority')}
        value={priority}
        onChange={setPriority}
      />
    </div>
  )
}

export const facetedFilterDoc: ComponentDoc = {
  slug: 'faceted-filter',
  name: 'Faceted Filter',
  group: 'Custom',
  description:
    'A controlled filter trigger and popover: a searchable list of options selectable as multi-select checkboxes (default) or single-select. Shows a selected-count badge on the trigger and emits the value(s) via onChange so you can filter your own list or API query.',
  usage: (
    <>
      <p>
        <code>FacetedFilter</code> is <strong>controlled</strong> and{' '}
        <strong>headless about data</strong> — it manages the filter UI and
        reports the selection; you apply it to your own list or request.
      </p>
      <ul>
        <li>
          Default is <strong>multi-select</strong>: <code>value</code> is a{' '}
          <code>string[]</code> and <code>onChange</code> receives the new array.
        </li>
        <li>
          Pass <code>mode="single"</code> for <strong>single-select</strong>:{' '}
          <code>value</code> is <code>string | null</code> (re-selecting the same
          option clears it).
        </li>
        <li>
          Each option can carry an <code>icon</code> and a <code>count</code>;
          the trigger shows a <strong>count badge</strong> of how many are
          selected (not the labels). Hide the search with{' '}
          <code>searchable={'{false}'}</code>.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Multi-select',
      description: 'Checkbox options with counts; the list below filters live.',
      render: () => <MultiExample />,
      code: `const [status, setStatus] = useState<string[]>(['backlog', 'todo'])

<FacetedFilter
  title="Status"
  options={[
    { value: 'backlog', label: 'Backlog', icon: <CircleDashedIcon />, count: 13 },
    { value: 'todo', label: 'Todo', icon: <CircleIcon />, count: 12 },
    // ...
  ]}
  value={status}
  onChange={setStatus}
/>

// then filter your data:
const filtered = status.length === 0
  ? tasks
  : tasks.filter((t) => status.includes(t.status))`,
    },
    {
      name: 'Single-select',
      description: 'mode="single" — value is a string | null.',
      render: () => <SingleExample />,
      code: `const [priority, setPriority] = useState<string | null>('medium')

<FacetedFilter
  mode="single"
  title="Priority"
  searchable={false}
  options={PRIORITY}
  value={priority}
  onChange={setPriority}
/>`,
    },
    {
      name: 'Toolbar',
      description: 'Several filters side by side, like a table toolbar.',
      render: () => <ToolbarExample />,
      code: `<div className="flex items-center gap-2">
  <FacetedFilter title="Status" options={STATUS} value={status} onChange={setStatus} />
  <FacetedFilter title="Priority" options={PRIORITY} value={priority} onChange={setPriority} />
</div>`,
    },
  ],
  props: [
    {
      prop: 'title',
      type: 'string',
      description: 'Trigger label and default search placeholder.',
    },
    {
      prop: 'options',
      type: 'FacetedFilterOption[]',
      description: 'The selectable options (value, label, optional icon + count).',
    },
    {
      prop: 'mode',
      type: '"multiple" | "single"',
      default: '"multiple"',
      description: 'Multi-select checkboxes or single-select.',
    },
    {
      prop: 'value',
      type: 'string[] | string | null',
      description: 'Selected value(s). Array for multiple, string|null for single.',
    },
    {
      prop: 'onChange',
      type: '(value) => void',
      description: 'Called with the new selection (array, or string|null).',
    },
    {
      prop: 'searchable',
      type: 'boolean',
      default: 'true',
      description: 'Show the search box above the options.',
    },
    {
      prop: 'searchPlaceholder',
      type: 'string',
      description: 'Placeholder for the search box (defaults to title).',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the trigger button.',
    },
  ],
}
