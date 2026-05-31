import { PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ChartSpec } from '../types'

const radialStackedData = [{ period: 'q1', desktop: 1260, mobile: 570 }]

const radialStackedConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig

export const radialStackedSpec: ChartSpec = {
  id: 'radial-stacked',
  title: 'Stacked Radial',
  description:
    'A radial bar chart with two series stacked into a single concentric ring to compare totals.',
  category: 'Radial',
  render: () => (
    <ChartContainer
      config={radialStackedConfig}
      className="mx-auto aspect-square max-h-[260px]"
    >
      <RadialBarChart
        data={radialStackedData}
        startAngle={0}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-desktop)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-mobile)"
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  ),
  code: `const chartData = [{ period: 'q1', desktop: 1260, mobile: 570 }]

const chartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px]">
  <RadialBarChart
    data={chartData}
    startAngle={0}
    endAngle={180}
    innerRadius={80}
    outerRadius={130}
  >
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
    <RadialBar
      dataKey="desktop"
      stackId="a"
      cornerRadius={5}
      fill="var(--color-desktop)"
      className="stroke-transparent stroke-2"
    />
    <RadialBar
      dataKey="mobile"
      stackId="a"
      cornerRadius={5}
      fill="var(--color-mobile)"
      className="stroke-transparent stroke-2"
    />
  </RadialBarChart>
</ChartContainer>`,
}
