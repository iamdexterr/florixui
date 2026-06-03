"use client"

import * as React from "react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// ============================================================================
// Types
// ============================================================================

export type StatCardColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "muted"

export interface StatCardTrend {
  /** Delta text, e.g. "+20.1%". */
  value: string
  /** Direction — sets the arrow icon and default color. */
  direction?: "up" | "down"
  /** Trailing context, e.g. "from last month". */
  label?: React.ReactNode
}

export interface StatCardProgress {
  /** Completion percentage, 0–100. */
  value: number
  /** Caption under the bar, left-aligned. */
  caption?: React.ReactNode
  /** Caption under the bar, right-aligned (e.g. "Target: $10,000"). */
  target?: React.ReactNode
}

export interface StatCardRing {
  /** Filled percentage, 0–100. */
  value: number
  /** Label inside the ring (defaults to `value%`). */
  label?: React.ReactNode
  /** Caption beside the ring (e.g. "of 100 GB"). */
  caption?: React.ReactNode
}

export interface StatCardProps {
  /** Small muted heading. */
  title: React.ReactNode
  /** The headline figure, e.g. "$45,231". */
  value: React.ReactNode
  /** Muted supporting line under the value. */
  description?: React.ReactNode
  /** Icon shown in a tinted box at the top-right. */
  icon?: React.ReactNode
  /** Accent color for the icon box, trend, progress bar, and ring. */
  color?: StatCardColor
  /** A colored delta with a trend arrow, shown in place of `description`. */
  trend?: StatCardTrend
  /** A linear progress bar with optional captions, shown under the value. */
  progress?: StatCardProgress
  /** A small filled area chart (series of numbers), shown under the value. */
  sparkline?: number[]
  /** A radial progress ring shown beside the value. */
  ring?: StatCardRing
  className?: string
}

// ============================================================================
// Color tokens
// ============================================================================

const COLOR: Record<StatCardColor, { text: string; bg: string; soft: string }> =
  {
    primary: { text: "text-primary", bg: "bg-primary", soft: "bg-primary/10" },
    success: { text: "text-green", bg: "bg-green", soft: "bg-green/10" },
    warning: { text: "text-orange", bg: "bg-orange", soft: "bg-orange/10" },
    danger: { text: "text-red", bg: "bg-red", soft: "bg-red/10" },
    muted: {
      text: "text-muted-foreground",
      bg: "bg-muted-foreground",
      soft: "bg-muted",
    },
  }

// ============================================================================
// Accessories
// ============================================================================

function Sparkline({
  data,
  colorVar,
}: {
  data: number[]
  colorVar: string
}) {
  const id = React.useId().replace(/:/g, "")
  const series = data.map((y, x) => ({ x, y }))
  return (
    <div className="mt-3 h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorVar} stopOpacity={0.25} />
              <stop offset="100%" stopColor={colorVar} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            dataKey="y"
            type="natural"
            stroke={colorVar}
            strokeWidth={2}
            fill={`url(#spark-${id})`}
            fillOpacity={1}
            isAnimationActive={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ============================================================================
// Stat Card
// ============================================================================

/**
 * A dashboard stat card: a muted `title`, a bold `value`, and an optional
 * accessory — a tinted `icon` box, a colored `trend` delta, a linear
 * `progress` bar, a `sparkline` area chart, or a radial `ring`. Tint accessories
 * with `color`.
 */
export function StatCard({
  title,
  value,
  description,
  icon,
  color = "primary",
  trend,
  progress,
  sparkline,
  ring,
  className,
}: StatCardProps) {
  const colors = COLOR[color]
  // Resolve the accent to a CSS variable recharts can read.
  const colorVar =
    color === "muted" ? "var(--muted-foreground)" : `var(--${cssVar(color)})`

  return (
    <Card className={cn("gap-3", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-0">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>
        {icon && (
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-md",
              colors.soft,
              colors.text,
              "[&_svg]:size-4"
            )}
          >
            {icon}
          </span>
        )}
      </CardHeader>

      <CardContent>
        {ring ? (
          <div className="mt-1 flex items-center gap-4">
            <RingOnly ring={ring} colors={colors} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight tabular-nums">
                {value}
              </span>
              {ring.caption && (
                <span className="text-sm text-muted-foreground">
                  {ring.caption}
                </span>
              )}
            </div>
          </div>
        ) : (
          <span className="text-2xl font-bold tracking-tight tabular-nums">
            {value}
          </span>
        )}

        {/* Trend / description line */}
        {trend ? (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <span
              className={cn(
                "flex items-center gap-1 font-medium",
                trend.direction === "down" ? "text-red" : "text-green"
              )}
            >
              {trend.direction === "down" ? (
                <TrendingDownIcon className="size-4" />
              ) : (
                <TrendingUpIcon className="size-4" />
              )}
              {trend.value}
            </span>
            {trend.label}
          </p>
        ) : description && !ring ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}

        {/* Progress */}
        {progress && (
          <div className="mt-3 flex flex-col gap-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all", colors.bg)}
                style={{
                  width: `${Math.max(0, Math.min(100, progress.value))}%`,
                }}
              />
            </div>
            {(progress.caption || progress.target) && (
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{progress.caption}</span>
                <span>{progress.target}</span>
              </div>
            )}
          </div>
        )}

        {/* Sparkline */}
        {sparkline && sparkline.length > 1 && (
          <Sparkline data={sparkline} colorVar={colorVar} />
        )}
      </CardContent>
    </Card>
  )
}

/** Maps a color name to its CSS custom-property name. */
function cssVar(color: StatCardColor): string {
  switch (color) {
    case "primary":
      return "primary"
    case "success":
      return "green"
    case "warning":
      return "orange"
    case "danger":
      return "red"
    default:
      return "muted-foreground"
  }
}

/** Just the radial ring + centered label (value is rendered by the caller). */
function RingOnly({
  ring,
  colors,
}: {
  ring: StatCardRing
  colors: (typeof COLOR)[StatCardColor]
}) {
  const pct = Math.max(0, Math.min(100, ring.value))
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className="relative size-20 shrink-0">
      <svg className="size-full -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          strokeWidth={8}
          className="stroke-muted"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          stroke="currentColor"
          className={cn("transition-all", colors.text)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        {ring.label ?? `${pct}%`}
      </span>
    </div>
  )
}
