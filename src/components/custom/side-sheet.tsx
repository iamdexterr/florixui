"use client"

import * as React from "react"
import { ChevronLeftIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

// ============================================================================
// Types
// ============================================================================

export interface SideSheetProps {
  /** Body content — typically a form. Scrolls between the pinned header/footer. */
  children: React.ReactNode
  /** Heading shown in the pinned header. */
  title?: React.ReactNode
  /** Whether the sheet is open. Controlled. */
  open: boolean
  /** Called when the sheet requests to close (back/close, overlay, or Esc). */
  onClose: () => void
  /** Optional supporting text under the title. */
  description?: React.ReactNode
  /** Which edge the sheet slides in from. Defaults to `right`. */
  side?: "left" | "right"
  /**
   * Detach the panel from the screen edge — inset with a margin, fully rounded
   * corners, and a shadow, so it reads as a floating card.
   */
  floating?: boolean
  /**
   * Show a back chevron before the title. Defaults to a close (X) button.
   * When set, the chevron calls `onBack` (falls back to `onClose`).
   */
  onBack?: () => void
  /**
   * When set, the sheet can't be dismissed by clicking the overlay or pressing
   * Escape — only the header control / footer actions close it.
   */
  notDismissable?: boolean
  /** Footer content, pinned to the bottom with a top border. Always visible. */
  footer?: React.ReactNode
  /** Class for the sheet content surface (e.g. width overrides). */
  className?: string
}

// ============================================================================
// Side Sheet
// ============================================================================

/**
 * A slide-in panel with a pinned header and a **sticky footer**: the header
 * (title, description, and a back/close control) and the footer (actions) stay
 * fixed while the body scrolls between them. Controlled via `open`/`onClose`.
 * Set `notDismissable` to require an explicit action to close, pass `onBack` to
 * swap the close button for a back chevron, or `floating` to detach the panel
 * from the screen edge as a rounded, shadowed card.
 */
function SideSheet({
  children,
  title,
  open,
  onClose,
  description,
  side = "right",
  floating,
  onBack,
  notDismissable,
  footer,
  className,
}: SideSheetProps) {
  const showBack = onBack !== undefined

  return (
    <Sheet
      open={open}
      onOpenChange={
        notDismissable ? undefined : (isOpen) => !isOpen && onClose()
      }
    >
      <SheetContent
        side={side}
        showCloseButton={false}
        className={cn(
          "flex w-full flex-col gap-0 overflow-hidden p-0",
          // Override the base SheetContent's `data-[side]:sm:max-w-sm` cap.
          // tailwind-merge keeps both since they differ by variant, so we match
          // the same variant to win and widen the panel toward the reference.
          "data-[side=left]:sm:max-w-[570px] data-[side=right]:sm:max-w-[570px]",
          // Floating: detach from the edge with a margin, round all corners, and
          // cast a shadow. We re-target the base's `data-[side]` positioning so
          // tailwind-merge lets these win.
          floating &&
            cn(
              "rounded-xl shadow-xl ring-1 ring-foreground/10",
              "data-[side=right]:inset-y-3 data-[side=right]:right-3 data-[side=right]:h-auto",
              "data-[side=left]:inset-y-3 data-[side=left]:left-3 data-[side=left]:h-auto"
            ),
          className
        )}
      >
        {/* Pinned header */}
        <SheetHeader className="shrink-0 flex-row items-center gap-2 border-b border-border px-4 py-3">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={showBack ? "Back" : "Close"}
            className="-ml-1 shrink-0 text-muted-foreground"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              ;(showBack ? onBack! : onClose)()
            }}
          >
            {showBack ? <ChevronLeftIcon /> : <XIcon />}
          </Button>
          <div className="flex min-w-0 flex-col">
            <SheetTitle className="truncate text-left text-lg font-semibold">
              {title}
            </SheetTitle>
            {description && (
              <SheetDescription className="text-left">
                {description}
              </SheetDescription>
            )}
          </div>
        </SheetHeader>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          {children}
        </div>

        {/* Sticky footer */}
        {footer && (
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-border px-4 py-4">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

// ============================================================================
// Side Sheet Section
// ============================================================================

export interface SideSheetSectionProps extends React.ComponentProps<"div"> {
  /** Optional label rendered above the grouped panel, with a divider rule. */
  label?: React.ReactNode
  /** Optional trailing control beside the label (e.g. an expand button). */
  action?: React.ReactNode
}

/**
 * A labelled, grouped block for the sheet body — a divider-titled `bg-secondary`
 * panel, matching the "Trigger Settings" / "Spray Stages" grouping pattern.
 * Drop form rows in as children.
 */
function SideSheetSection({
  label,
  action,
  className,
  children,
  ...props
}: SideSheetSectionProps) {
  return (
    <div data-slot="side-sheet-section" {...props}>
      {label && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="h-px flex-1 bg-border" />
          {action}
        </div>
      )}
      <div className={cn("space-y-4 rounded-lg bg-secondary p-4", className)}>
        {children}
      </div>
    </div>
  )
}

export { SideSheet, SideSheetSection }
