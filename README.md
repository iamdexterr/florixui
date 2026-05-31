# FlorixUI

A React component library built on [shadcn/ui](https://ui.shadcn.com) and [Tailwind CSS v4](https://tailwindcss.com). Ships as a bundled npm package (`florixui`) — install it, import components, import one stylesheet.

**A focused set of components** is included — shadcn/ui primitives (Alert, Alert Dialog, Badge, Button, Button Group, Calendar, Card, Chart, Checkbox, Command, Dialog, Dropdown Menu, Field, Hover Card, Input, Input Group, Item, Label, Popover, Progress, Radio Group, Select, Separator, Sheet, Slider, Sonner, Spinner, Stepper, Switch, Table, Tabs, Textarea, Timeline, Toggle, Toggle Group, Tooltip), plus custom components (Actions Menu, Advanced Input, Advanced Select, Data Table, Date Time Range Picker, Map) — each documented with live examples in the docs site. Browse them with `npm run dev`.

Primitives that are app-specific or pull in extra dependencies (Accordion, Aspect Ratio, Avatar, Breadcrumb, Carousel, Collapsible, Context Menu, Drawer, Empty, Form, Input OTP, Kbd, Menubar, Native Select, Navigation Menu, Pagination, Resizable, Scroll Area, Sidebar, Skeleton) are intentionally not bundled — add them directly with `npx shadcn@latest add <name>` in your app if you need them.


## Install (in a consuming project)

```bash
npm install florixui
```

`react` and `react-dom` (v18+) are peer dependencies — your app already provides them.

## Usage

Import the stylesheet **once** at your app's entry point, then use components anywhere:

```tsx
// main.tsx / App entry
import "florixui/styles.css";
```

```tsx
import { Button } from "florixui";

export function Example() {
  return (
    <div className="flex gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

The `cn()` class-merging helper is also exported:

```tsx
import { cn } from "florixui";
```

### Dark mode

The stylesheet defines a `.dark` variant. Toggle dark mode by adding the `dark`
class to a root element (e.g. `<html class="dark">`).

### Themes

The package ships **5 themes**. Select one by setting `data-theme` on a root
element; the default (no attribute) is `slate-blue`. Themes combine with dark
mode:

```html
<html data-theme="crimson" class="dark">
```

| slug          | look                                  |
| ------------- | ------------------------------------- |
| `slate-blue`  | Calm blue on slate (default) · Inter  |
| `crimson`     | Vivid red · Inter + JetBrains Mono    |
| `terracotta`  | Warm rust · DM Sans family            |
| `indigo`      | Bold indigo · Inter + Merriweather    |
| `azure`       | Bright blue · Inter + JetBrains Mono  |

Each theme references specific fonts but the package does **not** bundle them
(see below) — colors, radius, and shadows all work without the fonts; install
the matching `@fontsource` package if you want a theme's exact typeface.

### Fonts (optional)

To keep `styles.css` a single self-contained file, fonts are **not** bundled.
Each theme's font stack falls back to system fonts, so everything works without
them. To render a theme in its true typeface, install the matching
`@fontsource` package(s) and import them in your app entry. For example, for
the default `slate-blue` theme (Inter):

```bash
npm install @fontsource-variable/inter
```

```tsx
import "@fontsource-variable/inter";
```

Fonts used across the themes: Inter, JetBrains Mono, Roboto Mono, DM Sans,
DM Serif Text, DM Mono, Merriweather, Noto Serif Georgian.

## Developing this library

```bash
npm run docs:dev      # run the documentation site with HMR (default dev server)
npm run docs:build    # build the docs site into dist-docs/
npm run docs:preview  # preview the built docs site
npm run build:lib     # build the publishable package into dist/
npm run lint
```

### Documentation site

The `docs/` directory is a small React app that documents the library. It
imports components straight from source (`@/components/...`), so examples stay
in sync as you build. Each component page shows a **live preview**, the
**source code** (with copy button), a **props/API table**, and **usage notes**.
There's a sidebar for navigation and a light/dark theme toggle.

It is **not** part of the published package — only `dist/` is published.

Everything is driven by `docs/registry.tsx`. To document a new component, add a
`ComponentDoc` entry there:

```tsx
// docs/registry.tsx
import { Card } from '@/components/ui/card'

export const components: ComponentDoc[] = [
  // ...existing entries
  {
    slug: 'card',
    name: 'Card',
    description: 'A container that groups related content.',
    usage: <p>Use cards to…</p>,
    examples: [
      {
        name: 'Basic',
        render: () => <Card>…</Card>,
        code: `<Card>…</Card>`,
      },
    ],
    props: [
      { prop: 'className', type: 'string', description: 'Extra classes.' },
    ],
  },
]
```

The sidebar, routing (`#/card`), and page layout update automatically.

### Adding components

Add shadcn components, then export them from `src/index.ts` and document them
in `docs/registry.tsx`:

```bash
npx shadcn@latest add card input dialog
```

```ts
// src/index.ts
export { Card, CardHeader, CardContent } from "@/components/ui/card";
```

### Publishing

`prepublishOnly` runs `build:lib` automatically, so:

```bash
npm version patch
npm publish        # add --access public for a public scoped package
```

Only the `dist/` directory is published (see the `files` field in `package.json`).

## How it's built

- **`src/index.ts`** — the package entry; re-exports every public component + util.
- **`src/styles.css`** — the distributable stylesheet; `@source "./components"`
  tells Tailwind to scan components so the compiled CSS contains every utility
  class they use.
- **Vite library mode** (`vite.config.ts`, gated on `LIB_BUILD`) emits the ESM
  bundle with React externalized, plus `.d.ts` files via `vite-plugin-dts`.

<!-- COMPONENTS:START -->

## Components

> Auto-generated from the docs registry. Each component below shows a quick usage snippet; run `npm run dev` for the full interactive docs (every variant + props table).

### Actions Menu

A drop-in "three-dot" overflow menu. Pass a flat list of items (actions, labels, separators) and it renders a kebab-triggered dropdown.

```tsx
<ActionsMenu
  triggerLabel="Open row actions"
  items={[
    { label: "Edit", icon: Pencil },
    { label: "Duplicate", icon: Copy },
    { type: "separator" },
    { label: "Delete", icon: Trash2, destructive: true },
  ]}
/>
```

### Advanced Input

A batteries-included input that bundles label, description, icons, affixes, password toggle, loading, error/helper text, and a textarea mode into one component.

```tsx
<AdvancedInput
  label="Email"
  required
  type="email"
  placeholder="m@example.com"
  helperText="We'll never share your email."
  description="Used for sign-in and notifications."
/>
```

### Advanced Select

A combobox-style select built on Popover + Command with search, multi-select, groups, descriptions, clear, select-all, create-new, infinite scroll, and input-group affixes.

```tsx
const [value, setValue] = React.useState("")

<AdvancedSelect
  options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
  value={value}
  onValueChange={(v) => setValue(v as string)}
  placeholder="Pick a fruit"
  searchable
  clearable
/>
```

### Alert

Displays a short, important message that draws attention without interrupting the user.

```tsx
<Alert>
  <Terminal />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>
```

### Alert Dialog

A modal dialog that interrupts the user with important content and expects a confirm or cancel response before continuing.

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This permanently deletes your account and removes your data from
        our servers. This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">
        Delete account
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Badge

A small label that highlights status, category, or count alongside other content.

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="link">Link</Badge>
```

### Button

Triggers an action or event, such as submitting a form or opening a dialog.

```tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Group

Visually and semantically groups a set of related buttons (or button-like elements) into a single connected control.

```tsx
<ButtonGroup aria-label="Text alignment">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

### Calendar

A date field that lets users view a month grid and select a single day, multiple days, or a range.

```tsx
const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
)
```

### Card

A bordered surface that groups related content and actions into a single container.

```tsx
<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>
      Deploy your new project in one click.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">
      Name your project and choose a region to get started.
    </p>
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

### Chart

A theming and tooltip/legend wrapper around Recharts that maps a config object to CSS color variables for consistent, accessible charts.

```tsx
const chartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(220 70% 50%)' },
  mobile: { label: 'Mobile', color: 'hsl(160 60% 45%)' },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart accessibilityLayer data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
```

### Checkbox

A control that lets the user toggle a single option on or off, or select multiple options from a set.

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm leading-none">
    Accept terms and conditions
  </label>
</div>
```

### Colors

Global semantic accent colors — red, orange, blue, green — each with a foreground pairing and distinct light/dark shades. Independent of the active theme.

```tsx
<div className="bg-red text-red-foreground">…</div>
<div className="bg-orange text-orange-foreground">…</div>
<div className="bg-blue text-blue-foreground">…</div>
<div className="bg-green text-green-foreground">…</div>
```

### Command

A fast, composable command menu with fuzzy search for navigating actions, built on cmdk.

```tsx
<Command className="max-w-md rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Data Table

A simple, column-driven table with the shadcn data-table look: badge cells, row selection, a row-actions menu, and empty/loading states — no sorting/pagination machinery.

```tsx
const columns: DataTableColumn<Section>[] = [
  { key: "header", header: "Header", cell: (r) => <span className="font-medium">{r.header}</span> },
  { key: "type", header: "Section Type", cell: (r) => <Badge variant="outline">{r.type}</Badge> },
  { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
  { key: "target", header: "Target", align: "right", width: "6rem" },
  { key: "limit", header: "Limit", align: "right", width: "6rem" },
  { key: "reviewer", header: "Reviewer" },
]

<DataTable
  data={sections}
  columns={columns}
  getRowId={(r) => r.id}
  selectable
  selectedIds={selected}
  onSelectionChange={setSelected}
  rowActions={(row) => [
    { label: "Edit", icon: Pencil, onSelect: () => edit(row) },
    { type: "separator" },
    { label: "Delete", icon: Trash2, destructive: true, onSelect: () => remove(row) },
  ]}
/>
```

### Date Time Range Picker

A time-range picker with quick presets (hour/day/week/month) and a custom From/To selector — each a calendar plus a precise hour:minute:second time row. Timezone-aware, controlled via ISO strings.

```tsx
import { DateTimeRangePicker, presetToRange, type TimeRange } from "florixui"

const [range, setRange] = React.useState<TimeRange>({
  preset: "day",
  ...presetToRange("day"),
})

<DateTimeRangePicker value={range} onChange={setRange} />
```

### Dialog

A modal window overlaid on the page that interrupts the user to require a response, such as a confirmation or a focused form.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Share document</DialogTitle>
      <DialogDescription>
        Anyone with the link will be able to view this document.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Copy link</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dropdown Menu

Displays a menu of actions or options triggered by a button, built on Radix UI with full keyboard and focus support.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Field

Layout primitives that pair a form control with its label, description, and error message in a consistent, accessible structure.

```tsx
<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" placeholder="you@example.com" />
  <FieldDescription>
    We'll only use this to send receipts.
  </FieldDescription>
</Field>
```

### Hover Card

Shows rich preview content in a floating card when the user hovers over or focuses a trigger.

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@shadcn</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <p className="font-medium">@shadcn</p>
    <p className="text-muted-foreground">
      Creator of the component library. Hover to learn more.
    </p>
  </HoverCardContent>
</HoverCard>
```

### Input

A single-line text field for collecting short, free-form user input such as names, emails, or passwords.

```tsx
<Input type="text" placeholder="Enter your name" />
```

### Input Group

Wraps an input or textarea with aligned addons such as icons, text, or buttons to form a single composed control.

```tsx
<InputGroup className="max-w-sm">
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>
```

### Item

A flexible row for displaying a piece of content with optional media, title, description, and actions.

```tsx
<Item variant="outline" className="max-w-md">
  <ItemMedia variant="icon">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </svg>
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Project Atlas</ItemTitle>
    <ItemDescription>Updated 3 minutes ago by Dana.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Open</Button>
  </ItemActions>
</Item>
```

### Label

Renders an accessible caption for a form control, associating text with an input via htmlFor.

```tsx
<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Map

An interactive map built on MapLibre GL (via mapcn), with markers, routes, clustering, and overlays. Uses a free CARTO light basemap by default with no attribution — no API key required.

```tsx
<Map
  viewport={{ center: [-122.4194, 37.7749], zoom: 10 }}
  className="h-[360px] w-full rounded-lg border"
/>
```

### Popover

Displays rich, floating content in a portal, anchored to a trigger and toggled by click.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the size for the selected layer.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

### Progress

Displays an indicator showing the completion progress of a task, such as a download or upload.

```tsx
<Progress value={60} aria-label="Loading" />
```

### Radio Group

A set of checkable buttons where no more than one can be selected at a time.

```tsx
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>
```

### Select

Displays a list of options for the user to pick from, triggered by a button.

```tsx
<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
  </SelectContent>
</Select>
```

### Separator

Visually or semantically divides content, either horizontally or vertically.

```tsx
<div className="w-full max-w-sm">
  <div className="space-y-1">
    <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
    <p className="text-sm text-muted-foreground">
      An open-source UI component library.
    </p>
  </div>
  <Separator className="my-4" />
  <p className="text-sm text-muted-foreground">Built with care.</p>
</div>
```

### Sheet

A panel that slides in from an edge of the screen to show supplementary content or actions without leaving the current page.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Save changes</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Slider

Lets users select a value or range from a continuous track by dragging one or more thumbs.

```tsx
<Slider defaultValue={[50]} max={100} step={1} className="w-72" />
```

### Sonner

An opinionated toast notification system for surfacing brief, non-blocking feedback.

```tsx
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

// Render <Toaster /> once near your app root.
<Toaster />

<Button
  variant="outline"
  onClick={() => toast("Your changes have been saved")}
>
  Show toast
</Button>
```

### Spinner

An animated loading indicator that communicates that content or an action is in progress.

```tsx
<Spinner />
```

### Stepper

A composable stepper (from Origin UI) for multi-step flows — horizontal or vertical, with numbered indicators, titles, descriptions, and an active/completed state.

```tsx
<Stepper defaultValue={2}>
  {steps.map(({ step, title, description }) => (
    <StepperItem key={step} step={step} className="relative flex-1 flex-col!">
      <StepperTrigger className="flex-col gap-3 rounded">
        <StepperIndicator />
        <div className="space-y-0.5 px-2">
          <StepperTitle>{title}</StepperTitle>
          <StepperDescription className="max-sm:hidden">{description}</StepperDescription>
        </div>
      </StepperTrigger>
      {step < steps.length && (
        <StepperSeparator className="-order-1 absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
      )}
    </StepperItem>
  ))}
</Stepper>
```

### Switch

A toggle control that lets the user switch a single setting on or off, applying the change immediately.

```tsx
<div className="flex items-center gap-2">
  <Switch id="airplane" defaultChecked />
  <Label htmlFor="airplane">Airplane mode</Label>
</div>
```

### Table

Displays tabular data in rows and columns, composed from semantic header, body, footer, and caption parts.

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Ada Lovelace</TableCell>
      <TableCell>Engineer</TableCell>
      <TableCell className="text-right">Active</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Alan Turing</TableCell>
      <TableCell>Researcher</TableCell>
      <TableCell className="text-right">Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Tabs

A set of layered sections of content (tab panels) where only one panel is shown at a time.

```tsx
<Tabs defaultValue="account" className="w-[360px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p className="text-muted-foreground">Make changes to your account here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p className="text-muted-foreground">Change your password here.</p>
  </TabsContent>
</Tabs>
```

### Textarea

A multi-line text input for longer free-form content such as comments, descriptions, or messages.

```tsx
<Textarea placeholder="Type your message here." />
```

### Timeline

A composable timeline (from Origin UI) for sequences of events — vertical or horizontal, with active/completed state, icon or avatar indicators, and an alternating layout.

```tsx
<Timeline defaultValue={3}>
  {items.map((item) => (
    <TimelineItem key={item.id} step={item.id}
      className="group-data-[orientation=vertical]/timeline:ms-10">
      <TimelineHeader>
        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
        <TimelineTitle className="mt-0.5">{item.title}</TimelineTitle>
        <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7">
          <item.icon size={14} />
        </TimelineIndicator>
      </TimelineHeader>
      <TimelineContent>
        {item.description}
        <TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

### Toggle

A two-state button that can be either on or off, toggling the active state when pressed.

```tsx
<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>
```

### Toggle Group

A set of two-state buttons that can be toggled on or off, supporting single or multiple selection.

```tsx
<ToggleGroup type="single" defaultValue="center" variant="outline">
  <ToggleGroupItem value="left" aria-label="Align left">
    Left
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    Center
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    Right
  </ToggleGroupItem>
</ToggleGroup>
```

### Tooltip

Displays a brief, contextual label in a popup when the user hovers or focuses an element.

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

<!-- COMPONENTS:END -->
