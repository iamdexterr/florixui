"use client"

import * as React from "react"
import { CheckIcon, PlusCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

// ============================================================================
// Types
// ============================================================================

export interface FacetedFilterOption {
  /** Value stored in the selection. */
  value: string
  /** Visible label. */
  label: string
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Optional count shown on the right (e.g. matching rows). */
  count?: number
}

interface BaseProps {
  /** Trigger label, e.g. "Status". */
  title: string
  options: FacetedFilterOption[]
  /** Placeholder for the search box. Defaults to `title`. */
  searchPlaceholder?: string
  /** Hide the search box (for short lists). */
  searchable?: boolean
  className?: string
}

interface MultiProps extends BaseProps {
  mode?: "multiple"
  /** Selected values. */
  value: string[]
  onChange: (value: string[]) => void
}

interface SingleProps extends BaseProps {
  mode: "single"
  /** Selected value (or null). */
  value: string | null
  onChange: (value: string | null) => void
}

export type FacetedFilterProps = MultiProps | SingleProps

// ============================================================================
// Faceted Filter
// ============================================================================

/**
 * A controlled filter trigger + popover: a searchable list of options, each
 * selectable (multi-select checkboxes by default, or single-select with
 * `mode="single"`). Shows a selected-count badge on the trigger and emits the
 * value(s) via `onChange` — use it to filter your own list or API query.
 */
export function FacetedFilter(props: FacetedFilterProps) {
  const {
    title,
    options,
    searchPlaceholder,
    searchable = true,
    className,
  } = props

  const isMultiple = props.mode !== "single"
  const selectedValues = React.useMemo(
    () =>
      new Set(
        isMultiple
          ? (props.value as string[])
          : props.value
            ? [props.value as string]
            : []
      ),
    [isMultiple, props.value]
  )

  const select = (value: string) => {
    if (isMultiple) {
      const next = new Set(selectedValues)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      ;(props.onChange as (v: string[]) => void)(Array.from(next))
    } else {
      const onChange = props.onChange as (v: string | null) => void
      // Toggle off if re-selecting the same single value.
      onChange(selectedValues.has(value) ? null : value)
    }
  }

  const clear = () => {
    if (isMultiple) (props.onChange as (v: string[]) => void)([])
    else (props.onChange as (v: string | null) => void)(null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-fit border-dashed", className)}
        >
          <PlusCircleIcon />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-0.5 h-4" />
              {/* Only a count — never the selected labels */}
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {selectedValues.size}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <Command>
          {searchable && (
            <CommandInput placeholder={searchPlaceholder ?? title} />
          )}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => select(option.value)}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border",
                        // Square for multi (checkbox), round for single (radio).
                        isMultiple ? "rounded-[4px]" : "rounded-full",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="size-3" />
                    </div>
                    {option.icon && (
                      <span className="text-muted-foreground [&_svg]:size-4">
                        {option.icon}
                      </span>
                    )}
                    <span>{option.label}</span>
                    {option.count != null && (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs text-muted-foreground">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clear}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
