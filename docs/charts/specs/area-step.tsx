import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
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

const config = {
  visitors: { label: 'Visitors', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const areaStepSpec: ChartSpec = {
  id: 'area-step',
  title: 'Step Area',
  description:
    'A single-series area chart using a step interpolation to emphasize discrete level changes between points.',
  category: 'Area',
  render: () => (
    <ChartContainer config={config} className="min-h-[220px] w-full">
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="visitors"
          type="step"
          fill="var(--color-visitors)"
          fillOpacity={0.3}
          stroke="var(--color-visitors)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  visitors: { label: 'Visitors', color: 'var(--chart-1)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[220px] w-full">
  <AreaChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area
      dataKey="visitors"
      type="step"
      fill="var(--color-visitors)"
      fillOpacity={0.3}
      stroke="var(--color-visitors)"
      strokeWidth={2}
    />
  </AreaChart>
</ChartContainer>`,
}
