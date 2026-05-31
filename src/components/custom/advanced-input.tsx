import * as React from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { FieldDescription, FieldLabel } from "@/components/ui/field"

// ============================================================================
// Types
// ============================================================================

type BaseProps = {
  /** Label rendered above the control. */
  label?: React.ReactNode
  /** Muted helper text rendered below the field (always visible). */
  description?: React.ReactNode
  /** Marks the field as invalid (forced true when `errorMessage` is set). */
  error?: boolean
  /** Message shown below the control when in an error state. */
  errorMessage?: string
  /** Hint shown below the control when NOT in an error state. */
  helperText?: string
  /** Adds a red asterisk after the label. */
  required?: boolean
  size?: "sm" | "default"
  /** `default` uses the input background; `alt` uses the muted background. */
  variant?: "default" | "alt"
  /** Icon rendered inside the control, on the left. */
  leftIcon?: React.ReactNode
  /** Icon rendered inside the control, on the right. */
  rightIcon?: React.ReactNode
  /** Affix rendered as an attached segment before the input (input-group). */
  startItem?: React.ReactNode
  /** Affix rendered as an attached segment after the input (input-group). */
  endItem?: React.ReactNode
  /** Replaces the left icon with a spinner while true. */
  loading?: boolean
  /** Class for the outer wrapper element. */
  wrapperClassName?: string
}

type InputProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    as?: "input"
  }

type TextareaProps = BaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
    as: "textarea"
  }

export type AdvancedInputProps = InputProps | TextareaProps

// ============================================================================
// Shared field-message rendering
// ============================================================================

function FieldMessages({
  error,
  errorMessage,
  helperText,
  errorId,
  helperId,
}: {
  error: boolean
  errorMessage?: string
  helperText?: string
  errorId: string
  helperId: string
}) {
  if (!errorMessage && !helperText) return null
  return (
    <div className="mt-1.5 min-h-5">
      {error && errorMessage ? (
        <p id={errorId} className="text-xs leading-5 text-destructive">
          {errorMessage}
        </p>
      ) : !error && helperText ? (
        <p id={helperId} className="text-xs leading-5 text-muted-foreground">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

// ============================================================================
// AdvancedInput
// ============================================================================

export const AdvancedInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  AdvancedInputProps
>(function AdvancedInput(props, ref) {
  const {
    className,
    wrapperClassName,
    label,
    description,
    errorMessage,
    helperText,
    required = false,
    size = "default",
    variant = "default",
    leftIcon,
    rightIcon,
    disabled,
    startItem,
    endItem,
    loading = false,
    as = "input",
    id: providedId,
    error: errorProp,
    ...rest
  } = props

  // An explicit errorMessage implies the error state.
  const error = errorProp ?? Boolean(errorMessage)

  const reactId = React.useId()
  const inputId = providedId || reactId

  // Declared before any early return so hook order stays stable.
  const [showPassword, setShowPassword] = React.useState(false)
  const errorId = `${inputId}-error`
  const helperId = `${inputId}-helper`
  const descriptionId = `${inputId}-description`

  const describedBy =
    [
      error && errorMessage ? errorId : null,
      !error && helperText ? helperId : null,
      description ? descriptionId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined

  const bgClass = variant === "alt" ? "bg-muted" : "bg-transparent dark:bg-input/30"

  const Asterisk = required ? (
    <span aria-hidden className="ml-0.5 text-destructive">
      *
    </span>
  ) : null

  // ---- Textarea branch -----------------------------------------------------
  if (as === "textarea") {
    const textareaProps = rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>
    return (
      <div className={cn("space-y-1.5", wrapperClassName)}>
        {label && (
          <FieldLabel
            htmlFor={inputId}
            className={cn(disabled && "text-muted-foreground")}
          >
            {label}
            {Asterisk}
          </FieldLabel>
        )}
        <textarea
          id={inputId}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={describedBy}
          className={cn(
            "flex min-h-20 w-full rounded-lg border border-input px-3 py-2 text-base outline-none transition-colors placeholder:text-muted-foreground md:text-sm",
            bgClass,
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            className,
          )}
          {...textareaProps}
        />
        <FieldMessages
          error={error}
          errorMessage={errorMessage}
          helperText={helperText}
          errorId={errorId}
          helperId={helperId}
        />
        {description && (
          <FieldDescription id={descriptionId}>{description}</FieldDescription>
        )}
      </div>
    )
  }

  // ---- Input branch --------------------------------------------------------
  const { type: rawType, onFocus, ...inputRest } =
    rest as React.InputHTMLAttributes<HTMLInputElement>
  const baseType = rawType ?? "text"

  const isPassword = baseType === "password"
  const type = isPassword && showPassword ? "text" : baseType

  const passwordToggle = isPassword ? (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
      tabIndex={-1}
    >
      {showPassword ? (
        <EyeOff className="size-4" />
      ) : (
        <Eye className="size-4" />
      )}
    </button>
  ) : null

  const effectiveLeftIcon = loading ? (
    <Loader2 className="size-4 animate-spin text-muted-foreground" />
  ) : (
    leftIcon
  )
  const effectiveRightIcon = isPassword ? passwordToggle : rightIcon

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select-all on number focus so typing replaces the value.
    if (type === "number") e.target.select()
    onFocus?.(e)
  }

  const isInputGroup = Boolean(startItem || endItem)

  const focusRing =
    "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
  const invalidRing =
    "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-destructive/20 dark:aria-[invalid=true]:ring-destructive/40"

  const bareInput = (
    <input
      id={inputId}
      type={type}
      ref={ref as React.Ref<HTMLInputElement>}
      disabled={disabled}
      aria-invalid={error}
      aria-describedby={describedBy}
      onFocus={handleFocus}
      className={cn(
        "w-full min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm",
        // standalone vs. inside a group
        isInputGroup
          ? "h-full border-0 py-1 focus-visible:ring-0"
          : cn(
              "rounded-lg border border-input px-3 py-1 transition-colors",
              bgClass,
              size === "default" ? "h-9" : "h-8",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              "disabled:opacity-50",
              "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
              effectiveLeftIcon && "pl-9",
              effectiveRightIcon && "pr-9",
            ),
        // padding inside group
        isInputGroup && cn(startItem ? "pl-0" : "pl-3", endItem ? "pr-0" : "pr-3"),
        isInputGroup && effectiveLeftIcon && !startItem && "pl-9",
        isInputGroup && effectiveRightIcon && !endItem && "pr-9",
        className,
      )}
      {...inputRest}
    />
  )

  return (
    <div className={cn("space-y-1.5", wrapperClassName)}>
      {label && (
        <FieldLabel
          htmlFor={inputId}
          className={cn(disabled && "text-muted-foreground")}
        >
          {label}
          {Asterisk}
        </FieldLabel>
      )}

      {isInputGroup ? (
        <div
          aria-invalid={error}
          className={cn(
            "flex items-center overflow-hidden rounded-lg border border-input transition-colors",
            bgClass,
            size === "default" ? "h-9" : "h-8",
            focusRing,
            invalidRing,
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {startItem && (
            <div className="flex h-full shrink-0 items-center justify-center border-r border-input bg-muted/40 px-3 text-sm text-muted-foreground [&_svg]:size-4">
              {startItem}
            </div>
          )}
          <div className="relative flex h-full flex-1 items-center">
            {effectiveLeftIcon && (
              <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground [&_svg]:size-4">
                {effectiveLeftIcon}
              </div>
            )}
            {bareInput}
            {effectiveRightIcon && (
              <div className="absolute right-3 z-10 flex items-center">
                {effectiveRightIcon}
              </div>
            )}
          </div>
          {endItem && (
            <div className="flex h-full shrink-0 items-center justify-center border-l border-input bg-muted/40 px-3 text-sm text-foreground [&_svg]:size-4">
              {endItem}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {effectiveLeftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground [&_svg]:size-4">
              {effectiveLeftIcon}
            </div>
          )}
          {bareInput}
          {effectiveRightIcon && (
            <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center">
              {effectiveRightIcon}
            </div>
          )}
        </div>
      )}

      <FieldMessages
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        errorId={errorId}
        helperId={helperId}
      />
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
    </div>
  )
})
