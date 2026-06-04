import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BitsGallery } from './components/BitsGallery'
import { ChartsGallery } from './components/ChartsGallery'
import { ComponentPage } from './components/ComponentPage'
import { Introduction } from './components/Introduction'
import { DetailPageExample } from './components/DetailPageExample'
import { ListPageExample } from './components/ListPageExample'
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
  const [navOpen, setNavOpen] = useState(false)

  // Close the mobile drawer whenever the route changes (a link was tapped).
  useEffect(() => {
    setNavOpen(false)
  }, [slug])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [navOpen])

  let content
  if (slug === 'charts') content = <ChartsGallery />
  else if (slug === 'bits') content = <BitsGallery />
  else if (slug === 'list-page') content = <ListPageExample />
  else if (slug === 'detail-page') content = <DetailPageExample />
  else if (doc) content = <ComponentPage doc={doc} />
  else content = <Introduction />

  return (
    <div className="min-h-svh">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-2">
            {/* Mobile nav toggle — hidden on md+ where the sidebar is always shown. */}
            <button
              type="button"
              onClick={() => setNavOpen((o) => !o)}
              aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={navOpen}
              className="-ml-1 inline-flex size-9 items-center justify-center rounded-md hover:bg-muted md:hidden"
            >
              {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <a href="#/" className="flex items-center gap-2 font-semibold">
              <img src="/logo.png" alt="FlorixUI logo" className="size-6" />
              <span>FlorixUI</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ThemePicker theme={theme} setTheme={setTheme} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {navOpen && (
        <div
          className="fixed inset-0 top-14 z-20 bg-black/50 md:hidden"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in sidebar */}
      <aside
        className={`fixed top-14 left-0 z-20 h-[calc(100svh-3.5rem)] w-64 overflow-y-auto border-r bg-background px-6 py-6 transition-transform duration-200 md:hidden ${
          navOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar activeSlug={slug} />
      </aside>

      <div className="mx-auto flex w-full max-w-screen-2xl gap-10 px-6 lg:px-10">
        {/* Desktop sidebar — sticks below the 56px header and scrolls independently. */}
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 overflow-y-auto py-10 md:block">
          <Sidebar activeSlug={slug} />
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 py-10">{content}</main>
      </div>
    </div>
  )
}
