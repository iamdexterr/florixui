"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

export interface QuickStatProps extends React.ComponentProps<"div"> {
  /** Leading icon (auto-sized to 1rem). */
  icon?: React.ReactNode
  /** The figure, e.g. "$960.99" or 982. */
  value: React.ReactNode
  /** Muted trailing label, e.g. "in stock", "sold". */
  label?: React.ReactNode
}

// ============================================================================
// Quick Stat
// ============================================================================

/**
 * A compact inline stat — a muted icon, a bold value, and an optional muted
 * label — for header metric rows and toolbars. Line several up with vertical
 * separators between them.
 */
export function QuickStat({
  icon,
  value,
  label,
  className,
  ...props
}: QuickStatProps) {
  return (
    <div
      data-slot="quick-stat"
      className={cn("flex items-center gap-1.5 text-sm", className)}
      {...props}
    >
      {icon && (
        <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
      )}
      <span className="font-medium tabular-nums">{value}</span>
      {label != null && <span className="text-muted-foreground">{label}</span>}
    </div>
  )
}
