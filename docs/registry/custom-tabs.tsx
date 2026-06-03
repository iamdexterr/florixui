import { useState } from 'react'
import { HomeIcon, LayoutPanelTopIcon, PackageIcon, UsersIcon } from 'lucide-react'

import { CustomTabs } from '@/components/custom/custom-tabs'
import type { ComponentDoc } from './types'

const navItems = [
  { value: 'overview', label: 'Overview', icon: <HomeIcon /> },
  { value: 'projects', label: 'Projects', icon: <LayoutPanelTopIcon />, count: 3 },
  { value: 'packages', label: 'Packages', icon: <PackageIcon />, badge: 'New' },
  { value: 'team', label: 'Team', icon: <UsersIcon /> },
]

/** A pill strip wired to switchable content below, like a real nav. */
function PillExample() {
  const [tab, setTab] = useState('overview')
  const active = navItems.find((i) => i.value === tab)
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <CustomTabs
        type="pill"
        value={tab}
        onValueChange={setTab}
        items={navItems.slice(0, 3)}
      />
      <p className="text-sm text-muted-foreground">
        Content for {active?.label}
      </p>
    </div>
  )
}

export const customTabsDoc: ComponentDoc = {
  slug: 'custom-tabs',
  name: 'Custom Tabs',
  group: 'Custom',
  description:
    'A higher-level tab strip with two looks — underline and pill — driven by a single items array. Each tab can carry an icon, a numeric count, and a short badge like "New". Built on Radix Tabs for keyboard and a11y support.',
  usage: (
    <>
      <p>
        <code>CustomTabs</code> renders a navigation strip from an{' '}
        <code>items</code> array instead of composed children. Pick the look with{' '}
        <code>type</code>:
      </p>
      <ul>
        <li>
          <code>type="underline"</code> — full-width strip with a bottom border;
          the active tab gets a solid underline.
        </li>
        <li>
          <code>type="pill"</code> — a compact, rounded chip group; the active tab
          fills with the background color.
        </li>
      </ul>
      <ul>
        <li>
          Each item takes a <code>value</code>, <code>label</code>, and optional{' '}
          <code>icon</code>, <code>count</code>, <code>badge</code>, and{' '}
          <code>disabled</code>.
        </li>
        <li>
          Control selection with <code>value</code>/<code>onValueChange</code> or
          use the uncontrolled <code>defaultValue</code>, just like Radix Tabs.
        </li>
        <li>
          The component renders only the tab strip — render the matching panel
          yourself based on the selected value.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Underline',
      description: 'A bottom-border strip with icons, a count, and a "New" badge.',
      render: () => (
        <CustomTabs type="underline" defaultValue="overview" items={navItems} />
      ),
      code: `const navItems = [
  { value: 'overview', label: 'Overview', icon: <HomeIcon /> },
  { value: 'projects', label: 'Projects', icon: <LayoutPanelTopIcon />, count: 3 },
  { value: 'packages', label: 'Packages', icon: <PackageIcon />, badge: 'New' },
  { value: 'team', label: 'Team', icon: <UsersIcon /> },
]

<CustomTabs type="underline" defaultValue="overview" items={navItems} />`,
    },
    {
      name: 'Pill',
      description:
        'A rounded chip group wired to switchable content; the active pill fills with the theme accent color.',
      render: () => <PillExample />,
      code: `function Example() {
  const [tab, setTab] = useState('overview')
  const items = [
    { value: 'overview', label: 'Overview', icon: <HomeIcon /> },
    { value: 'projects', label: 'Projects', icon: <LayoutPanelTopIcon />, count: 3 },
    { value: 'packages', label: 'Packages', icon: <PackageIcon />, badge: 'New' },
  ]

  return (
    <>
      <CustomTabs type="pill" value={tab} onValueChange={setTab} items={items} />
      <p>Content for {tab}</p>
    </>
  )
}`,
    },
  ],
  props: [
    {
      prop: 'type',
      type: '"underline" | "pill"',
      default: '"underline"',
      description: 'Visual style of the tab strip.',
    },
    {
      prop: 'items',
      type: 'CustomTabItem[]',
      description:
        'Tabs to render. Each has value, label, and optional icon, count, badge, disabled.',
    },
    {
      prop: 'value',
      type: 'string',
      description: 'Controlled selected value.',
    },
    {
      prop: 'defaultValue',
      type: 'string',
      description: 'Uncontrolled initial selected value.',
    },
    {
      prop: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called when the selected tab changes.',
    },
    {
      prop: 'listClassName',
      type: 'string',
      description: 'Class for the tab list (the strip itself).',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the root wrapper.',
    },
  ],
}
