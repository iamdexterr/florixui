"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ActionsMenu,
  type ActionsMenuItem,
} from "@/components/custom/actions-menu"

// ============================================================================
// Footer building blocks (optional)
// ============================================================================

/** A small avatar (image or initials) paired with a label — for card footers. */
export function ListCardPerson({
  name,
  src,
  className,
}: {
  name: string
  src?: string
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
        "flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground",
        className
      )}
    >
      <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-[10px] font-semibold text-foreground">
        {src ? (
          <img src={src} alt={name} className="size-full object-cover" />
        ) : (
          initials
        )}
      </span>
      <span className="truncate">{name}</span>
    </span>
  )
}

/** A bordered chip with an optional leading icon — for entity tags in footers. */
export function ListCardChip({
  icon,
  children,
  className,
}: {
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs text-muted-foreground [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:opacity-70",
        className
      )}
    >
      {icon}
      <span className="truncate">{children}</span>
    </span>
  )
}

// ============================================================================
// ListCard
// ============================================================================

export interface ListCardProps
  extends Omit<React.ComponentProps<"div">, "title" | "onSelect"> {
  /** Primary heading. */
  title: React.ReactNode
  /** Muted secondary line below the title. */
  description?: React.ReactNode
  /** Leading visual beside the title — an image URL, or any node (icon, avatar). */
  media?: React.ReactNode | string
  /** Status badge shown in the top-left. */
  badge?: React.ReactNode
  /** Extra muted text shown in the footer, e.g. a timestamp. */
  meta?: React.ReactNode
  /** Footer content — pass `ListCardPerson`, `ListCardChip`, or any nodes. */
  footer?: React.ReactNode
  /** Kebab menu actions (top-right of the card). Pass items or a ready node. */
  actions?: ActionsMenuItem[] | React.ReactNode
  /**
   * - `stacked` (default): header row (checkbox + badge, menu on the right),
   *   then media + title/description, then footer.
   * - `row`: a single line — checkbox, media, title/description, then menu.
   */
  layout?: "stacked" | "row"
  /** Render a selection checkbox. */
  selectable?: boolean
  /** Controlled checkbox state (with `selectable`). */
  selected?: boolean
  /** Called when the checkbox toggles. */
  onSelectedChange?: (checked: boolean) => void
  /** Highlight the card with a ring (e.g. focused/open row). */
  active?: boolean
  /** Makes the whole card a button. */
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

/**
 * A minimal content card for list / grid layouts: a top row (checkbox + badge,
 * with an actions menu on the right), an optional media thumbnail beside a title
 * + description, and a footer (where `meta` is shown). Every slot is optional,
 * so it renders any kind of data — alerts, tasks, contacts, files, etc.
 */
export function ListCard({
  title,
  description,
  media,
  badge,
  meta,
  footer,
  actions,
  layout = "stacked",
  selectable = false,
  selected,
  onSelectedChange,
  active = false,
  onClick,
  className,
  ...props
}: ListCardProps) {
  const interactive = onClick != null
  const isRow = layout === "row"

  const checkboxNode = selectable ? (
    <Checkbox
      checked={selected}
      onCheckedChange={(c) => onSelectedChange?.(c === true)}
      onClick={(e) => e.stopPropagation()}
      aria-label="Select card"
      className="shrink-0"
    />
  ) : null

  const mediaNode =
    typeof media === "string" ? (
      <img
        src={media}
        alt=""
        className="size-12 shrink-0 rounded-md object-cover"
      />
    ) : (
      media
    )

  const badgeNode =
    badge == null ? null : typeof badge === "string" ||
      typeof badge === "number" ? (
      <Badge variant="secondary" className="font-medium">
        {badge}
      </Badge>
    ) : (
      badge
    )

  const actionsNode = Array.isArray(actions) ? (
    <ActionsMenu items={actions} align="end" />
  ) : (
    actions
  )

  const rootClassName = cn(
    "rounded-xl border bg-card p-4 text-card-foreground transition-colors",
    interactive &&
      "cursor-pointer hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
    active && "ring-2 ring-ring",
    className
  )

  const rootProps = {
    "data-slot": "list-card",
    "data-active": active || undefined,
    onClick,
    role: interactive ? "button" : undefined,
    tabIndex: interactive ? 0 : undefined,
    ...props,
  }

  // --- Single-line row layout -----------------------------------------------
  if (isRow) {
    return (
      <div className={cn("flex items-start gap-3", rootClassName)} {...rootProps}>
        {checkboxNode}
        {mediaNode}
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-2">
            <p className="min-w-0 truncate font-medium text-sm">{title}</p>
            {badgeNode}
          </div>
          {description != null && (
            <p className="truncate text-xs text-muted-foreground">
              {description}
            </p>
          )}
          {(footer != null || meta != null) && (
            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2">
              {meta != null && (
                <span className="text-xs text-muted-foreground">{meta}</span>
              )}
              {footer}
            </div>
          )}
        </div>
        {actionsNode != null && (
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            {actionsNode}
          </div>
        )}
      </div>
    )
  }

  // --- Stacked layout -------------------------------------------------------
  return (
    <div className={cn("flex flex-col gap-3", rootClassName)} {...rootProps}>
      {/* Top row: checkbox + badge on the left, actions menu on the right */}
      {(checkboxNode != null || badgeNode != null || actionsNode != null) && (
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            {checkboxNode}
            {badgeNode}
          </div>
          {actionsNode != null && (
            <div
              className="-mt-1 -mr-1 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {actionsNode}
            </div>
          )}
        </div>
      )}

      {/* Body: media + title/description */}
      <div className="flex min-w-0 items-start gap-3">
        {mediaNode}
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm leading-snug">{title}</p>
          {description != null && (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Footer (meta is prepended here) */}
      {(footer != null || meta != null) && (
        <div className="mt-auto flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-t pt-3">
          {meta != null && (
            <span className="text-xs text-muted-foreground">{meta}</span>
          )}
          {footer}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// ListCardGrid — responsive grid wrapper
// ============================================================================

export interface ListCardGridProps extends React.ComponentProps<"div"> {
  /** Column count at the widest breakpoint. Defaults to 3. */
  columns?: 1 | 2 | 3 | 4
}

const GRID_COLS: Record<NonNullable<ListCardGridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

/** A responsive grid that lays out `ListCard`s. */
export function ListCardGrid({
  columns = 3,
  className,
  ...props
}: ListCardGridProps) {
  return (
    <div
      data-slot="list-card-grid"
      className={cn("grid w-full gap-4", GRID_COLS[columns], className)}
      {...props}
    />
  )
}
