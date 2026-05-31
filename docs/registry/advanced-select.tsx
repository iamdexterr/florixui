import * as React from 'react'
import { Globe } from 'lucide-react'
import {
  AdvancedSelect,
  type AdvancedSelectOption,
} from '@/components/custom/advanced-select'
import type { ComponentDoc } from './types'

const FRUITS = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

const FRAMEWORKS: AdvancedSelectOption[] = [
  { value: 'next', label: 'Next.js', description: 'The React framework' },
  { value: 'remix', label: 'Remix', description: 'Full-stack web framework' },
  { value: 'astro', label: 'Astro', description: 'Content-driven sites', badge: 'New' },
  { value: 'nuxt', label: 'Nuxt', description: 'The Vue framework' },
]

const GROUPED = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'potato', label: 'Potato' },
    ],
  },
]

// --- stateful example wrappers (defined at module scope) -------------------

function BasicExample() {
  const [value, setValue] = React.useState<string>('')
  return (
    <AdvancedSelect
      className="w-64"
      options={FRUITS}
      value={value}
      onValueChange={(v) => setValue(v as string)}
      placeholder="Pick a fruit"
      searchable
      clearable
    />
  )
}

function MultipleExample() {
  const [value, setValue] = React.useState<AdvancedSelectOption[]>([])
  return (
    <AdvancedSelect
      className="w-72"
      options={FRAMEWORKS}
      multiple
      allowEmpty
      showSelectAll
      value={value}
      onValueChange={(v) => setValue(v as AdvancedSelectOption[])}
      placeholder="Pick frameworks"
      searchable
    />
  )
}

function DescriptionsExample() {
  const [value, setValue] = React.useState<AdvancedSelectOption | undefined>()
  return (
    <AdvancedSelect
      className="w-72"
      options={FRAMEWORKS}
      value={value}
      onValueChange={(v) => setValue(v as AdvancedSelectOption)}
      placeholder="Pick a framework"
    />
  )
}

function GroupedExample() {
  const [value, setValue] = React.useState<string>('')
  return (
    <AdvancedSelect
      className="w-64"
      groups={GROUPED}
      value={value}
      onValueChange={(v) => setValue(v as string)}
      placeholder="Pick produce"
      searchable
    />
  )
}

function CompactExample() {
  const [value, setValue] = React.useState<AdvancedSelectOption[]>([
    FRAMEWORKS[0],
    FRAMEWORKS[2],
  ])
  return (
    <AdvancedSelect
      className="w-64"
      options={FRAMEWORKS}
      multiple
      allowEmpty
      compactMultiple
      value={value}
      onValueChange={(v) => setValue(v as AdvancedSelectOption[])}
      placeholder="Pick frameworks"
    />
  )
}

export const advancedSelectDoc: ComponentDoc = {
  slug: 'advanced-select',
  name: 'Advanced Select',
  group: 'Custom',
  description:
    'A combobox-style select built on Popover + Command with search, multi-select, groups, descriptions, clear, select-all, create-new, infinite scroll, and input-group affixes.',
  usage: (
    <>
      <p>
        <code>AdvancedSelect</code> covers everything from a simple dropdown to
        a searchable multi-select with grouped, described, badged options. Pass{' '}
        <code>options</code> as plain strings, ready-made option objects, or
        arbitrary objects resolved via <code>getOptionLabel</code> /{' '}
        <code>getOptionValue</code>.
      </p>
      <ul>
        <li>
          It is controlled: provide <code>value</code> and{' '}
          <code>onValueChange</code>. In single mode the callback gives you the
          selected option; in <code>multiple</code> mode, an array.
        </li>
        <li>
          Limits are enforced silently — <code>maxSelections</code> blocks extra
          picks and a minimum of one is kept unless <code>allowEmpty</code>.
        </li>
        <li>
          For large/remote lists, use <code>onLoadMore</code> +{' '}
          <code>hasNextPage</code> + <code>isFetchingNextPage</code> for infinite
          scroll, and <code>loading</code> for the initial fetch.
        </li>
        <li>
          The dropdown uses <code>Command</code>, so type-to-filter works
          out of the box when <code>searchable</code> is set.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Searchable & clearable',
      render: () => <BasicExample />,
      code: `const [value, setValue] = React.useState("")

<AdvancedSelect
  options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
  value={value}
  onValueChange={(v) => setValue(v as string)}
  placeholder="Pick a fruit"
  searchable
  clearable
/>`,
    },
    {
      name: 'Options with descriptions & badges',
      render: () => <DescriptionsExample />,
      code: `const options = [
  { value: "next", label: "Next.js", description: "The React framework" },
  { value: "astro", label: "Astro", description: "Content-driven sites", badge: "New" },
  // …
]

<AdvancedSelect
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="Pick a framework"
/>`,
    },
    {
      name: 'Multiple + select all',
      render: () => <MultipleExample />,
      code: `<AdvancedSelect
  options={frameworks}
  multiple
  allowEmpty
  showSelectAll
  value={value}
  onValueChange={(v) => setValue(v as Option[])}
  placeholder="Pick frameworks"
  searchable
/>`,
    },
    {
      name: 'Compact multiple',
      description: 'Show a count instead of badges for many selections.',
      render: () => <CompactExample />,
      code: `<AdvancedSelect
  options={frameworks}
  multiple
  allowEmpty
  compactMultiple
  value={value}
  onValueChange={(v) => setValue(v as Option[])}
/>`,
    },
    {
      name: 'Grouped options',
      render: () => <GroupedExample />,
      code: `<AdvancedSelect
  groups={[
    { label: "Fruits", options: [{ value: "apple", label: "Apple" }] },
    { label: "Vegetables", options: [{ value: "carrot", label: "Carrot" }] },
  ]}
  value={value}
  onValueChange={(v) => setValue(v as string)}
  searchable
/>`,
    },
    {
      name: 'With label, affix & create-new',
      render: () => (
        <AdvancedSelect
          className="w-72"
          label="Region"
          required
          options={['US', 'EU', 'APAC']}
          startItem={<Globe />}
          onCreateNew={() => {}}
          createNewLabel="Add region"
          placeholder="Select region"
          description="Where your data is hosted."
        />
      ),
      code: `<AdvancedSelect
  label="Region"
  required
  options={["US", "EU", "APAC"]}
  startItem={<Globe />}
  onCreateNew={() => openCreateDialog()}
  createNewLabel="Add region"
  placeholder="Select region"
  description="Where your data is hosted."
/>`,
    },
  ],
  props: [
    {
      prop: 'options',
      type: '(string | AdvancedSelectOption | T)[]',
      description: 'Items to choose from. Strings, option objects, or custom T.',
    },
    {
      prop: 'groups',
      type: 'AdvancedSelectGroup[]',
      description: 'Grouped options with headings (alternative to options).',
    },
    {
      prop: 'value / onValueChange',
      type: 'string | string[] | T | T[]',
      description: 'Controlled value and change handler.',
    },
    {
      prop: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Enable multi-select with badges or a compact count.',
    },
    {
      prop: 'searchable',
      type: 'boolean',
      default: 'false',
      description: 'Show a search input that filters options.',
    },
    {
      prop: 'clearable',
      type: 'boolean',
      default: 'false',
      description: 'Show a clear (×) button when there is a value.',
    },
    {
      prop: 'allowEmpty',
      type: 'boolean',
      default: 'false',
      description: 'Allow clearing the last selection in multiple mode.',
    },
    {
      prop: 'showSelectAll',
      type: 'boolean',
      default: 'false',
      description: 'Show a "Select all" row in multiple mode.',
    },
    {
      prop: 'maxSelections',
      type: 'number',
      description: 'Cap the number of selections in multiple mode.',
    },
    {
      prop: 'compactMultiple / formatCompactDisplay',
      type: 'boolean / (values) => string',
      description: 'Show "N selected" instead of badges, with optional formatter.',
    },
    {
      prop: 'getOptionLabel / getOptionValue / renderOptionLabel',
      type: '(option: T) => string | ReactNode',
      description: 'Resolvers for arbitrary option objects.',
    },
    {
      prop: 'onLoadMore / hasNextPage / isFetchingNextPage',
      type: '() => void / boolean / boolean',
      description: 'Infinite-scroll paging hooks.',
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Show a spinner in the dropdown while fetching.',
    },
    {
      prop: 'onCreateNew / createNewLabel',
      type: '() => void / string',
      description: 'Adds a create-new action at the bottom of the list.',
    },
    {
      prop: 'startItem / endItem',
      type: 'ReactNode',
      description: 'Attached affix segments (input-group mode).',
    },
    {
      prop: 'label / description / required / error / errorMessage',
      type: 'ReactNode / boolean / string',
      description: 'Field chrome around the control.',
    },
    {
      prop: 'size / variant',
      type: '"sm" | "default" / "default" | "alt"',
      description: 'Trigger height and background.',
    },
    {
      prop: 'readOnly / disabled',
      type: 'boolean',
      description: 'readOnly keeps the value but blocks opening; disabled greys it out.',
    },
  ],
}
