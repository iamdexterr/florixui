import type { ComponentDoc } from '../registry/types'
import { Preview } from './Preview'
import { PropsTable } from './PropsTable'

export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{doc.name}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      </header>

      {/* Examples */}
      <div className="space-y-8">
        {doc.examples.map((ex) => (
          <Preview
            key={ex.name}
            title={ex.name}
            description={ex.description}
            code={ex.code}
          >
            {ex.render()}
          </Preview>
        ))}
      </div>

      {/* Usage notes */}
      {doc.usage ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
          <div className="docs-prose">{doc.usage}</div>
        </section>
      ) : null}

      {/* Props / API */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Props</h2>
        <PropsTable props={doc.props} />
      </section>
    </article>
  )
}
