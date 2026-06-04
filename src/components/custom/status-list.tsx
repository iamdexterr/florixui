"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// ============================================================================
// Types
// ============================================================================

export type StatusListTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"

/** How the right-side status renders. */
export type StatusVariant = "pill" | "outline" | "text"

// ============================================================================
// Tone tokens
// ============================================================================

const TONE = {
  neutral: {
    text: "text-muted-foreground",
    pill: "border-transparent bg-muted text-muted-foreground",
    outline: "border-border text-foreground",
    softBox: "bg-muted text-muted-foreground",
    activeBg: "bg-muted/50 ring-border",
    avatar: "bg-muted text-foreground",
  },
  primary: {
    text: "text-primary",
    pill: "border-transparent bg-primary/10 text-primary",
    outline: "border-primary/30 text-primary",
    softBox: "bg-primary/10 text-primary",
    activeBg: "bg-primary/5 ring-primary/30",
    avatar: "bg-primary/15 text-primary",
  },
  success: {
    text: "text-green",
    pill: "border-transparent bg-green/10 text-green",
    outline: "border-green/30 text-green",
    softBox: "bg-green/10 text-green",
    activeBg: "bg-green/5 ring-green/30",
    avatar: "bg-green/15 text-green",
  },
  warning: {
    text: "text-orange",
    pill: "border-transparent bg-orange/10 text-orange",
    outline: "border-orange/30 text-orange",
    softBox: "bg-orange/10 text-orange",
    activeBg: "bg-orange/5 ring-orange/30",
    avatar: "bg-orange/15 text-orange",
  },
  danger: {
    text: "text-red",
    pill: "border-transparent bg-red/10 text-red",
    outline: "border-red/30 text-red",
    softBox: "bg-red/10 text-red",
    activeBg: "bg-red/5 ring-red/30",
    avatar: "bg-red/15 text-red",
  },
} satisfies Record<StatusListTone, Record<string, string>>

// ============================================================================
// Leading-visual helpers
// ============================================================================

/** A soft, tone-tinted rounded-square icon box (the gateway-row style). */
export function StatusIcon({
  tone = "neutral",
  className,
  children,
}: {
  tone?: StatusListTone
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5",
        TONE[tone].softBox,
        className
      )}
    >
      {children}
    </span>
  )
}

/** A circular avatar — an image, or tone-tinted initials fallback. */
export function StatusAvatar({
  src,
  name,
  tone = "primary",
  className,
}: {
  src?: string
  name: string
  tone?: StatusListTone
  className?: string
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-semibold",
        TONE[tone].avatar,
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        initials
      )}
    </span>
  )
}

// ============================================================================
// Status List
// ============================================================================

export function StatusList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

/** An uppercase group header with an optional count, e.g. "WORKERS (2)". */
export function StatusListGroup({
  label,
  count,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  label: React.ReactNode
  count?: number
}) {
  return (
    <div data-slot="status-list-group" className={className} {...props}>
      <p className="mb-2 px-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
        {count != null && (
          <span className="ml-1 text-muted-foreground/70">({count})</span>
        )}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

export interface StatusListItemProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  /** Leading visual — pass a `StatusIcon`, `StatusAvatar`, or any node. */
  media?: React.ReactNode
  /** Primary label. */
  title: React.ReactNode
  /** Muted secondary line. */
  description?: React.ReactNode
  /** Status text shown on the right. */
  status?: React.ReactNode
  /** How the status renders: filled pill, outline pill, or plain text. */
  statusVariant?: StatusVariant
  /** Extra muted text before the status (e.g. "3 min open"). */
  hint?: React.ReactNode
  /** Tone — tints the status, hint, and (when `active`) the row background. */
  tone?: StatusListTone
  /** Highlight the row with a soft tinted background + ring. */
  active?: boolean
}

/**
 * A single status row: a leading visual (`media`), a title + description, and a
 * right-side status (`pill`, `outline`, or `text`). Set `active` to highlight
 * the row, and `tone` to color the status/hint/highlight.
 */
export function StatusListItem({
  media,
  title,
  description,
  status,
  statusVariant = "pill",
  hint,
  tone = "neutral",
  active = false,
  className,
  ...props
}: StatusListItemProps) {
  const t = TONE[tone]

  return (
    <div
      data-slot="status-list-item"
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3",
        active ? cn("border-transparent ring-1", t.activeBg) : "bg-card",
        className
      )}
      {...props}
    >
      {media}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {description != null && (
          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {hint != null && (
          <span className={cn("text-xs font-medium", t.text)}>{hint}</span>
        )}
        {status != null &&
          (statusVariant === "text" ? (
            <span className={cn("text-sm font-medium", t.text)}>{status}</span>
          ) : (
            <Badge
              variant="outline"
              className={cn(
                "font-medium",
                statusVariant === "outline" ? t.outline : t.pill
              )}
            >
              {status}
            </Badge>
          ))}
      </div>
    </div>
  )
}
