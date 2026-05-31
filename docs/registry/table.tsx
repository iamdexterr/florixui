import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import type { ComponentDoc } from './types'

export const tableDoc: ComponentDoc = {
  slug: 'table',
  name: 'Table',
  group: 'Display',
  description:
    'Displays tabular data in rows and columns, composed from semantic header, body, footer, and caption parts.',
  usage: (
    <>
      <p>
        Compose a table from its parts: wrap rows in <code>TableHeader</code>,{' '}
        <code>TableBody</code>, and optionally <code>TableFooter</code>. Each
        part renders the matching native element (<code>{'<thead>'}</code>,{' '}
        <code>{'<tbody>'}</code>, <code>{'<tfoot>'}</code>), so the output
        stays valid, accessible HTML.
      </p>
      <ul>
        <li>
          Use <code>TableHead</code> for column headers and <code>TableCell</code>{' '}
          for data cells; this maps to <code>{'<th>'}</code> and{' '}
          <code>{'<td>'}</code> for correct screen-reader semantics.
        </li>
        <li>
          Add a <code>TableCaption</code> to describe the table&apos;s contents
          for assistive technology.
        </li>
        <li>
          Mark a row as selected with{' '}
          <code>data-state="selected"</code> to apply the selected
          background style.
        </li>
        <li>
          The table scrolls horizontally on overflow via its container, so it
          stays usable on narrow viewports.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'A simple table with a header and body.',
      render: () => (
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
      ),
      code: `<Table>
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
</Table>`,
    },
    {
      name: 'With caption and footer',
      description:
        'A caption describes the data and a footer summarizes a column.',
      render: () => (
        <Table>
          <TableCaption>Recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV-001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV-002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$400.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ),
      code: `<Table>
  <TableCaption>Recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV-002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell className="text-right">$400.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
    },
    {
      name: 'Selected row',
      description:
        'Use data-state="selected" to highlight a row, e.g. for a selection UI.',
      render: () => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow data-state="selected">
              <TableCell className="font-medium">Ship release</TableCell>
              <TableCell>Grace</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Write docs</TableCell>
              <TableCell>Linus</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Task</TableHead>
      <TableHead>Owner</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell className="font-medium">Ship release</TableCell>
      <TableCell>Grace</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">Write docs</TableCell>
      <TableCell>Linus</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    },
  ],
  props: [
    {
      prop: 'className',
      type: 'string',
      description:
        'Additional classes merged onto the underlying element. Available on every table part.',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"table">',
      description:
        'Native attributes are forwarded to the rendered element. Each sub-component forwards the props of its corresponding HTML element: TableHeader -> <thead>, TableBody -> <tbody>, TableFooter -> <tfoot>, TableRow -> <tr>, TableHead -> <th>, TableCell -> <td>, TableCaption -> <caption>.',
    },
  ],
}
