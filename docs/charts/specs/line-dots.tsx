import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const data = [
  { month: 'Jan', revenue: 186 },
  { month: 'Feb', revenue: 305 },
  { month: 'Mar', revenue: 237 },
  { month: 'Apr', revenue: 273 },
  { month: 'May', revenue: 209 },
  { month: 'Jun', revenue: 264 },
]

const config = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const lineDotsSpec: ChartSpec = {
  id: 'line-dots',
  title: 'Line with Dots',
  description: 'A single-series line chart with visible dots at each data point.',
  category: 'Line',
  render: () => (
    <ChartContainer config={config} className="min-h-[220px] w-full">
      <LineChart accessibilityLayer data={data} margin={{ top: 12, left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-revenue)', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[220px] w-full">
  <LineChart accessibilityLayer data={data} margin={{ top: 12, left: 12, right: 12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line
      dataKey="revenue"
      type="monotone"
      stroke="var(--color-revenue)"
      strokeWidth={2}
      dot={{ fill: 'var(--color-revenue)', r: 4 }}
      activeDot={{ r: 6 }}
    />
  </LineChart>
</ChartContainer>`,
}
