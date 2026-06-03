const codeBlock =
  "overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm"
const h2 = "text-xl font-semibold tracking-tight text-foreground"

const GROUPS: { name: string; blurb: string }[] = [
  {
    name: "Custom",
    blurb:
      "Higher-level, batteries-included pieces — data table, advanced input/select, tabs, dialogs, cards, filters, and more.",
  },
  {
    name: "Forms",
    blurb: "Inputs, selects, checkboxes, switches, fields, and labels.",
  },
  {
    name: "Display",
    blurb: "Badges, cards, tables, charts, avatars, and other read-only UI.",
  },
  { name: "Overlays", blurb: "Dialogs, sheets, popovers, tooltips, and menus." },
  { name: "Navigation", blurb: "Tabs, steppers, and command palettes." },
  { name: "Layout", blurb: "Separators and structural primitives." },
]

const THEMES: { slug: string; look: string }[] = [
  { slug: "slate-blue", look: "Calm blue on slate (default) · Inter" },
  { slug: "crimson", look: "Vivid red · Inter + JetBrains Mono" },
  { slug: "terracotta", look: "Warm rust · DM Sans family" },
  { slug: "indigo", look: "Bold indigo · Inter + Merriweather" },
  { slug: "azure", look: "Bright blue · Inter + JetBrains Mono" },
]

export function Introduction() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">FlorixUI</h1>
        <p className="text-lg text-muted-foreground">
          A React component library built on shadcn/ui and Tailwind CSS —
          themeable, accessible, and ready to drop in.
        </p>
      </header>

      <div className="docs-prose space-y-4">
        <p>
          These docs showcase every component with live, interactive examples,
          copy-able code, a props reference, and usage guidance. Pick a
          component from the sidebar to get started, or read the quick guide
          below first.
        </p>

        {/* What's inside ---------------------------------------------------- */}
        <h2 className={h2}>What&rsquo;s inside</h2>
        <p>
          50+ components, grouped in the sidebar by purpose. Everything is built
          on Radix primitives and Tailwind, so it&rsquo;s accessible by default
          and styled entirely through theme tokens.
        </p>
        <div className="not-prose grid gap-3 sm:grid-cols-2">
          {GROUPS.map((g) => (
            <div key={g.name} className="rounded-lg border p-4">
              <div className="font-medium text-foreground">{g.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
            </div>
          ))}
        </div>

        {/* Installation ----------------------------------------------------- */}
        <h2 className={h2}>Installation</h2>
        <pre className={codeBlock}>
          <code>npm install florixui</code>
        </pre>
        <p>
          The only peer dependencies are <code>react</code> and{" "}
          <code>react-dom</code> (v18+). Everything else ships with the package.
        </p>

        {/* Usage ------------------------------------------------------------ */}
        <h2 className={h2}>Usage</h2>
        <p>
          Import the stylesheet <strong>once</strong> at your app&rsquo;s entry
          point, then use components anywhere:
        </p>
        <pre className={codeBlock}>
          <code>{`// main.tsx — app entry, imported once
import "florixui/styles.css";`}</code>
        </pre>
        <pre className={codeBlock}>
          <code>{`import { Button } from "florixui";

export default function App() {
  return (
    <div className="flex gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}`}</code>
        </pre>
        <p>
          The <code>cn()</code> class-merging helper (clsx + tailwind-merge) is
          exported too, for composing your own class names:
        </p>
        <pre className={codeBlock}>
          <code>{`import { cn } from "florixui";

<div className={cn("rounded-md p-2", isActive && "bg-primary/10")} />`}</code>
        </pre>

        {/* Dark mode -------------------------------------------------------- */}
        <h2 className={h2}>Dark mode</h2>
        <p>
          The stylesheet defines a <code>.dark</code> variant. Toggle dark mode
          by adding the <code>dark</code> class to a root element — pair it with
          a library like <code>next-themes</code> to respect the system
          preference.
        </p>
        <pre className={codeBlock}>
          <code>{`<html class="dark">`}</code>
        </pre>
        <p>
          In these docs, use the toggle in the top bar to preview any component
          in light or dark — every example updates live.
        </p>

        {/* Themes ----------------------------------------------------------- */}
        <h2 className={h2}>Themes</h2>
        <p>
          The package ships <strong>5 themes</strong>. Select one by setting{" "}
          <code>data-theme</code> on a root element; the default (no attribute)
          is <code>slate-blue</code>. Themes combine with dark mode, and each is
          a complete set of color, radius, shadow, and font tokens.
        </p>
        <pre className={codeBlock}>
          <code>{`<html data-theme="crimson" class="dark">`}</code>
        </pre>
        <div className="not-prose overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">slug</th>
                <th className="px-4 py-2 font-medium">look</th>
              </tr>
            </thead>
            <tbody>
              {THEMES.map((t) => (
                <tr key={t.slug} className="border-t">
                  <td className="px-4 py-2">
                    <code>{t.slug}</code>
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">{t.look}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Try the <strong>theme picker</strong> in the top bar to switch between
          all five live.
        </p>

        {/* Fonts ------------------------------------------------------------ */}
        <h2 className={h2}>Fonts (optional)</h2>
        <p>
          To keep <code>styles.css</code> a single self-contained file, fonts
          are <strong>not</strong> bundled. Every theme&rsquo;s font stack falls
          back to system fonts, so colors, radius, and shadows all work without
          them. To render a theme in its true typeface, install the matching{" "}
          <code>@fontsource</code> package and import it in your app entry — for
          the default <code>slate-blue</code> theme (Inter):
        </p>
        <pre className={codeBlock}>
          <code>{`npm install @fontsource-variable/inter`}</code>
        </pre>
        <pre className={codeBlock}>
          <code>{`import "@fontsource-variable/inter";`}</code>
        </pre>

        {/* Using these docs ------------------------------------------------- */}
        <h2 className={h2}>Using these docs</h2>
        <ul>
          <li>
            Each component page has a <strong>live preview</strong>, the{" "}
            <strong>source code</strong> (with a copy button), a{" "}
            <strong>props/API table</strong>, and <strong>usage notes</strong>.
          </li>
          <li>
            Examples import components straight from source, so what you see is
            exactly what ships.
          </li>
          <li>
            Use the sidebar to browse by group, and the top bar to switch theme
            and light/dark mode.
          </li>
        </ul>
      </div>
    </article>
  )
}
