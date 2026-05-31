import { Cell, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const pieData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const pieConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
} satisfies ChartConfig

export const pieBasicSpec: ChartSpec = {
  id: 'pie-basic',
  title: 'Pie Chart',
  description:
    'A pie chart with one slice per category, colored through the chart config and the theme chart tokens.',
  category: 'Pie',
  render: () => (
    <ChartContainer
      config={pieConfig}
      className="mx-auto aspect-square max-h-[260px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="browser" hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="browser">
          {pieData.map((entry) => (
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
    <ChartTooltip content={<ChartTooltipContent nameKey="browser" hideLabel />} />
    <Pie data={chartData} dataKey="visitors" nameKey="browser">
      {chartData.map((entry) => (
        <Cell key={entry.browser} fill={entry.fill} />
      ))}
    </Pie>
  </PieChart>
</ChartContainer>`,
}
