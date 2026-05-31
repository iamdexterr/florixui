import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  Loader2,
  PlusIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
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
import { FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// ============================================================================
// Types
// ============================================================================

export interface AdvancedSelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  image?: string
  disabled?: boolean
  badge?: string
}

export interface AdvancedSelectGroup {
  label: string
  options: AdvancedSelectOption[]
}

// An item the consumer passes in: a plain string, a ready-made option, or an
// arbitrary object resolved through getOptionLabel / getOptionValue.
type RawOption<T> = string | AdvancedSelectOption | T

export interface AdvancedSelectProps<T = AdvancedSelectOption> {
  options?: RawOption<T>[]
  groups?: AdvancedSelectGroup[]
  value?: string | string[] | T | T[]
  onValueChange?: (value: string | string[] | T | T[]) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  multiple?: boolean
  className?: string
  size?: "sm" | "default"
  /** `default` uses the input background; `alt` uses the muted background. */
  variant?: "default" | "alt"
  searchable?: boolean
  clearable?: boolean
  getOptionLabel?: (option: T) => string
  getOptionValue?: (option: T) => string
  renderOptionLabel?: (option: T) => React.ReactNode
  label?: React.ReactNode
  description?: React.ReactNode
  required?: boolean
  onCreateNew?: () => void
  createNewLabel?: string
  loading?: boolean
  /** Show "N selected" instead of badges for multiple selections. */
  compactMultiple?: boolean
  /** Custom formatter for the compact multiple display. */
  formatCompactDisplay?: (selectedValues: T[]) => string
  /** Affix rendered before the trigger (input-group). */
  startItem?: React.ReactNode
  /** Affix rendered after the trigger (input-group). */
  endItem?: React.ReactNode
  /** Max selections allowed in multiple mode. */
  maxSelections?: number
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Load more items for infinite scroll. */
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  /** Allow clearing all selections in multiple mode (no minimum-1). */
  allowEmpty?: boolean
  /** Show a "Select All" option in multiple mode. */
  showSelectAll?: boolean
  /** Field looks normal but the dropdown won't open. */
  readOnly?: boolean
  /** Extra className for the dropdown panel. */
  popoverClassName?: string
}

// ============================================================================
// Helpers
// ============================================================================

function isOptionObject(opt: unknown): opt is AdvancedSelectOption {
  return (
    typeof opt === "object" &&
    opt !== null &&
    "value" in opt &&
    "label" in opt
  )
}

// ============================================================================
// AdvancedSelect
// ============================================================================

export function AdvancedSelect<T = AdvancedSelectOption>({
  options = [],
  groups = [],
  value,
  onValueChange,
  placeholder = "Select option",
  disabled = false,
  error = false,
  errorMessage,
  multiple = false,
  className,
  size = "default",
  variant = "default",
  searchable = false,
  clearable = false,
  getOptionLabel,
  getOptionValue,
  renderOptionLabel,
  label,
  description,
  required = false,
  onCreateNew,
  createNewLabel = "New item",
  loading = false,
  compactMultiple = false,
  formatCompactDisplay,
  startItem,
  endItem,
  maxSelections,
  defaultOpen = false,
  onOpenChange,
  onLoadMore,
  hasNextPage = false,
  isFetchingNextPage = false,
  allowEmpty = false,
  showSelectAll = false,
  readOnly = false,
  popoverClassName,
}: AdvancedSelectProps<T>) {
  const [open, setOpen] = React.useState(defaultOpen)
  const loadMoreCalledRef = React.useRef(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const selectId = React.useId()

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (readOnly && newOpen) return
      setOpen(newOpen)
      onOpenChange?.(newOpen)
      if (newOpen) loadMoreCalledRef.current = false
    },
    [onOpenChange, readOnly],
  )

  const [selectedValues, setSelectedValues] = React.useState<T[]>(
    multiple ? (Array.isArray(value) ? (value as T[]) : value ? [value as T] : []) : [],
  )

  // Keep selectedValues in sync when the controlled `value` prop changes
  // (e.g. the parent resets filters). This is intentional prop->state sync.
  React.useEffect(() => {
    if (multiple) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedValues(
        Array.isArray(value) ? (value as T[]) : value ? [value as T] : [],
      )
    }
  }, [multiple, value])

  React.useEffect(() => {
    if (!isFetchingNextPage) loadMoreCalledRef.current = false
  }, [isFetchingNextPage])

  // ---- label/value resolution ---------------------------------------------

  const getValue = React.useCallback(
    (opt: unknown): string => {
      if (typeof opt === "string") return opt
      if (getOptionValue) return getOptionValue(opt as T)
      if (isOptionObject(opt)) return opt.value
      return String(opt)
    },
    [getOptionValue],
  )

  const getLabel = React.useCallback(
    (opt: unknown): string => {
      if (typeof opt === "string") {
        for (const group of groups) {
          const found = group.options.find((o) => o.value === opt)
          if (found) return found.label
        }
        for (const o of options) {
          if (typeof o === "string") {
            if (o === opt) return o
          } else if (isOptionObject(o) && o.value === opt) {
            return o.label
          }
        }
        return opt
      }
      if (getOptionLabel) return getOptionLabel(opt as T)
      if (isOptionObject(opt)) return opt.label
      return String(opt)
    },
    [getOptionLabel, groups, options],
  )

  const singleValue = React.useMemo(() => {
    if (multiple || !value) return ""
    if (typeof value === "string") return value
    if (Array.isArray(value)) return ""
    return getValue(value)
  }, [multiple, value, getValue])

  const normalizedOptions = React.useMemo<AdvancedSelectOption[]>(() => {
    return options.map((opt) => {
      if (typeof opt === "string") return { value: opt, label: opt }
      if (isOptionObject(opt)) return opt
      return { value: getValue(opt), label: getLabel(opt) }
    })
  }, [options, getLabel, getValue])

  const getOriginalOption = React.useCallback(
    (optionValue: string): T | undefined =>
      options.find((opt) => getValue(opt) === optionValue) as T | undefined,
    [options, getValue],
  )

  const allOptions = React.useMemo<AdvancedSelectOption[]>(() => {
    const opts = [...normalizedOptions]
    groups.forEach((group) => opts.push(...group.options))
    return opts
  }, [normalizedOptions, groups])

  // ---- selection handlers --------------------------------------------------

  const handleSelect = (optionValue: string) => {
    let original: RawOption<T> | undefined = options.find(
      (opt) => getValue(opt) === optionValue,
    )
    if (original === undefined && groups.length > 0) {
      for (const group of groups) {
        const found = group.options.find((opt) => opt.value === optionValue)
        if (found) {
          original = found as RawOption<T>
          break
        }
      }
    }

    if (multiple) {
      const isSelected = selectedValues.some((v) => getValue(v) === optionValue)
      // Enforce max selections silently.
      if (!isSelected && maxSelections && selectedValues.length >= maxSelections) {
        return
      }
      // Enforce minimum-1 silently (unless allowEmpty).
      if (isSelected && selectedValues.length === 1 && !allowEmpty) {
        return
      }
      const newValues = isSelected
        ? selectedValues.filter((v) => getValue(v) !== optionValue)
        : [...selectedValues, original as T]
      setSelectedValues(newValues)
      onValueChange?.(newValues)
    } else {
      onValueChange?.(original as T)
      setOpen(false)
    }
  }

  const isAllSelected =
    multiple &&
    allOptions.length > 0 &&
    allOptions.length === selectedValues.length

  const handleSelectAll = () => {
    if (!multiple) return
    if (isAllSelected) {
      if (allowEmpty) {
        setSelectedValues([])
        onValueChange?.([])
      }
      return
    }
    if (maxSelections && allOptions.length > maxSelections) return
    setSelectedValues(allOptions as unknown as T[])
    onValueChange?.(allOptions as unknown as T[])
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (multiple) {
      setSelectedValues([])
      onValueChange?.([])
    } else {
      onValueChange?.("")
    }
  }

  const handleRemoveValue = (e: React.MouseEvent, valueToRemove: T) => {
    e.stopPropagation()
    if (selectedValues.length === 1 && !allowEmpty) return
    const newValues = selectedValues.filter(
      (v) => getValue(v) !== getValue(valueToRemove),
    )
    setSelectedValues(newValues)
    onValueChange?.(newValues)
  }

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget
      const nearBottom =
        target.scrollHeight - target.scrollTop - target.clientHeight < 100
      if (
        nearBottom &&
        onLoadMore &&
        hasNextPage &&
        !isFetchingNextPage &&
        !loadMoreCalledRef.current
      ) {
        loadMoreCalledRef.current = true
        onLoadMore()
      }
    },
    [onLoadMore, hasNextPage, isFetchingNextPage],
  )

  const hasValue = multiple ? selectedValues.length > 0 : Boolean(singleValue)

  const getDisplayValue = () => {
    if (multiple) return null
    const option = allOptions.find((opt) => opt.value === singleValue)
    return option?.label || placeholder
  }

  const handleLabelClick = () => {
    if (!disabled && !readOnly) {
      triggerRef.current?.focus()
      setOpen(true)
    }
  }

  const isInputGroup = Boolean(startItem || endItem)
  // Badges wrap to multiple rows, so the trigger must grow vertically in
  // multiple (non-compact) mode; otherwise keep a fixed height.
  const canWrapBadges = multiple && !compactMultiple
  const fixedHeight = size === "default" ? "h-9" : "h-7"
  const minHeight = size === "default" ? "min-h-9" : "min-h-7"
  const heightClass = canWrapBadges ? minHeight : fixedHeight
  const bgClass = variant === "alt" ? "bg-muted" : "bg-transparent dark:bg-input/30"

  // ---- shared selected-display + chevron -----------------------------------

  const SelectedDisplay = (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-1.5",
        // Wrapping badges must not be clipped; keep single/compact text clipped.
        canWrapBadges ? "py-1" : "overflow-hidden",
      )}
    >
      {multiple && selectedValues.length > 0 ? (
        compactMultiple ? (
          <span className="min-w-0 truncate">
            {formatCompactDisplay
              ? formatCompactDisplay(selectedValues)
              : `${selectedValues.length} selected`}
          </span>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedValues.map((val, index) => (
              <span
                key={`${getValue(val)}-${index}`}
                className="inline-flex items-center gap-1 rounded-sm bg-primary px-2 py-0.5 text-xs font-normal text-primary-foreground"
              >
                {getLabel(val)}
                {!disabled && (
                  <button
                    type="button"
                    aria-label={`Remove ${getLabel(val)}`}
                    onClick={(e) => handleRemoveValue(e, val)}
                    className="rounded-sm transition-colors hover:bg-primary/80"
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        )
      ) : (
        <span
          className={cn("block min-w-0 truncate", !hasValue && "text-muted-foreground")}
        >
          {getDisplayValue() || placeholder}
        </span>
      )}
    </div>
  )

  const TrailingControls = (
    <div className="flex shrink-0 items-center gap-1">
      {clearable && hasValue && !disabled && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Clear"
          onClick={handleClear}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation()
              handleClear(e as unknown as React.MouseEvent)
            }
          }}
          className="cursor-pointer rounded-sm p-0.5 transition-colors hover:bg-accent"
        >
          <XIcon className="size-3.5" />
        </span>
      )}
      <ChevronDownIcon size={16} className="shrink-0 opacity-60" aria-hidden />
    </div>
  )

  // ---- dropdown list (shared) ----------------------------------------------

  const renderOption = (option: AdvancedSelectOption) => {
    const isSelected = multiple
      ? selectedValues.some((v) => getValue(v) === option.value)
      : singleValue === option.value
    const original = getOriginalOption(option.value)
    return (
      <CommandItem
        key={option.value}
        value={option.value}
        onSelect={() => handleSelect(option.value)}
        disabled={option.disabled}
      >
        {multiple ? (
          <div
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-sm border",
              isSelected ? "border-primary bg-primary" : "border-input",
            )}
          >
            {isSelected && <CheckIcon size={12} className="text-primary-foreground" />}
          </div>
        ) : (
          <div className="flex size-4 shrink-0 items-center justify-center">
            {isSelected && <CheckIcon size={16} className="text-primary" />}
          </div>
        )}
        {(option.icon || option.image) && (
          <div className="flex size-4 shrink-0 items-center justify-center">
            {option.image ? (
              <img
                src={option.image}
                alt={option.label}
                className="size-4 rounded-sm object-cover"
              />
            ) : (
              option.icon
            )}
          </div>
        )}
        <div className="flex flex-1 items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-normal">
              {renderOptionLabel && original
                ? renderOptionLabel(original)
                : option.label}
            </span>
            {option.description && (
              <span className="text-xs leading-snug text-muted-foreground">
                {option.description}
              </span>
            )}
          </div>
          {option.badge && (
            <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {option.badge}
            </span>
          )}
        </div>
      </CommandItem>
    )
  }

  const dropdown = (
    <PopoverContent
      className={cn(
        "w-(--radix-popper-anchor-width) min-w-(--radix-popper-anchor-width) p-0",
        popoverClassName,
      )}
      align="start"
      onOpenAutoFocus={(e) => {
        if (!searchable) e.preventDefault()
      }}
      onWheel={(e) => e.stopPropagation()}
    >
      <Command>
        {searchable && (
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} autoFocus />
        )}
        <CommandList onScroll={handleScroll}>
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {multiple && showSelectAll && allOptions.length > 0 && (
                <>
                  <CommandGroup>
                    <CommandItem
                      value="__select_all__"
                      onSelect={handleSelectAll}
                      className="font-medium"
                    >
                      <div
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                          isAllSelected ? "border-primary bg-primary" : "border-input",
                        )}
                      >
                        {isAllSelected && (
                          <CheckIcon size={12} className="text-primary-foreground" />
                        )}
                      </div>
                      <span>Select all</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}
              <CommandEmpty>No results found.</CommandEmpty>
              {groups.length > 0
                ? groups.map((group, idx) => (
                    <React.Fragment key={group.label}>
                      {idx > 0 && <CommandSeparator />}
                      <CommandGroup heading={group.label}>
                        {group.options.map(renderOption)}
                      </CommandGroup>
                    </React.Fragment>
                  ))
                : <CommandGroup>{normalizedOptions.map(renderOption)}</CommandGroup>}
              {onCreateNew && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => {
                        onCreateNew()
                        setOpen(false)
                      }}
                    >
                      <PlusIcon size={16} className="-ms-1 opacity-60" aria-hidden />
                      {createNewLabel}
                    </Button>
                  </CommandGroup>
                </>
              )}
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-3">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </>
          )}
        </CommandList>
      </Command>
    </PopoverContent>
  )

  // ---- trigger -------------------------------------------------------------

  const Asterisk = required ? (
    <span aria-hidden className="ml-0.5 text-destructive">
      *
    </span>
  ) : null

  return (
    <div className="space-y-1.5">
      {label && (
        <FieldLabel
          htmlFor={selectId}
          onClick={handleLabelClick}
          className={cn("cursor-pointer", disabled && "text-muted-foreground")}
        >
          {label}
          {Asterisk}
        </FieldLabel>
      )}

      {isInputGroup ? (
        <Popover open={open} onOpenChange={handleOpenChange} modal={false}>
          <PopoverTrigger asChild>
            <div
              aria-invalid={error}
              className={cn(
                "flex rounded-md border border-input transition-colors",
                // Wrapping badges grow the row; don't clip them.
                canWrapBadges ? "items-stretch" : "items-center overflow-hidden",
                bgClass,
                heightClass,
                open && "border-ring ring-3 ring-ring/50",
                "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-destructive/20",
                disabled && "pointer-events-none cursor-not-allowed opacity-50",
              )}
            >
              {startItem && (
                <div className="flex h-full shrink-0 items-center justify-center border-r border-input bg-muted/40 px-3 text-sm text-muted-foreground [&_svg]:size-4">
                  {startItem}
                </div>
              )}
              <Button
                id={selectId}
                type="button"
                disabled={disabled}
                ref={triggerRef}
                variant="ghost"
                role="combobox"
                aria-expanded={open}
                onClick={(e) => {
                  if (readOnly) {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
                className={cn(
                  "h-full flex-1 justify-between rounded-none border-0 px-3 py-1 font-normal text-foreground shadow-none hover:bg-transparent focus-visible:ring-0",
                  canWrapBadges ? "items-start" : "items-center",
                  className,
                )}
              >
                {SelectedDisplay}
                {TrailingControls}
              </Button>
              {endItem && (
                <div className="flex h-full shrink-0 items-center justify-center border-l border-input bg-muted/40 px-3 text-sm text-foreground [&_svg]:size-4">
                  {endItem}
                </div>
              )}
            </div>
          </PopoverTrigger>
          {dropdown}
        </Popover>
      ) : (
        <Popover open={open} onOpenChange={handleOpenChange} modal={false}>
          <PopoverTrigger asChild>
            <Button
              id={selectId}
              type="button"
              disabled={disabled}
              ref={triggerRef}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-invalid={error}
              onClick={(e) => {
                if (readOnly) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
              className={cn(
                "h-auto w-full justify-between px-3 py-1 font-normal text-foreground",
                heightClass,
                // Top-align the chevron when badges wrap to multiple rows.
                canWrapBadges ? "items-start" : "items-center",
                bgClass,
                open && "border-ring ring-3 ring-ring/50",
                className,
              )}
            >
              {SelectedDisplay}
              {TrailingControls}
            </Button>
          </PopoverTrigger>
          {dropdown}
        </Popover>
      )}

      {error && errorMessage && (
        <p className="text-xs leading-5 text-destructive">{errorMessage}</p>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}
    </div>
  )
}
