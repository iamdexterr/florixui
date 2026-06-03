import * as React from 'react'
import { CheckCircle2, Copy, LoaderCircle, Pencil, Trash2 } from 'lucide-react'
import { DataTable, type DataTableColumn } from '@/components/custom/data-table'
import { Badge } from '@/components/ui/badge'
import type { ComponentDoc } from './types'

interface Section {
  id: string
  header: string
  type: string
  status: 'Done' | 'In Process'
  target: number
  limit: number
  reviewer: string
}

const SECTIONS: Section[] = [
  { id: '1', header: 'Cover page', type: 'Cover page', status: 'In Process', target: 18, limit: 5, reviewer: 'Eddie Lake' },
  { id: '2', header: 'Table of contents', type: 'Table of contents', status: 'Done', target: 29, limit: 24, reviewer: 'Eddie Lake' },
  { id: '3', header: 'Executive summary', type: 'Narrative', status: 'Done', target: 10, limit: 13, reviewer: 'Eddie Lake' },
  { id: '4', header: 'Technical approach', type: 'Narrative', status: 'Done', target: 27, limit: 23, reviewer: 'Jamik Tashpulatov' },
  { id: '5', header: 'Design', type: 'Narrative', status: 'In Process', target: 2, limit: 16, reviewer: 'Jamik Tashpulatov' },
  { id: '6', header: 'Capabilities', type: 'Narrative', status: 'In Process', target: 20, limit: 8, reviewer: 'Jamik Tashpulatov' },
]

function StatusBadge({ status }: { status: Section['status'] }) {
  return (
    <Badge variant="outline" className="gap-1.5">
      {status === 'Done' ? (
        <CheckCircle2 className="size-3.5 text-emerald-500" />
      ) : (
        <LoaderCircle className="size-3.5 text-muted-foreground" />
      )}
      {status}
    </Badge>
  )
}

const columns: DataTableColumn<Section>[] = [
  { key: 'header', header: 'Header', cell: (r) => <span className="font-medium">{r.header}</span> },
  {
    key: 'type',
    header: 'Section Type',
    cell: (r) => <Badge variant="outline">{r.type}</Badge>,
  },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  { key: 'target', header: 'Target', align: 'right', width: '6rem' },
  { key: 'limit', header: 'Limit', align: 'right', width: '6rem' },
  { key: 'reviewer', header: 'Reviewer' },
]

function SelectableExample() {
  const [selected, setSelected] = React.useState<string[]>(['2', '3'])
  return (
    <div className="w-full space-y-2">
      <DataTable
        data={SECTIONS}
        columns={columns}
        getRowId={(r) => r.id}
        selectable
        selectedIds={selected}
        onSelectionChange={setSelected}
        rowActions={() => [
          { label: 'Edit', icon: Pencil, onSelect: () => {} },
          { label: 'Duplicate', icon: Copy, onSelect: () => {} },
          { type: 'separator' },
          { label: 'Delete', icon: Trash2, destructive: true, onSelect: () => {} },
        ]}
      />
      <p className="text-sm text-muted-foreground">
        {selected.length} of {SECTIONS.length} row(s) selected.
      </p>
    </div>
  )
}

export const dataTableDoc: ComponentDoc = {
  slug: 'data-table',
  name: 'Data Table',
  group: 'Custom',
  description:
    'A simple, column-driven table with the shadcn data-table look: badge cells, row selection, a row-actions menu, and empty/loading states — no sorting/pagination machinery.',
  usage: (
    <>
      <p>
        <code>DataTable</code> trades flexibility for simplicity: describe your{' '}
        <code>columns</code> and pass <code>data</code>. Each column can render a
        custom <code>cell</code> (badges, formatted numbers, links), so you get
        the polished look without wiring up a table library.
      </p>
      <ul>
        <li>
          Provide <code>getRowId</code> when using selection so the selected set
          is stable across re-renders.
        </li>
        <li>
          Selection is controlled via <code>selectedIds</code> +{' '}
          <code>onSelectionChange</code>, or left uncontrolled if you omit them.
        </li>
        <li>
          Pass <code>rowActions(row)</code> to add a trailing kebab menu (uses{' '}
          <code>ActionsMenu</code>).
        </li>
        <li>
          For sorting, filtering, or pagination, compose those around the table
          (sort/slice your <code>data</code> before passing it in).
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'With selection & row actions',
      render: () => <SelectableExample />,
      code: `const columns: DataTableColumn<Section>[] = [
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
/>`,
    },
    {
      name: 'Basic (no selection)',
      render: () => (
        <DataTable data={SECTIONS.slice(0, 3)} columns={columns} getRowId={(r) => r.id} />
      ),
      code: `<DataTable data={sections} columns={columns} getRowId={(r) => r.id} />`,
    },
    {
      name: 'Without striping',
      description: 'Striping is on by default; pass striped={false} to disable it.',
      render: () => (
        <DataTable
          data={SECTIONS}
          columns={columns}
          getRowId={(r) => r.id}
          striped={false}
        />
      ),
      code: `<DataTable data={sections} columns={columns} getRowId={(r) => r.id} striped={false} />`,
    },
    {
      name: 'Sticky header (scrollable)',
      description: 'Constrain the height and the header stays pinned while scrolling.',
      render: () => (
        <DataTable
          data={[...SECTIONS, ...SECTIONS]}
          columns={columns}
          getRowId={(r, i) => `${r.id}-${i}`}
          stickyHeader
          maxHeight="16rem"
        />
      ),
      code: `<DataTable
  data={sections}
  columns={columns}
  getRowId={(r) => r.id}
  stickyHeader
  maxHeight="16rem"
/>`,
    },
    {
      name: 'Pagination',
      description:
        'Client-side pagination with a page-size selector. Selection is preserved across pages. Defaults to 25 per page with options [25, 50, 100, 200].',
      render: () => (
        <DataTable
          data={[...SECTIONS, ...SECTIONS, ...SECTIONS].map((r, i) => ({
            ...r,
            id: `${r.id}-${i}`,
          }))}
          columns={columns}
          getRowId={(r) => r.id}
          selectable
          pagination
          pageSize={5}
          pageSizeOptions={[5, 10, 25]}
        />
      ),
      code: `// Defaults: pageSize={25}, pageSizeOptions={[25, 50, 100, 200]}
<DataTable
  data={sections}
  columns={columns}
  getRowId={(r) => r.id}
  pagination
  // override when needed:
  pageSize={5}
  pageSizeOptions={[5, 10, 25]}
/>`,
    },
    {
      name: 'Empty state',
      render: () => (
        <DataTable
          data={[]}
          columns={columns}
          emptyMessage="No sections yet."
        />
      ),
      code: `<DataTable data={[]} columns={columns} emptyMessage="No sections yet." />`,
    },
    {
      name: 'Loading state',
      render: () => <DataTable data={[]} columns={columns} loading />,
      code: `<DataTable data={[]} columns={columns} loading />`,
    },
  ],
  props: [
    {
      prop: 'columns',
      type: 'DataTableColumn<TRow>[]',
      description:
        'Column config: { key, header?, cell?, align?, width?, className? }.',
    },
    { prop: 'data', type: 'TRow[]', description: 'Row data.' },
    {
      prop: 'getRowId',
      type: '(row, index) => string',
      default: 'index',
      description: 'Stable row id; required for reliable selection.',
    },
    {
      prop: 'selectable',
      type: 'boolean',
      default: 'false',
      description: 'Adds a select-all header + per-row checkboxes.',
    },
    {
      prop: 'selectedIds / onSelectionChange',
      type: 'string[] / (ids) => void',
      description: 'Controlled selection. Omit both for uncontrolled.',
    },
    {
      prop: 'rowActions',
      type: '(row) => ActionsMenuItem[]',
      description: 'Adds a trailing kebab actions menu per row.',
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows a loading row instead of data.',
    },
    {
      prop: 'emptyMessage',
      type: 'ReactNode',
      default: '"No results."',
      description: 'Shown when data is empty.',
    },
    {
      prop: 'pagination',
      type: 'boolean',
      default: 'false',
      description:
        'Enable client-side pagination with a footer of page controls.',
    },
    {
      prop: 'pageSize',
      type: 'number',
      default: '25',
      description: 'Rows per page when pagination is enabled.',
    },
    {
      prop: 'pageSizeOptions',
      type: 'number[]',
      default: '[25, 50, 100, 200]',
      description: 'Rows-per-page options shown in the footer selector.',
    },
    {
      prop: 'striped',
      type: 'boolean',
      default: 'true',
      description: 'Alternating row backgrounds for easier scanning (on by default).',
    },
    {
      prop: 'stickyHeader',
      type: 'boolean',
      default: 'false',
      description: 'Keeps the header visible while the body scrolls.',
    },
    {
      prop: 'maxHeight',
      type: 'string | number',
      description: 'Constrains height and enables vertical scroll (use with stickyHeader).',
    },
    {
      prop: 'onRowClick',
      type: '(row) => void',
      description: 'Makes rows clickable (checkboxes/actions stop propagation).',
    },
  ],
}
