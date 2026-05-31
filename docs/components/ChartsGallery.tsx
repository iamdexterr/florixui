import { useState, type ReactNode } from 'react'
import { Check, Code, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { chartsByCategory } from '../charts'
import type { ChartSpec } from '../charts/types'

function ChartCard({ spec }: { spec: ChartSpec }) {
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
        <CardTitle className="text-base">{spec.title}</CardTitle>
        {spec.description && (
          <CardDescription>{spec.description}</CardDescription>
        )}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={showCode ? 'Show chart' : 'Show code'}
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
          <pre className="max-h-[260px] overflow-auto rounded-lg bg-muted/40 p-3 text-xs leading-relaxed">
            <code>{spec.code}</code>
          </pre>
        ) : (
          spec.render()
        )}
      </CardContent>
    </Card>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: ReactNode
}) {
  return (
    <li className="flex gap-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {n}
      </span>
      <div className="space-y-1.5">
        <p className="font-medium">{title}</p>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </li>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  )
}

function ChartsGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to use the charts</CardTitle>
        <CardDescription>
          Charts are composed from{' '}
          <a
            href="https://recharts.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            Recharts
          </a>{' '}
          wrapped in the library&apos;s <code>ChartContainer</code>, which
          supplies theme colors, tooltips, and legends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-5">
          <Step n={1} title="Install & import the stylesheet">
            <p className="mb-2">
              <code>recharts</code> ships as a dependency, so installing the
              library is enough. Import the stylesheet once in your app entry.
            </p>
            <CodeBlock>{`npm install florixui

// main.tsx
import "florixui/styles.css"`}</CodeBlock>
          </Step>

          <Step n={2} title="Define a config (labels + colors)">
            <p className="mb-2">
              Each key matches a series&apos; <code>dataKey</code>. Use the theme
              tokens <code>var(--chart-1)</code> … <code>var(--chart-5)</code> so
              colors follow the active theme and dark mode.
            </p>
            <CodeBlock>{`import { type ChartConfig } from "florixui"

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile:  { label: "Mobile",  color: "var(--chart-2)" },
} satisfies ChartConfig`}</CodeBlock>
          </Step>

          <Step n={3} title="Wrap one Recharts chart in ChartContainer">
            <p className="mb-2">
              <code>ChartContainer</code> must wrap exactly one chart. Reference
              each series&apos; color with <code>var(--color-KEY)</code> — it is
              injected from your config.
            </p>
            <CodeBlock>{`import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "florixui"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

<ChartContainer config={chartConfig} className="min-h-[220px] w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile"  fill="var(--color-mobile)"  radius={4} />
  </BarChart>
</ChartContainer>`}</CodeBlock>
          </Step>

          <Step n={4} title="Add a tooltip or legend (optional)">
            <p>
              Use <code>ChartTooltip</code> /{' '}
              <code>ChartLegend</code> with the styled{' '}
              <code>ChartTooltipContent</code> /{' '}
              <code>ChartLegendContent</code> so labels and colors stay
              consistent. Every card below has a copy button — grab any chart as
              a starting point.
            </p>
          </Step>
        </ol>
      </CardContent>
    </Card>
  )
}

export function ChartsGallery() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Charts</h1>
        <p className="text-lg text-muted-foreground">
          A gallery of chart styles built with the <code>Chart</code> wrapper and
          Recharts. Toggle the code button on any card to copy it, and switch
          themes/dark mode above to see the chart colors adapt.
        </p>
      </header>

      <ChartsGuide />

      {chartsByCategory.map(({ category, items }) => (
        <section key={category} className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((spec) => (
              <div
                key={spec.id}
                className={cn(spec.wide && 'md:col-span-2')}
              >
                <ChartCard spec={spec} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
