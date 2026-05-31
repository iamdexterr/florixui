import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ComponentDoc } from './types'

const barData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const barConfig = {
  desktop: { label: 'Desktop', color: 'hsl(220 70% 50%)' },
  mobile: { label: 'Mobile', color: 'hsl(160 60% 45%)' },
} satisfies ChartConfig

const lineData = [
  { day: 'Mon', visitors: 120 },
  { day: 'Tue', visitors: 180 },
  { day: 'Wed', visitors: 90 },
  { day: 'Thu', visitors: 240 },
  { day: 'Fri', visitors: 175 },
]

const lineConfig = {
  visitors: { label: 'Visitors', color: 'hsl(280 65% 55%)' },
} satisfies ChartConfig

export const chartDoc: ComponentDoc = {
  slug: 'chart',
  name: 'Chart',
  group: 'Layout',
  description:
    'A theming and tooltip/legend wrapper around Recharts that maps a config object to CSS color variables for consistent, accessible charts.',
  usage: (
    <>
      <p>
        <code>ChartContainer</code> is the required provider: it supplies the{' '}
        <code>config</code> (labels, colors, icons) to <code>ChartTooltipContent</code>{' '}
        and <code>ChartLegendContent</code>, and injects per-series CSS variables
        like <code>--color-desktop</code> that you reference from Recharts elements
        with <code>fill="var(--color-desktop)"</code>.
      </p>
      <ul>
        <li>
          Always render a single Recharts chart (e.g. <code>BarChart</code>,{' '}
          <code>LineChart</code>) as the child of <code>ChartContainer</code>; it
          wraps the child in a <code>ResponsiveContainer</code>.
        </li>
        <li>
          Keys in <code>config</code> must match the <code>dataKey</code> of each
          series so labels and colors resolve correctly.
        </li>
        <li>
          Use <code>ChartTooltip</code> with <code>content={'{<ChartTooltipContent />}'}</code>{' '}
          and <code>ChartLegend</code> with <code>content={'{<ChartLegendContent />}'}</code>{' '}
          rather than the raw Recharts defaults so styling and labels stay consistent.
        </li>
        <li>
          Provide a meaningful <code>label</code> per series in <code>config</code>;
          it is the accessible name shown in tooltips and the legend.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Bar chart',
      description: 'A grouped bar chart with config-driven colors and a tooltip.',
      render: () => (
        <ChartContainer config={barConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={barData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      ),
      code: `const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(220 70% 50%)' },
  mobile: { label: 'Mobile', color: 'hsl(160 60% 45%)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>`,
    },
    {
      name: 'Line chart with legend',
      description: 'A single-series line chart that adds a config-driven legend.',
      render: () => (
        <ChartContainer config={lineConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={lineData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="visitors"
              type="monotone"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      ),
      code: `const chartConfig = {
  visitors: { label: 'Visitors', color: 'hsl(280 65% 55%)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <LineChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Line
      dataKey="visitors"
      type="monotone"
      stroke="var(--color-visitors)"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ChartContainer>`,
    },
    {
      name: 'Tooltip without label',
      description:
        'Hide the tooltip header and use a line indicator for a compact readout.',
      render: () => (
        <ChartContainer config={barConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={barData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel indicator="line" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      ),
      code: `<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip
      content={<ChartTooltipContent hideLabel indicator="line" />}
    />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
  </BarChart>
</ChartContainer>`,
    },
  ],
  props: [
    {
      prop: 'config',
      type: 'ChartConfig',
      description:
        'Maps each series key to its label, color (or per-theme colors), and optional icon. Drives CSS color variables and tooltip/legend labels. Required.',
    },
    {
      prop: 'children',
      type: 'React.ComponentProps<typeof ResponsiveContainer>["children"]',
      description:
        'A single Recharts chart element (e.g. <BarChart>) rendered inside a ResponsiveContainer.',
    },
    {
      prop: 'initialDimension',
      type: '{ width: number; height: number }',
      default: '{ width: 320, height: 200 }',
      description:
        'Initial size used by the ResponsiveContainer before measuring its parent.',
    },
    {
      prop: 'id',
      type: 'string',
      description:
        'Optional id used to scope the injected CSS variables; auto-generated via useId when omitted.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"div">',
      description: 'All native div attributes (including className) are forwarded to the wrapper.',
    },
  ],
}
