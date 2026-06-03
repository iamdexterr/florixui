"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ============================================================================
// Types
// ============================================================================

export interface FormDialogProps {
  /** Body content — typically a form. Scrolls when it overflows. */
  children: React.ReactNode
  /** Heading shown in the (bordered) header. Omit to hide the header. */
  title?: React.ReactNode
  /** Whether the dialog is open. Controlled. */
  open: boolean
  /** Called when the dialog requests to close (X, overlay, or Esc). */
  onClose: () => void
  /** Optional supporting text under the title. */
  description?: React.ReactNode
  /**
   * When set, the dialog can't be dismissed by clicking the overlay or pressing
   * Escape — only the explicit close button / footer actions close it.
   */
  notDismissable?: boolean
  /** Footer content, pinned below the scrollable body with a top border. */
  footer?: React.ReactNode
  /** Class for the dialog content surface. */
  className?: string
}

// ============================================================================
// Form Dialog
// ============================================================================

/**
 * A pre-composed modal for forms: a fixed bordered header (title, description,
 * and a close button), a scrollable body, and an optional pinned footer for
 * actions. Controlled via `open`/`onClose`. Set `notDismissable` to require an
 * explicit action to close.
 */
function FormDialog({
  children,
  title,
  open,
  onClose,
  description,
  notDismissable,
  footer,
  className,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={
        notDismissable ? undefined : (isOpen) => !isOpen && onClose()
      }
    >
      <DialogContent
        showCloseButton={false}
        className={cn("max-h-[75vh] gap-0 p-0 sm:max-w-2xl", className)}
      >
        <div className="flex max-h-[75vh] flex-col">
          {title && (
            <DialogHeader className="flex-shrink-0 border-b border-border p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <DialogTitle className="text-left text-xl font-semibold">
                    {title}
                  </DialogTitle>
                  {description && (
                    <DialogDescription className="text-left text-muted-foreground">
                      {description}
                    </DialogDescription>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close"
                  className="-mt-1 shrink-0"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClose()
                  }}
                >
                  <XIcon />
                </Button>
              </div>
            </DialogHeader>
          )}

          <div className="flex-1 overflow-y-auto p-6">{children}</div>

          {footer && (
            <DialogFooter className="m-0 flex-shrink-0 rounded-none border-t border-border bg-transparent p-6 pt-4">
              {footer}
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { FormDialog }
