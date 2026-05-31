import { ChartsGallery } from './components/ChartsGallery'
import { ComponentPage } from './components/ComponentPage'
import { Introduction } from './components/Introduction'
import { Sidebar } from './components/Sidebar'
import { ThemePicker } from './components/ThemePicker'
import { ThemeToggle } from './components/ThemeToggle'
import { useHashRoute } from './components/useHashRoute'
import { useTheme } from './components/useTheme'
import { findComponent } from './registry'

export function DocsApp() {
  const slug = useHashRoute()
  const doc = findComponent(slug)
  const { theme, setTheme } = useTheme()

  let content
  if (slug === 'charts') content = <ChartsGallery />
  else if (doc) content = <ComponentPage doc={doc} />
  else content = <Introduction />

  return (
    <div className="min-h-svh">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
        <a href="#/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block size-5 rounded-md bg-primary" />
          <span>UI</span>
          <span className="text-muted-foreground">docs</span>
        </a>
        <div className="flex items-center gap-2">
          <ThemePicker theme={theme} setTheme={setTheme} />
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl gap-10 px-6 py-10">
        {/* Sidebar */}
        <aside className="sticky top-24 hidden h-fit w-48 shrink-0 md:block">
          <Sidebar activeSlug={slug} />
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">{content}</main>
      </div>
    </div>
  )
}
