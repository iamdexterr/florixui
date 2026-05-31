import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const data = [
  { metric: 'Speed', desktop: 186, mobile: 120 },
  { metric: 'Quality', desktop: 205, mobile: 160 },
  { metric: 'Reach', desktop: 137, mobile: 190 },
  { metric: 'Cost', desktop: 173, mobile: 130 },
  { metric: 'Support', desktop: 160, mobile: 175 },
  { metric: 'Uptime', desktop: 214, mobile: 150 },
]

const config = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const radarMultipleSpec: ChartSpec = {
  id: 'radar-multiple',
  title: 'Multiple Radar',
  description: 'A radar chart comparing two series across shared metrics, with a legend.',
  category: 'Radar',
  render: () => (
    <ChartContainer config={config} className="mx-auto aspect-square max-h-[260px]">
      <RadarChart data={data}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <Radar
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={0.5}
          stroke="var(--color-desktop)"
        />
        <Radar
          dataKey="mobile"
          fill="var(--color-mobile)"
          fillOpacity={0.5}
          stroke="var(--color-mobile)"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px]">
  <RadarChart data={data}>
    <ChartTooltip content={<ChartTooltipContent />} />
    <PolarGrid />
    <PolarAngleAxis dataKey="metric" />
    <Radar
      dataKey="desktop"
      fill="var(--color-desktop)"
      fillOpacity={0.5}
      stroke="var(--color-desktop)"
    />
    <Radar
      dataKey="mobile"
      fill="var(--color-mobile)"
      fillOpacity={0.5}
      stroke="var(--color-mobile)"
    />
    <ChartLegend content={<ChartLegendContent />} />
  </RadarChart>
</ChartContainer>`,
}
