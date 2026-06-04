"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// ============================================================================
// Types
// ============================================================================

export interface DefRowProps extends React.ComponentProps<"div"> {
  /** Muted label on the left. */
  label: React.ReactNode
  /** Value on the right. */
  value: React.ReactNode
}

// ============================================================================
// Def Row
// ============================================================================

/**
 * A definition row — a muted `label` on the left and a `value` on the right —
 * for key/value detail cards. Stack several inside a `divide-y` container.
 */
export function DefRow({ label, value, className, ...props }: DefRowProps) {
  return (
    <div
      data-slot="def-row"
      className={cn("flex items-center justify-between gap-4 py-2", className)}
      {...props}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
