"use client"

import * as React from "react"
import { CircleDotIcon, RefreshCwIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

// ============================================================================
// Types
// ============================================================================

/** Color variant for the accent bar, mode label, icon, and value text. */
export type SensorCardColorVariant = "primary" | "warning" | "danger" | "muted"

export interface SensorCardProps {
  /** Leading icon. Falls back to a default based on `mode` ("auto" vs other). */
  icon?: React.ReactNode
  /** Mode label, e.g. "Manual", "Auto". */
  mode?: string
  /** Main description / name. */
  description?: string
  /** Value shown on the right, e.g. "80", "Active", "OFF". */
  value: string
  /** Show the colored accent bar before the value (active states). */
  showAccent?: boolean
  /** Color of the accent bar, mode label, and default icon. */
  colorVariant?: SensorCardColorVariant
  /** Override the accent-bar color only (falls back to `colorVariant`). */
  accentColorVariant?: SensorCardColorVariant
  /** Color the value text (defaults to the foreground color). */
  valueColorVariant?: SensorCardColorVariant
  /** Append a "%" to numeric values. Default `true`. */
  showPercentSign?: boolean
  /** Unit shown above the value in a stacked layout, e.g. "°F", "kPa". */
  unit?: string
  /** Icon on the left with mode/description stacked beside it. */
  stackedLayout?: boolean
  /**
   * - `default`: bare row, no Card wrapper (for nesting).
   * - `standalone`: wrapped in a Card with full styling.
   */
  variant?: "default" | "standalone"
  /** Click handler for the whole card. */
  onClick?: () => void
  /** Click handler for just the value. */
  onValueClick?: () => void
  className?: string
}

// ============================================================================
// Color tokens
// ============================================================================

const COLOR_CLASSES: Record<
  SensorCardColorVariant,
  { text: string; bg: string }
> = {
  primary: { text: "text-primary", bg: "bg-primary" },
  warning: { text: "text-orange", bg: "bg-orange" },
  danger: { text: "text-red", bg: "bg-red" },
  muted: { text: "text-muted-foreground", bg: "bg-muted-foreground" },
}

// ============================================================================
// Sensor Card
// ============================================================================

/**
 * A compact info/action card: a left side with an icon, mode label, and
 * description, and a right side with an accent bar and a value. Use
 * `colorVariant` to tint the bar, mode label, and default icon (primary /
 * warning / danger / muted), `variant="standalone"` to wrap it in a Card, and
 * `onClick` / `onValueClick` for actions.
 */
export function SensorCard({
  icon,
  mode,
  description,
  value,
  showAccent = false,
  colorVariant = "primary",
  accentColorVariant,
  valueColorVariant,
  showPercentSign = true,
  unit,
  stackedLayout = false,
  variant = "default",
  onClick,
  onValueClick,
  className,
}: SensorCardProps) {
  const colors = COLOR_CLASSES[colorVariant]
  const accentColors = COLOR_CLASSES[accentColorVariant ?? colorVariant]
  const valueTextColorClass = valueColorVariant
    ? COLOR_CLASSES[valueColorVariant].text
    : "text-foreground"

  // Default icon, tinted with the card's color variant.
  const iconSize = stackedLayout ? "size-10" : "size-5"
  const resolvedIcon =
    icon ??
    (mode?.toLowerCase() === "auto" ? (
      <RefreshCwIcon className={cn(iconSize, colors.text)} />
    ) : (
      <CircleDotIcon className={cn(iconSize, colors.text)} />
    ))

  const left = stackedLayout ? (
    <div className="flex items-center gap-3">
      {resolvedIcon}
      <div className="flex flex-col">
        {mode && (
          <span className={cn("text-sm font-medium", colors.text)}>{mode}</span>
        )}
        <span className="text-sm font-medium text-foreground">
          {description}
        </span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {resolvedIcon}
        {mode && (
          <span className={cn("text-sm font-medium", colors.text)}>{mode}</span>
        )}
      </div>
      <span className="text-sm font-medium text-foreground">{description}</span>
    </div>
  )

  const content = (
    <>
      {left}

      {/* Right side - accent bar + value */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "h-9 w-0.5 rounded-full",
            showAccent ? accentColors.bg : "bg-border"
          )}
        />
        {unit ? (
          <div
            className={cn(
              "flex min-w-16 flex-col items-center text-center",
              onValueClick &&
                "cursor-pointer transition-colors hover:text-primary"
            )}
            onClick={onValueClick}
          >
            <span className="text-xs font-medium text-muted-foreground">
              {unit}
            </span>
            <span className={cn("text-sm font-medium", valueTextColorClass)}>
              {value}
            </span>
          </div>
        ) : (
          <span
            className={cn(
              "min-w-16 text-center text-sm font-medium whitespace-nowrap",
              valueTextColorClass,
              onValueClick &&
                "cursor-pointer transition-colors hover:text-primary"
            )}
            onClick={onValueClick}
          >
            {showPercentSign && value !== "" && !isNaN(Number(value))
              ? `${value}%`
              : value}
          </span>
        )}
      </div>
    </>
  )

  const baseClasses = cn(
    "flex w-full flex-row items-center justify-between gap-3",
    stackedLayout ? "py-3 pr-3 pl-3" : "py-3.5 pr-3 pl-4",
    onClick && "cursor-pointer hover:bg-accent",
    className
  )

  if (variant === "standalone") {
    return (
      <Card className="p-0" onClick={onClick}>
        <div className={baseClasses}>{content}</div>
      </Card>
    )
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {content}
    </div>
  )
}
