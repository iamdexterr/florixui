// Pure helpers for DateTimeRangePicker — kept separate from the component file
// so it can fast-refresh cleanly (a component module should only export
// components).

export type TimePreset = "hour" | "day" | "week" | "month"

export interface TimeRange {
  preset: TimePreset | null
  /** ISO datetime: YYYY-MM-DDTHH:mm:ssZ */
  from: string
  /** ISO datetime: YYYY-MM-DDTHH:mm:ssZ */
  to: string
}

export function toISOWithTime(date: Date): string {
  const y = date.getUTCFullYear()
  const mo = String(date.getUTCMonth() + 1).padStart(2, "0")
  const d = String(date.getUTCDate()).padStart(2, "0")
  const h = String(date.getUTCHours()).padStart(2, "0")
  const m = String(date.getUTCMinutes()).padStart(2, "0")
  const s = String(date.getUTCSeconds()).padStart(2, "0")
  return `${y}-${mo}-${d}T${h}:${m}:${s}Z`
}

/** Parse an ISO string into timezone-local parts. */
export function isoToTzParts(iso: string, timezone: string) {
  if (!iso) return null
  const date = new Date(iso)
  if (isNaN(date.getTime())) return null

  const parts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).formatToParts(date)

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value || "0"
  return {
    year: parseInt(get("year"), 10),
    month: parseInt(get("month"), 10) - 1, // 0-indexed
    day: parseInt(get("day"), 10),
    h: get("hour").padStart(2, "0"),
    m: get("minute").padStart(2, "0"),
    s: get("second").padStart(2, "0"),
  }
}

/** Build a UTC ISO string from timezone-local date/time parts. */
export function buildISOFromTz(
  year: number,
  month: number,
  day: number,
  h: string,
  m: string,
  s: string,
  timezone: string,
): string {
  const localMs = Date.UTC(
    year,
    month,
    day,
    parseInt(h),
    parseInt(m),
    parseInt(s),
  )
  const utcDate = new Date(localMs)

  const tzParts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).formatToParts(utcDate)

  const get = (type: string) =>
    parseInt(tzParts.find((p) => p.type === type)?.value || "0", 10)
  const tzMs = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  )

  const offsetMs = tzMs - localMs
  return toISOWithTime(new Date(localMs - offsetMs))
}

export const DEFAULT_PRESETS: { value: TimePreset; label: string }[] = [
  { value: "hour", label: "Hour" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
]

/** Convert a relative preset to a concrete { from, to } ISO range ending now. */
export function presetToRange(preset: TimePreset): {
  from: string
  to: string
} {
  const now = new Date()
  const to = toISOWithTime(now)
  const d = new Date(now)
  switch (preset) {
    case "hour":
      d.setUTCHours(d.getUTCHours() - 1)
      break
    case "day":
      d.setUTCHours(d.getUTCHours() - 24)
      break
    case "week":
      d.setUTCDate(d.getUTCDate() - 7)
      break
    case "month":
      d.setUTCDate(d.getUTCDate() - 30)
      break
  }
  return { from: toISOWithTime(d), to }
}

/** Shift a range backward/forward by its own duration. */
export function navigateRange(
  range: TimeRange,
  direction: "prev" | "next",
): TimeRange {
  const fromMs = new Date(range.from).getTime()
  const toMs = new Date(range.to).getTime()
  const durationMs = toMs - fromMs
  const shift = direction === "prev" ? -durationMs : durationMs
  return {
    preset: range.preset,
    from: toISOWithTime(new Date(fromMs + shift)),
    to: toISOWithTime(new Date(toMs + shift)),
  }
}

export function formatDisplayRange(
  range: TimeRange,
  timezone?: string,
): string {
  if (range.preset) {
    return (
      DEFAULT_PRESETS.find((p) => p.value === range.preset)?.label ??
      range.preset
    )
  }
  if (range.from && range.to) {
    const fmt = (iso: string) =>
      new Date(iso).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone || "UTC",
      })
    return `${fmt(range.from)} – ${fmt(range.to)}`
  }
  return "Select range"
}
