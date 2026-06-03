"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// ============================================================================
// Types
// ============================================================================

export type CustomTabsType = "underline" | "pill"

export interface CustomTabItem {
  /** Unique value for the tab; also used as the trigger's `value`. */
  value: string
  /** Visible label. */
  label: React.ReactNode
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Optional numeric count rendered as a muted pill after the label. */
  count?: number
  /** Optional short badge rendered after the label, e.g. "New". */
  badge?: React.ReactNode
  /** Disables this individual tab. */
  disabled?: boolean
}

export interface CustomTabsProps
  extends Omit<
    React.ComponentProps<typeof TabsPrimitive.Root>,
    "orientation" | "children"
  > {
  /** Visual style of the tab strip. Defaults to `underline`. */
  type?: CustomTabsType
  /** The tabs to render. */
  items: CustomTabItem[]
  /** Class for the tab list (the strip itself). */
  listClassName?: string
}

// ============================================================================
// Custom Tabs
// ============================================================================

/**
 * A higher-level tab strip with two looks — `underline` and `pill` — driven by
 * a single `items` array. Each item can carry an icon, a numeric `count`, and a
 * short `badge` (e.g. "New"). Built on Radix Tabs, so it stays keyboard- and
 * a11y-friendly; control selection with `value`/`onValueChange` or
 * `defaultValue` just like the primitive.
 */
function CustomTabs({
  type = "underline",
  items,
  className,
  listClassName,
  ...props
}: CustomTabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="custom-tabs"
      data-type={type}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      <TabsPrimitive.List
        data-slot="custom-tabs-list"
        className={cn(
          "inline-flex items-center text-muted-foreground",
          type === "underline" &&
            "w-full gap-6 border-b border-border",
          type === "pill" && "w-fit gap-1 rounded-lg bg-muted p-1",
          listClassName
        )}
      >
        {items.map((item) => (
          <CustomTabsTrigger key={item.value} type={type} item={item} />
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  )
}

function CustomTabsTrigger({
  type,
  item,
}: {
  type: CustomTabsType
  item: CustomTabItem
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="custom-tabs-trigger"
      value={item.value}
      disabled={item.disabled}
      className={cn(
        "group/trigger relative inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:rounded-md",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Underline: full-height tab with an animated bottom border that picks
        // up the active theme's accent color.
        type === "underline" &&
          cn(
            "-mb-px h-10 border-b-2 border-transparent px-0.5 text-foreground/60",
            "hover:text-foreground",
            "data-[state=active]:border-primary data-[state=active]:text-primary"
          ),
        // Pill: rounded chip that fills with the accent color when active.
        type === "pill" &&
          cn(
            "h-8 rounded-md px-3 text-foreground/60",
            "hover:text-foreground",
            "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          )
      )}
    >
      {item.icon}
      <span>{item.label}</span>
      {item.count != null && (
        <span
          className={cn(
            "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium tabular-nums",
            "bg-muted text-muted-foreground",
            // Underline active: tab bg is transparent, so tint the count with
            // the accent. Pill active: chip is filled with the accent, so use
            // the inverse (primary-foreground) to stay legible.
            type === "underline" &&
              "group-data-[state=active]/trigger:bg-primary/10 group-data-[state=active]/trigger:text-primary",
            type === "pill" &&
              "group-data-[state=active]/trigger:bg-primary-foreground/20 group-data-[state=active]/trigger:text-primary-foreground"
          )}
        >
          {item.count}
        </span>
      )}
      {item.badge != null && (
        <Badge className="px-2 text-[10px]">{item.badge}</Badge>
      )}
    </TabsPrimitive.Trigger>
  )
}

export { CustomTabs }
