import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

// ~3 months of weekly traffic across five channels.
const data = [
  { date: '2024-04-01', desktop: 222, mobile: 150, tablet: 90, watch: 40, tv: 60 },
  { date: '2024-04-08', desktop: 167, mobile: 120, tablet: 110, watch: 55, tv: 70 },
  { date: '2024-04-15', desktop: 242, mobile: 260, tablet: 130, watch: 60, tv: 95 },
  { date: '2024-04-22', desktop: 314, mobile: 220, tablet: 150, watch: 70, tv: 110 },
  { date: '2024-04-29', desktop: 201, mobile: 180, tablet: 120, watch: 50, tv: 80 },
  { date: '2024-05-06', desktop: 289, mobile: 290, tablet: 170, watch: 90, tv: 130 },
  { date: '2024-05-13', desktop: 137, mobile: 170, tablet: 100, watch: 45, tv: 75 },
  { date: '2024-05-20', desktop: 255, mobile: 200, tablet: 140, watch: 65, tv: 100 },
  { date: '2024-05-27', desktop: 323, mobile: 350, tablet: 190, watch: 95, tv: 150 },
  { date: '2024-06-03', desktop: 178, mobile: 210, tablet: 115, watch: 50, tv: 85 },
  { date: '2024-06-10', desktop: 244, mobile: 190, tablet: 135, watch: 70, tv: 105 },
  { date: '2024-06-17', desktop: 401, mobile: 380, tablet: 210, watch: 110, tv: 170 },
  { date: '2024-06-24', desktop: 296, mobile: 310, tablet: 175, watch: 85, tv: 140 },
]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  tablet: { label: 'Tablet', color: 'var(--chart-3)' },
  watch: { label: 'Watch', color: 'var(--chart-4)' },
  tv: { label: 'TV', color: 'var(--chart-5)' },
} satisfies ChartConfig

const seriesKeys = ['desktop', 'mobile', 'tablet', 'watch', 'tv'] as const

export const lineInteractiveSpec: ChartSpec = {
  id: 'line-interactive',
  title: 'Multi-series Line',
  description:
    'Five series plotted together with a legend, formatted date axes, a Y axis, and a shared tooltip.',
  category: 'Line',
  wide: true,
  render: () => (
    <ChartContainer config={chartConfig} className="h-[280px] w-full">
      <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          }
        />
        <YAxis tickLine={false} axisLine={false} width={36} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[180px]"
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              }
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        {seriesKeys.map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  tablet: { label: 'Tablet', color: 'var(--chart-3)' },
  watch: { label: 'Watch', color: 'var(--chart-4)' },
  tv: { label: 'TV', color: 'var(--chart-5)' },
} satisfies ChartConfig

const seriesKeys = ['desktop', 'mobile', 'tablet', 'watch', 'tv'] as const

<ChartContainer config={chartConfig} className="h-[280px] w-full">
  <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="date"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      minTickGap={32}
      tickFormatter={(value) =>
        new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
    />
    <YAxis tickLine={false} axisLine={false} width={36} />
    <ChartTooltip
      content={
        <ChartTooltipContent
          className="w-[180px]"
          labelFormatter={(value) =>
            new Date(value).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })
          }
        />
      }
    />
    <ChartLegend content={<ChartLegendContent />} />
    {seriesKeys.map((key) => (
      <Line key={key} dataKey={key} type="monotone"
        stroke={\`var(--color-\${key})\`} strokeWidth={2} dot={false} />
    ))}
  </LineChart>
</ChartContainer>`,
}
