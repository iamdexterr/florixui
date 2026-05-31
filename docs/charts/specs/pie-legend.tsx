import { Cell, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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

export const pieLegendSpec: ChartSpec = {
  id: 'pie-legend',
  title: 'Pie with Legend',
  description:
    'A donut chart whose slices are colored from the theme chart tokens, with a config-driven tooltip and legend.',
  category: 'Pie',
  render: () => (
    <ChartContainer
      config={pieConfig}
      className="mx-auto aspect-square max-h-[260px]"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="visitors" hideLabel />}
        />
        <Pie
          data={pieData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
          strokeWidth={4}
        >
          {pieData.map((entry) => (
            <Cell key={entry.browser} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="browser" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
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
    <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />
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
    <ChartLegend
      content={<ChartLegendContent nameKey="browser" />}
      className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
    />
  </PieChart>
</ChartContainer>`,
}
