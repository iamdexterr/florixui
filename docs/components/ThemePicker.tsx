import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { themes } from '../themes'

interface ThemePickerProps {
  theme: string
  setTheme: (slug: string) => void
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="inline-block size-3.5 shrink-0 rounded-full ring-1 ring-border"
      style={{ background: color }}
    />
  )
}

export function ThemePicker({ theme, setTheme }: ThemePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = themes.find((t) => t.slug === theme) ?? themes[0]

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        size="sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="gap-2"
      >
        <Swatch color={active.swatch} />
        <span className="hidden sm:inline">{active.label}</span>
        <ChevronDown className="opacity-60" />
      </Button>

      {open ? (
        <div
          role="listbox"
          aria-label="Color theme"
          className="absolute right-0 z-30 mt-2 w-60 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          {themes.map((t) => {
            const selected = t.slug === theme
            return (
              <button
                key={t.slug}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setTheme(t.slug)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                  selected
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted',
                )}
              >
                <Swatch color={t.swatch} />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{t.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {t.note}
                  </span>
                </span>
                {selected ? <Check className="size-4 shrink-0" /> : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
