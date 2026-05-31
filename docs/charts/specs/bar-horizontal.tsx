import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const data = [
  { browser: 'Chrome', visitors: 275 },
  { browser: 'Safari', visitors: 200 },
  { browser: 'Firefox', visitors: 187 },
  { browser: 'Edge', visitors: 173 },
  { browser: 'Other', visitors: 90 },
]

const config = {
  visitors: { label: 'Visitors', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const barHorizontalSpec: ChartSpec = {
  id: 'bar-horizontal',
  title: 'Horizontal Bar',
  description:
    'A horizontal bar chart using a vertical layout with the category axis on the Y axis.',
  category: 'Bar',
  render: () => (
    <ChartContainer config={config} className="min-h-[220px] w-full">
      <BarChart accessibilityLayer data={data} layout="vertical">
        <CartesianGrid horizontal={false} />
        <XAxis type="number" dataKey="visitors" hide />
        <YAxis
          type="category"
          dataKey="browser"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={70}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  visitors: { label: 'Visitors', color: 'var(--chart-1)' },
} satisfies ChartConfig

const data = [
  { browser: 'Chrome', visitors: 275 },
  { browser: 'Safari', visitors: 200 },
  { browser: 'Firefox', visitors: 187 },
  { browser: 'Edge', visitors: 173 },
  { browser: 'Other', visitors: 90 },
]

<ChartContainer config={chartConfig} className="min-h-[220px] w-full">
  <BarChart accessibilityLayer data={data} layout="vertical">
    <CartesianGrid horizontal={false} />
    <XAxis type="number" dataKey="visitors" hide />
    <YAxis
      type="category"
      dataKey="browser"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      width={70}
    />
    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
    <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
  </BarChart>
</ChartContainer>`,
}
