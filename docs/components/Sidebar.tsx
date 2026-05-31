import { cn } from '@/lib/utils'
import { groupedComponents } from '../registry'

export function Sidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Components">
      <a
        href="#/"
        className={cn(
          'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          activeSlug === '' || activeSlug === 'introduction'
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        Introduction
      </a>
      <a
        href="#/charts"
        className={cn(
          'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          activeSlug === 'charts'
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        Charts
      </a>

      {groupedComponents.map(({ group, items }) => (
        <div key={group}>
          <p className="mt-4 mb-1 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {group}
          </p>
          {items.map((c) => (
            <a
              key={c.slug}
              href={`#/${c.slug}`}
              className={cn(
                'block rounded-md px-3 py-1.5 text-sm transition-colors',
                activeSlug === c.slug
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {c.name}
            </a>
          ))}
        </div>
      ))}
    </nav>
  )
}
