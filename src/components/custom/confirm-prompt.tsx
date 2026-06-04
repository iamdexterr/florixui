"use client"

import * as React from "react"
import { AlertTriangle, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AdvancedInput } from "@/components/custom/advanced-input"

// ============================================================================
// Types
// ============================================================================

export interface ConfirmPromptProps {
  /** Whether the prompt is open. Controlled. */
  show: boolean
  /** Heading. Defaults to "Are you absolutely sure?". */
  title?: React.ReactNode
  /** Supporting copy explaining the consequence. */
  message?: React.ReactNode
  /** Runs when the user confirms. May return a promise for a loading state. */
  onConfirm: () => void | Promise<void>
  /** Runs when the user cancels / dismisses. */
  onCancel: () => void
  /** Show a spinner on the confirm button and block dismissal. */
  loading?: boolean
  /** Disable the confirm button regardless of validation. */
  disabled?: boolean
  /** Require the user to type `item` exactly before confirming. */
  validate?: boolean
  /** The string the user must type when `validate` is set. Defaults to "CONFIRM". */
  item?: string | null
  /** Confirm button label. Defaults to "Confirm". */
  confirmLabel?: string
  /** Cancel button label. Defaults to "Cancel". */
  cancelLabel?: string
}

// ============================================================================
// Component
// ============================================================================

/**
 * A confirmation dialog for risky actions — mainly deletes. An amber warning
 * icon sits beside the title, with a red confirm button. Set `validate` to
 * require the user to type `item` exactly before confirming (the
 * "type the name to delete" safeguard). Controlled via `show`/`onCancel`;
 * `onConfirm` may return a promise to show a spinner.
 */
export function ConfirmPrompt({
  show,
  title = "Are you absolutely sure?",
  message = "This action cannot be undone. This will permanently delete and remove your data from our servers.",
  onConfirm,
  onCancel,
  loading: loadingProp,
  disabled,
  validate,
  item = "CONFIRM",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: ConfirmPromptProps) {
  const [confirmMessage, setConfirmMessage] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const loading = loadingProp ?? pending

  const matches = !validate || confirmMessage === item
  const confirmDisabled = disabled || loading || !matches

  const handleCancel = () => {
    if (loading) return
    setConfirmMessage("")
    onCancel()
  }

  const handleConfirm = async () => {
    if (confirmDisabled) return
    try {
      setPending(true)
      await onConfirm()
      setConfirmMessage("")
    } finally {
      setPending(false)
    }
  }

  return (
    <AlertDialog
      open={Boolean(show)}
      onOpenChange={(next) => {
        if (!next) handleCancel()
      }}
    >
      <AlertDialogContent className="sm:max-w-lg!">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <AlertTriangle className="size-5 text-amber-600 dark:text-amber-500" />
            </div>
            {title}
          </AlertDialogTitle>
          {message != null && (
            <AlertDialogDescription>{message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {validate && (
          <div className="space-y-1">
            <AlertDialogDescription>
              To confirm, type{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{item}&rdquo;
              </span>{" "}
              in the box below
            </AlertDialogDescription>
            <AdvancedInput
              value={confirmMessage}
              onChange={(e) => setConfirmMessage(e.target.value)}
              size="sm"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirm()
              }}
            />
          </div>
        )}

        <AlertDialogFooter className="gap-2 space-x-0!">
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            onClick={handleConfirm}
            className={cn("bg-red-500 text-white hover:bg-red-600")}
            disabled={confirmDisabled}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              confirmLabel
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
