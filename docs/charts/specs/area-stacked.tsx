import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 273, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const areaStackedSpec: ChartSpec = {
  id: 'area-stacked',
  title: 'Stacked Area',
  description: 'Two series stacked into a single area chart to show total volume and composition over time.',
  category: 'Area',
  render: () => (
    <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
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
          dataKey="mobile"
          type="natural"
          stackId="a"
          stroke="var(--color-mobile)"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
        />
        <Area
          dataKey="desktop"
          type="natural"
          stackId="a"
          stroke="var(--color-desktop)"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
        />
      </AreaChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[220px] w-full">
  <AreaChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area
      dataKey="mobile"
      type="natural"
      stackId="a"
      stroke="var(--color-mobile)"
      fill="var(--color-mobile)"
      fillOpacity={0.4}
    />
    <Area
      dataKey="desktop"
      type="natural"
      stackId="a"
      stroke="var(--color-desktop)"
      fill="var(--color-desktop)"
      fillOpacity={0.4}
    />
  </AreaChart>
</ChartContainer>`,
}
