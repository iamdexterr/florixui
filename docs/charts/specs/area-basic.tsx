import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const areaData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 2100 },
  { month: 'Mar', revenue: 1800 },
  { month: 'Apr', revenue: 2600 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3100 },
]

const areaConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const areaBasicSpec: ChartSpec = {
  id: 'area-basic',
  title: 'Area Chart',
  description:
    'A single-series area chart with a smooth curve and a subtle gradient fill.',
  category: 'Area',
  render: () => (
    <ChartContainer config={areaConfig} className="min-h-[220px] w-full">
      <AreaChart accessibilityLayer data={areaData}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-revenue)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-revenue)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="revenue"
          type="natural"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          fill="url(#fillRevenue)"
          fillOpacity={1}
        />
      </AreaChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[220px] w-full">
  <AreaChart accessibilityLayer data={data}>
    <defs>
      <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
        <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
      </linearGradient>
    </defs>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area
      dataKey="revenue"
      type="natural"
      stroke="var(--color-revenue)"
      strokeWidth={2}
      fill="url(#fillRevenue)"
      fillOpacity={1}
    />
  </AreaChart>
</ChartContainer>`,
}
