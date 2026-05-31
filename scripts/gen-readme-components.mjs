/*
 * Generates the "## Components" reference section of README.md from the docs
 * registry files. For each component it emits the name, description, and the
 * first example's code snippet — so the package's README documents usage even
 * without the hosted docs site.
 *
 * Run: node scripts/gen-readme-components.mjs
 * The output is spliced between the <!-- COMPONENTS:START --> / :END markers.
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const registryDir = path.join(root, "docs/registry")
const readmePath = path.join(root, "README.md")

// --- crude-but-targeted extractors (registry files share a fixed shape) -----

/** Grab a top-level `field: '...'` or `field: "..."` (single line). */
function quoted(src, field) {
  const m = src.match(new RegExp(`\\n  ${field}:\\s*(['"])([\\s\\S]*?)\\1`, ""))
  return m ? m[2].trim() : null
}

/** Grab a possibly-multiline `description:` that ends at the next `,\n  <field>`. */
function description(src) {
  // single-line form
  const single = src.match(/\n {2}description:\s*(['"])([\s\S]*?)\1,/)
  if (single) return single[2].replace(/\s+/g, " ").trim()
  // wrapped form: description:\n    'text',
  const wrapped = src.match(/\n {2}description:\s*\n\s*(['"])([\s\S]*?)\1,/)
  return wrapped ? wrapped[2].replace(/\s+/g, " ").trim() : null
}

/** Grab the first example's `code: \`...\`` template literal. */
function firstCode(src) {
  const i = src.indexOf("code: `")
  if (i === -1) return null
  const start = i + "code: `".length
  let out = ""
  for (let j = start; j < src.length; j++) {
    const ch = src[j]
    if (ch === "\\" && src[j + 1] === "`") {
      out += "`"
      j++
      continue
    }
    if (ch === "`") break
    out += ch
  }
  // unescape the common template-literal escapes
  return out.replace(/\\\$\{/g, "${").replace(/\\\\/g, "\\").trim()
}

const files = fs
  .readdirSync(registryDir)
  .filter((f) => f.endsWith(".tsx") && !["index.tsx", "types.tsx"].includes(f))
  .sort()

const entries = []
for (const file of files) {
  const src = fs.readFileSync(path.join(registryDir, file), "utf8")
  const name = quoted(src, "name")
  if (!name) continue
  entries.push({
    name,
    description: description(src) ?? "",
    code: firstCode(src),
  })
}

entries.sort((a, b) => a.name.localeCompare(b.name))

let md = `## Components\n\n`
md += `> Auto-generated from the docs registry. Each component below shows a quick usage snippet; run \`npm run dev\` for the full interactive docs (every variant + props table).\n\n`
for (const e of entries) {
  md += `### ${e.name}\n\n`
  if (e.description) md += `${e.description}\n\n`
  if (e.code) md += "```tsx\n" + e.code + "\n```\n\n"
}

const readme = fs.readFileSync(readmePath, "utf8")
const START = "<!-- COMPONENTS:START -->"
const END = "<!-- COMPONENTS:END -->"
const block = `${START}\n\n${md.trimEnd()}\n\n${END}`

let next
if (readme.includes(START) && readme.includes(END)) {
  next = readme.replace(
    new RegExp(`${START}[\\s\\S]*?${END}`),
    block,
  )
} else {
  next = readme.trimEnd() + "\n\n" + block + "\n"
}

fs.writeFileSync(readmePath, next)
console.log(`Generated ${entries.length} component sections into README.md`)
