import type { ChartCategory, ChartSpec } from './types'

import { areaBasicSpec } from './specs/area-basic'
import { areaStackedSpec } from './specs/area-stacked'
import { areaStepSpec } from './specs/area-step'
import { areaLegendSpec } from './specs/area-legend'
import { barBasicSpec } from './specs/bar-basic'
import { barMultipleSpec } from './specs/bar-multiple'
import { barHorizontalSpec } from './specs/bar-horizontal'
import { barStackedSpec } from './specs/bar-stacked'
import { lineBasicSpec } from './specs/line-basic'
import { lineMultipleSpec } from './specs/line-multiple'
import { lineDotsSpec } from './specs/line-dots'
import { lineStepSpec } from './specs/line-step'
import { lineInteractiveSpec } from './specs/line-interactive'
import { pieBasicSpec } from './specs/pie-basic'
import { pieDonutSpec } from './specs/pie-donut'
import { pieLabelSpec } from './specs/pie-label'
import { pieLegendSpec } from './specs/pie-legend'
import { radarBasicSpec } from './specs/radar-basic'
import { radarMultipleSpec } from './specs/radar-multiple'
import { radialBasicSpec } from './specs/radial-basic'
import { radialStackedSpec } from './specs/radial-stacked'

export type { ChartSpec, ChartCategory } from './types'

export const charts: ChartSpec[] = [
  areaBasicSpec,
  areaStackedSpec,
  areaStepSpec,
  areaLegendSpec,
  barBasicSpec,
  barMultipleSpec,
  barHorizontalSpec,
  barStackedSpec,
  lineBasicSpec,
  lineMultipleSpec,
  lineDotsSpec,
  lineStepSpec,
  lineInteractiveSpec,
  pieBasicSpec,
  pieDonutSpec,
  pieLabelSpec,
  pieLegendSpec,
  radarBasicSpec,
  radarMultipleSpec,
  radialBasicSpec,
  radialStackedSpec,
]

const CATEGORY_ORDER: ChartCategory[] = [
  'Area',
  'Bar',
  'Line',
  'Pie',
  'Radar',
  'Radial',
]

export const chartsByCategory: { category: ChartCategory; items: ChartSpec[] }[] =
  CATEGORY_ORDER.map((category) => ({
    category,
    items: charts.filter((c) => c.category === category),
  })).filter((g) => g.items.length > 0)
