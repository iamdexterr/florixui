import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const data = [
  { month: 'Jan', visitors: 186 },
  { month: 'Feb', visitors: 305 },
  { month: 'Mar', visitors: 237 },
  { month: 'Apr', visitors: 273 },
  { month: 'May', visitors: 209 },
  { month: 'Jun', visitors: 264 },
]

const chartConfig = {
  visitors: { label: 'Visitors', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const lineBasicSpec: ChartSpec = {
  id: 'line-basic',
  title: 'Line Chart',
  description: 'A single-series monotone line chart without dots.',
  category: 'Line',
  render: () => (
    <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
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
  visitors: { label: 'Visitors', color: 'var(--chart-1)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[220px] w-full">
  <LineChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line
      dataKey="visitors"
      type="monotone"
      stroke="var(--color-visitors)"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ChartContainer>`,
}
