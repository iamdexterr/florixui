"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// ============================================================================
// Types
// ============================================================================

export interface CardRadioItem {
  /** Unique value submitted when this card is selected. */
  value: string
  /** Primary label. */
  label: React.ReactNode
  /** Muted text shown inline after the label, e.g. "(Sublabel)". */
  sublabel?: React.ReactNode
  /** Supporting text shown beneath the label. */
  description?: React.ReactNode
  /** Optional leading media — an icon, logo, or small illustration. */
  icon?: React.ReactNode
  /** Disables this individual card. */
  disabled?: boolean
}

export interface CardRadioGroupProps
  extends Omit<React.ComponentProps<typeof RadioGroup>, "children"> {
  /** The cards to render. */
  items: CardRadioItem[]
  /** Place the radio dot on the leading edge instead of the trailing edge. */
  indicatorPosition?: "start" | "end"
  /** Class for each card. */
  cardClassName?: string
}

// ============================================================================
// Card Radio Group
// ============================================================================

/**
 * A radio group whose options are bordered cards, each with an optional icon,
 * a label (+ inline sublabel), and a description. The selected card highlights
 * its border. The whole card is clickable. Control selection with
 * `value`/`onValueChange` or `defaultValue`, like the base RadioGroup.
 */
function CardRadioGroup({
  items,
  indicatorPosition = "end",
  className,
  cardClassName,
  ...props
}: CardRadioGroupProps) {
  const reactId = React.useId()

  return (
    <RadioGroup className={cn("gap-2", className)} {...props}>
      {items.map((item, i) => {
        const id = `${reactId}-${i}`
        const descId = item.description ? `${id}-description` : undefined

        return (
          // The whole card is a <label> so clicking anywhere toggles the radio
          // natively — no overlay hack needed, and the indicator dot stays
          // inside the (relative) radio item.
          <label
            key={item.value}
            htmlFor={id}
            className={cn(
              "flex w-full items-start gap-3 rounded-md border border-input p-4 shadow-xs transition-colors",
              "has-data-[state=checked]:border-primary/50",
              item.disabled
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer",
              cardClassName
            )}
          >
            <RadioGroupItem
              id={id}
              value={item.value}
              disabled={item.disabled}
              aria-describedby={descId}
              className={cn(
                "mt-0.5",
                indicatorPosition === "end" && "order-1"
              )}
            />
            <div className="flex grow items-start gap-3">
              {item.icon && (
                <span className="flex shrink-0 items-center" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <div className="grid grow gap-1.5">
                <span className="text-sm font-medium leading-none">
                  {item.label}
                  {item.sublabel != null && (
                    <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                      {" "}
                      {item.sublabel}
                    </span>
                  )}
                </span>
                {item.description != null && (
                  <p id={descId} className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </label>
        )
      })}
    </RadioGroup>
  )
}

export { CardRadioGroup }
