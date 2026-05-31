import * as React from "react"
import { Calendar as CalendarIcon, ChevronDown, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  buildISOFromTz,
  DEFAULT_PRESETS,
  formatDisplayRange,
  isoToTzParts,
  presetToRange,
  type TimePreset,
  type TimeRange,
} from "./date-time-range-picker-utils"

// Re-export the public types (type-only keeps this a component-only module;
// the value helpers presetToRange/navigateRange are exported from the barrel).
export type {
  TimePreset,
  TimeRange,
} from "./date-time-range-picker-utils"

export interface DateTimeRangePickerProps {
  value: TimeRange
  onChange: (range: TimeRange) => void
  className?: string
  timezone?: string
  presets?: { value: TimePreset; label: string }[]
  maxRangeDays?: number
}

// ============================================================================
// TimeInput — clamps and zero-pads on blur
// ============================================================================

function TimeInput({
  value,
  max,
  onChange,
}: {
  value: string
  max: number
  onChange: (v: string) => void
}) {
  const [local, setLocal] = React.useState(value)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocal(value)
  }, [value])

  const commit = (raw: string) => {
    const n = Math.min(Math.max(0, parseInt(raw || "0", 10)), max)
    const padded = isNaN(n) ? "00" : String(n).padStart(2, "0")
    setLocal(padded)
    onChange(padded)
  }

  const step = (delta: number) => {
    const n = Math.min(Math.max(parseInt(local || "0", 10) + delta, 0), max)
    const padded = String(n).padStart(2, "0")
    setLocal(padded)
    onChange(padded)
  }

  return (
    <input
      type="number"
      min={0}
      max={max}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit((e.target as HTMLInputElement).value)
        if (e.key === "ArrowUp") {
          e.preventDefault()
          step(1)
        }
        if (e.key === "ArrowDown") {
          e.preventDefault()
          step(-1)
        }
      }}
      className={cn(
        "h-8 w-12 rounded-md border border-input bg-transparent text-center text-sm font-medium dark:bg-input/30",
        "focus:border-ring focus:ring-3 focus:ring-ring/50 focus:outline-none",
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
      )}
    />
  )
}

// ============================================================================
// DateTimeField — Calendar + time row in a popover (one date+time)
// ============================================================================

function DateTimeField({
  isoValue,
  onChange,
  label,
  placeholder = "Select date & time",
  timezone,
  minDate,
  maxDate,
}: {
  isoValue: string
  onChange: (iso: string) => void
  label: string
  placeholder?: string
  timezone?: string
  minDate?: string
  maxDate?: string
}) {
  const [open, setOpen] = React.useState(false)
  const tz = timezone || "UTC"
  const parsed = isoToTzParts(isoValue, tz)

  const [timeH, setTimeH] = React.useState(parsed?.h ?? "00")
  const [timeM, setTimeM] = React.useState(parsed?.m ?? "00")
  const [timeS, setTimeS] = React.useState(parsed?.s ?? "00")

  // Sync time inputs when the external value changes (intentional prop->state).
  React.useEffect(() => {
    const p = isoToTzParts(isoValue, tz)
    /* eslint-disable react-hooks/set-state-in-effect */
    setTimeH(p?.h ?? "00")
    setTimeM(p?.m ?? "00")
    setTimeS(p?.s ?? "00")
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [isoValue, tz])

  const selectedDate = parsed
    ? new Date(parsed.year, parsed.month, parsed.day)
    : undefined

  const emit = (
    year: number,
    month: number,
    day: number,
    h: string,
    m: string,
    s: string,
  ) => onChange(buildISOFromTz(year, month, day, h, m, s, tz))

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return
    emit(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      timeH,
      timeM,
      timeS,
    )
  }

  const handleTime = (which: "h" | "m" | "s", v: string) => {
    const h = which === "h" ? v : timeH
    const m = which === "m" ? v : timeM
    const s = which === "s" ? v : timeS
    if (which === "h") setTimeH(v)
    if (which === "m") setTimeM(v)
    if (which === "s") setTimeS(v)
    if (parsed) emit(parsed.year, parsed.month, parsed.day, h, m, s)
  }

  const disabledMatcher = (date: Date) => {
    if (minDate) {
      const min = new Date(minDate)
      min.setHours(0, 0, 0, 0)
      if (date < min) return true
    }
    if (maxDate) {
      const max = new Date(maxDate)
      max.setHours(23, 59, 59, 999)
      if (date > max) return true
    }
    return false
  }

  const displayValue = parsed
    ? new Date(isoValue).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: tz,
      })
    : placeholder

  return (
    <div className="flex flex-col gap-1">
      <label className="px-0.5 text-xs text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-8 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors outline-none dark:bg-input/30",
              "hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              open && "border-ring ring-3 ring-ring/50",
              !parsed && "text-muted-foreground",
            )}
          >
            <span className="truncate">{displayValue}</span>
            <CalendarIcon className="size-3.5 shrink-0 opacity-60" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelectDate}
            disabled={disabledMatcher}
            defaultMonth={selectedDate}
            autoFocus
          />
          <div className="flex items-center gap-2 border-t px-3 py-2.5">
            <Clock className="size-4 shrink-0 text-muted-foreground" />
            <TimeInput value={timeH} max={23} onChange={(v) => handleTime("h", v)} />
            <span className="text-sm font-medium text-muted-foreground">:</span>
            <TimeInput value={timeM} max={59} onChange={(v) => handleTime("m", v)} />
            <span className="text-sm font-medium text-muted-foreground">:</span>
            <TimeInput value={timeS} max={59} onChange={(v) => handleTime("s", v)} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// ============================================================================
// DateTimeRangePicker
// ============================================================================

export const DateTimeRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateTimeRangePickerProps
>(function DateTimeRangePicker(
  { value, onChange, className, timezone, presets: customPresets, maxRangeDays },
  ref,
) {
  const activePresets = customPresets ?? DEFAULT_PRESETS
  const [open, setOpen] = React.useState(false)
  const [customFrom, setCustomFrom] = React.useState(value.from)
  const [customTo, setCustomTo] = React.useState(value.to)

  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setCustomFrom(value.from)
    setCustomTo(value.to)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [value])

  const handleCustomFromChange = (iso: string) => {
    setCustomFrom(iso)
    if (maxRangeDays && iso) {
      const maxTo = new Date(
        new Date(iso).getTime() + maxRangeDays * 86_400_000,
      )
      if (new Date(customTo) > maxTo) setCustomTo(maxTo.toISOString())
    }
  }

  const handlePreset = (preset: TimePreset) => {
    onChange({ preset, ...presetToRange(preset) })
    setOpen(false)
  }

  const handleCustomApply = () => {
    if (!customFrom || !customTo) return
    const from = customFrom <= customTo ? customFrom : customTo
    const to = customFrom <= customTo ? customTo : customFrom
    onChange({ preset: null, from, to })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          className={cn(
            "flex h-9 items-center justify-between gap-1.5 rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors outline-none dark:bg-input/30",
            "hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            open && "border-ring ring-3 ring-ring/50",
            className,
          )}
        >
          <CalendarIcon className="size-3.5 shrink-0 opacity-60" />
          <span className="truncate">{formatDisplayRange(value, timezone)}</span>
          <ChevronDown
            className={cn(
              "size-3.5 shrink-0 opacity-60 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={4} className="w-auto p-0">
        <div className="flex min-w-60 flex-col">
          {/* Presets */}
          <div className="border-b p-2">
            <p className="mb-2 px-0.5 text-sm text-muted-foreground">Presets</p>
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${activePresets.length}, minmax(0, 1fr))`,
              }}
            >
              {activePresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handlePreset(preset.value)}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors",
                    value.preset === preset.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent/50 text-foreground hover:bg-accent",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom range */}
          <div className="flex flex-col gap-3 p-2">
            <p className="px-0.5 text-sm text-muted-foreground">Custom range</p>
            <DateTimeField
              isoValue={customFrom}
              onChange={handleCustomFromChange}
              label="From"
              placeholder="Start date & time"
              timezone={timezone}
              maxDate={new Date().toISOString()}
            />
            <DateTimeField
              isoValue={customTo}
              onChange={setCustomTo}
              label="To"
              placeholder="End date & time"
              timezone={timezone}
              minDate={customFrom || undefined}
              maxDate={(() => {
                const now = new Date().toISOString()
                if (maxRangeDays && customFrom) {
                  const fromPlusMax = new Date(
                    new Date(customFrom).getTime() + maxRangeDays * 86_400_000,
                  ).toISOString()
                  return fromPlusMax < now ? fromPlusMax : now
                }
                return now
              })()}
            />
            <Button
              type="button"
              size="sm"
              className="w-full"
              disabled={!customFrom || !customTo}
              onClick={handleCustomApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
})
