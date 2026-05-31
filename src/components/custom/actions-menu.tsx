import * as React from "react"
import { MoreVertical, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ICON_SIZE = 16

/** A clickable action row. */
export interface ActionsMenuAction {
  type?: "action"
  label: React.ReactNode
  icon?: LucideIcon
  onSelect?: () => void
  /** Keyboard shortcut hint shown on the right (e.g. "⌘C"). */
  shortcut?: string
  destructive?: boolean
  disabled?: boolean
}

/** A non-clickable section heading. */
export interface ActionsMenuLabelItem {
  type: "label"
  label: React.ReactNode
}

/** A divider between groups. */
export interface ActionsMenuSeparator {
  type: "separator"
}

export type ActionsMenuItem =
  | ActionsMenuAction
  | ActionsMenuLabelItem
  | ActionsMenuSeparator

export interface ActionsMenuProps {
  items: ActionsMenuItem[]
  /** Custom trigger element (overrides the default icon button). */
  trigger?: React.ReactNode
  /** Trigger icon for the default button. Defaults to a vertical kebab. */
  triggerIcon?: LucideIcon
  /** Visually-hidden trigger label for screen readers. */
  triggerLabel?: string
  /** Width of the dropdown content. Defaults to "10rem". */
  width?: string
  align?: "start" | "center" | "end"
  /** Class applied to the default trigger button. */
  className?: string
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function isAction(item: ActionsMenuItem): item is ActionsMenuAction {
  return item.type === undefined || item.type === "action"
}

export function ActionsMenu({
  items,
  trigger,
  triggerIcon: TriggerIcon = MoreVertical,
  triggerLabel = "Open menu",
  width = "10rem",
  align = "end",
  className,
  open,
  onOpenChange,
}: ActionsMenuProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-8", className)}
            aria-label={triggerLabel}
          >
            <TriggerIcon size={ICON_SIZE} />
            <span className="sr-only">{triggerLabel}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} style={{ width }}>
        {items.map((item, idx) => {
          if (item.type === "separator") {
            return <DropdownMenuSeparator key={`sep-${idx}`} />
          }
          if (item.type === "label") {
            return (
              <DropdownMenuLabel key={`label-${idx}`}>
                {item.label}
              </DropdownMenuLabel>
            )
          }
          if (!isAction(item)) return null
          const Icon = item.icon
          return (
            <DropdownMenuItem
              key={idx}
              onSelect={item.onSelect}
              disabled={item.disabled}
              variant={item.destructive ? "destructive" : "default"}
            >
              {Icon && <Icon size={ICON_SIZE} />}
              {item.label}
              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
