export function Introduction() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Component Library
        </h1>
        <p className="text-lg text-muted-foreground">
          A React component library built on shadcn/ui and Tailwind CSS.
        </p>
      </header>

      <div className="docs-prose space-y-4">
        <p>
          These docs showcase every component with live, interactive examples,
          copy-able code, a props reference, and usage guidance. Pick a
          component from the sidebar to get started.
        </p>

        <p>
          Use the <strong>theme picker</strong> in the top bar to switch between
          the 5 bundled themes, and the toggle beside it for light/dark mode —
          every example updates live. Each theme is a complete set of color,
          radius, shadow, and font tokens.
        </p>

        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <pre className="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm">
          <code>npm install florixui</code>
        </pre>

        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p>Import the stylesheet once, then use components anywhere:</p>
        <pre className="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm">
          <code>{`import "florixui/styles.css";
import { Button } from "florixui";

export default function App() {
  return <Button>Click me</Button>;
}`}</code>
        </pre>
      </div>
    </article>
  )
}
