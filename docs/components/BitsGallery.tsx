import { useState } from 'react'
import { Check, Code, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { bits } from '../bits/specs'
import type { BitSpec } from '../bits/types'

function BitCard({ spec }: { spec: BitSpec }) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(spec.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base">{spec.name}</CardTitle>
        <CardDescription>{spec.description}</CardDescription>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={showCode ? 'Show preview' : 'Show code'}
            onClick={() => setShowCode((v) => !v)}
            className={cn(showCode && 'bg-muted')}
          >
            <Code />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Copy code"
            onClick={copy}
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showCode ? (
          <pre className="max-h-[300px] overflow-auto rounded-lg bg-muted/40 p-3 text-xs leading-relaxed">
            <code>{spec.code}</code>
          </pre>
        ) : (
          <div className="flex min-h-20 items-center">{spec.render()}</div>
        )}
      </CardContent>
    </Card>
  )
}

export function BitsGallery() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Bits</h1>
        <p className="text-lg text-muted-foreground">
          Small, composable building blocks — the kind you reach for inside cards
          and headers. Each is a real exported component; toggle the code to copy
          its usage.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {bits.map((spec) => (
          <BitCard key={spec.id} spec={spec} />
        ))}
      </div>
    </div>
  )
}
