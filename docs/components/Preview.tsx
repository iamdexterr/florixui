import { useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PreviewProps {
  title?: string
  description?: string
  /** The live, rendered example. */
  children: ReactNode
  /** The source code shown beneath the preview. */
  code: string
}

/** A live preview pane stacked over a copy-able code block. */
export function Preview({ title, description, children, code }: PreviewProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="space-y-3">
      {title ? <h3 className="text-base font-medium">{title}</h3> : null}
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}

      <div className="overflow-hidden rounded-xl border">
        {/* Live preview */}
        <div className="flex min-h-32 items-center justify-center p-8">
          {children}
        </div>

        {/* Code block */}
        <div className="relative border-t bg-muted/40">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Copy code"
            onClick={copy}
            className="absolute top-2 right-2"
          >
            {copied ? <Check /> : <Copy />}
          </Button>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
