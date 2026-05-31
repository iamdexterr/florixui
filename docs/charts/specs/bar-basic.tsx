import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 273 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const config = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const barBasicSpec: ChartSpec = {
  id: 'bar-basic',
  title: 'Bar Chart',
  description: 'A single-series vertical bar chart with rounded bars.',
  category: 'Bar',
  render: () => (
    <ChartContainer config={config} className="min-h-[220px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  ),
  code: `import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const data = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 273 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
]

const config = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function BarBasic() {
  return (
    <ChartContainer config={config} className="min-h-[220px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}`,
}
