import { Cell, RadialBar, RadialBarChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const radialData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const radialConfig = {
  visitors: { label: 'Visitors' },
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
} satisfies ChartConfig

export const radialBasicSpec: ChartSpec = {
  id: 'radial-basic',
  title: 'Radial Chart',
  category: 'Radial',
  description:
    'A single-series radial bar chart where each browser is drawn as its own arc, colored from the theme chart tokens.',
  render: () => (
    <ChartContainer
      config={radialConfig}
      className="mx-auto aspect-square max-h-[260px]"
    >
      <RadialBarChart
        data={radialData}
        innerRadius={30}
        outerRadius={110}
        startAngle={-90}
        endAngle={270}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="browser" hideLabel />}
        />
        <RadialBar dataKey="visitors" background cornerRadius={6}>
          {radialData.map((entry) => (
            <Cell key={entry.browser} fill={entry.fill} />
          ))}
        </RadialBar>
      </RadialBarChart>
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

<ChartContainer
  config={chartConfig}
  className="mx-auto aspect-square max-h-[260px]"
>
  <RadialBarChart
    data={chartData}
    innerRadius={30}
    outerRadius={110}
    startAngle={-90}
    endAngle={270}
  >
    <ChartTooltip
      cursor={false}
      content={<ChartTooltipContent nameKey="browser" hideLabel />}
    />
    <RadialBar dataKey="visitors" background cornerRadius={6}>
      {chartData.map((entry) => (
        <Cell key={entry.browser} fill={entry.fill} />
      ))}
    </RadialBar>
  </RadialBarChart>
</ChartContainer>`,
}
