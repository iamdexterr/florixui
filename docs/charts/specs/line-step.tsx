import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const data = [
  { month: 'Jan', requests: 120 },
  { month: 'Feb', requests: 200 },
  { month: 'Mar', requests: 165 },
  { month: 'Apr', requests: 290 },
  { month: 'May', requests: 240 },
  { month: 'Jun', requests: 310 },
]

const config = {
  requests: { label: 'Requests', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const lineStepSpec: ChartSpec = {
  id: 'line-step',
  title: 'Step Line',
  description:
    'A single-series line chart using a step interpolation to emphasize discrete level changes between periods.',
  category: 'Line',
  render: () => (
    <ChartContainer config={config} className="min-h-[220px] w-full">
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
          dataKey="requests"
          type="step"
          stroke="var(--color-requests)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  ),
  code: `const config = {
  requests: { label: 'Requests', color: 'var(--chart-1)' },
} satisfies ChartConfig

<ChartContainer config={config} className="min-h-[220px] w-full">
  <LineChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line
      dataKey="requests"
      type="step"
      stroke="var(--color-requests)"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ChartContainer>`,
}
