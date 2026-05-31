import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const radarData = [
  { skill: 'Speed', value: 186 },
  { skill: 'Power', value: 205 },
  { skill: 'Range', value: 137 },
  { skill: 'Defense', value: 173 },
  { skill: 'Agility', value: 209 },
  { skill: 'Stamina', value: 154 },
]

const radarConfig = {
  value: { label: 'Rating', color: 'var(--chart-1)' },
} satisfies ChartConfig

export const radarBasicSpec: ChartSpec = {
  id: 'radar-basic',
  title: 'Radar Chart',
  description:
    'A single-series radar chart with a polar grid and angle axis, ideal for comparing several metrics on one entity.',
  category: 'Radar',
  render: () => (
    <ChartContainer
      config={radarConfig}
      className="mx-auto aspect-square max-h-[260px]"
    >
      <RadarChart data={radarData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" />
        <Radar
          dataKey="value"
          fill="var(--color-value)"
          fillOpacity={0.6}
          stroke="var(--color-value)"
        />
      </RadarChart>
    </ChartContainer>
  ),
  code: `const chartConfig = {
  value: { label: 'Rating', color: 'var(--chart-1)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px]">
  <RadarChart data={data}>
    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    <PolarGrid />
    <PolarAngleAxis dataKey="skill" />
    <Radar
      dataKey="value"
      fill="var(--color-value)"
      fillOpacity={0.6}
      stroke="var(--color-value)"
    />
  </RadarChart>
</ChartContainer>`,
}
