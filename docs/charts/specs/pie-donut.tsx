import { Cell, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
} satisfies ChartConfig

export const pieDonutSpec: ChartSpec = {
  id: 'pie-donut',
  title: 'Donut Chart',
  description:
    'A donut chart built from a Recharts Pie with an innerRadius, coloring each slice via a per-datum fill that resolves to the config color tokens.',
  category: 'Pie',
  render: () => (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[260px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="browser" />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
          strokeWidth={4}
        >
          {chartData.map((entry) => (
            <Cell key={entry.browser} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  ),
  code: `const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px]">
  <PieChart>
    <ChartTooltip
      cursor={false}
      content={<ChartTooltipContent hideLabel nameKey="browser" />}
    />
    <Pie
      data={chartData}
      dataKey="visitors"
      nameKey="browser"
      innerRadius={60}
      strokeWidth={4}
    >
      {chartData.map((entry) => (
        <Cell key={entry.browser} fill={entry.fill} />
      ))}
    </Pie>
  </PieChart>
</ChartContainer>`,
}
