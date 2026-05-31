import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_THEME, themes } from '../themes'

const STORAGE_KEY = 'docs-color-theme'
const validSlugs = new Set(themes.map((t) => t.slug))

function getInitialTheme(): string {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && validSlugs.has(stored)) return stored
  return DEFAULT_THEME
}

/** Manages the active color theme via the `data-theme` attribute on <html>. */
export function useTheme() {
  const [theme, setThemeState] = useState<string>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((slug: string) => {
    if (validSlugs.has(slug)) setThemeState(slug)
  }, [])

  return { theme, setTheme }
}
