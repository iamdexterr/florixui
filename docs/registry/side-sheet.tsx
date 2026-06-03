import { useState } from 'react'

import { SideSheet, SideSheetSection } from '@/components/custom/side-sheet'
import { AdvancedInput } from '@/components/custom/advanced-input'
import { AdvancedSelect } from '@/components/custom/advanced-select'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

const EQUATION_TYPES = [
  { value: 'standard', label: 'Standard PID' },
  { value: 'cascade', label: 'Cascade' },
  { value: 'feedforward', label: 'Feed-forward' },
]

const SOURCES = [
  { value: 'sensor-a', label: 'Sensor A' },
  { value: 'sensor-b', label: 'Sensor B' },
  { value: 'setpoint', label: 'Setpoint' },
]

/** A grouped form built from AdvancedInput / AdvancedSelect. */
function ConfigForm() {
  return (
    <>
      <AdvancedInput label="Program name" placeholder="Enter program name" required />
      <AdvancedSelect
        label="PID Equation Type"
        required
        placeholder="Select option"
        options={EQUATION_TYPES}
      />
      <div className="grid grid-cols-2 gap-4">
        <AdvancedInput label="Calculated High Target" variant="alt" placeholder="--.--" disabled />
        <AdvancedInput label="Calculated Low Target" variant="alt" placeholder="--.--" disabled />
      </div>

      <SideSheetSection label="Reading VS Target Settings">
        <div className="grid grid-cols-2 gap-4">
          <AdvancedSelect label="Reading Source" placeholder="Select" options={SOURCES} />
          <AdvancedSelect label="Target Source" placeholder="Select" options={SOURCES} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AdvancedInput label="Deadband" placeholder="0.00" />
          <AdvancedInput label="Offset" placeholder="0.00" />
        </div>
      </SideSheetSection>

      <SideSheetSection label="Error Limits Settings">
        <div className="grid grid-cols-2 gap-4">
          <AdvancedInput label="Error Reading" variant="alt" placeholder="--.--" disabled />
          <AdvancedInput label="Integral Limit Status" variant="alt" placeholder="--.--" disabled />
        </div>
        <AdvancedInput
          as="textarea"
          label="Notes"
          rows={4}
          placeholder="Optional notes"
        />
      </SideSheetSection>
    </>
  )
}

function BackHeaderExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open configuration</Button>
      <SideSheet
        open={open}
        onClose={() => setOpen(false)}
        onBack={() => setOpen(false)}
        floating
        title="PID Equation Program Configuration"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Save</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </>
        }
      >
        <ConfigForm />
      </SideSheet>
    </>
  )
}

function CloseHeaderExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open panel
      </Button>
      <SideSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Filters"
        description="Refine the list below."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Reset
            </Button>
            <Button onClick={() => setOpen(false)}>Apply</Button>
          </>
        }
      >
        <ConfigForm />
      </SideSheet>
    </>
  )
}

export const sideSheetDoc: ComponentDoc = {
  slug: 'side-sheet',
  name: 'Side Sheet',
  group: 'Custom',
  description:
    'A slide-in panel with a pinned header and a sticky footer — the header and footer stay fixed while the body scrolls between them. Ideal for long configuration forms. Controlled via open/onClose.',
  usage: (
    <>
      <p>
        <code>SideSheet</code> wraps the base <code>Sheet</code> with a
        three-row layout: a pinned header, a scrollable body, and a{' '}
        <strong>sticky footer</strong> that never scrolls away. It is{' '}
        <strong>controlled</strong> — drive it with <code>open</code> and{' '}
        <code>onClose</code>.
      </p>
      <ul>
        <li>
          The header shows a close (X) button by default; pass <code>onBack</code>{' '}
          to swap it for a back chevron (e.g. for nested flows).
        </li>
        <li>
          Put actions in <code>footer</code> — they stay pinned to the bottom
          with a top border, however long the body gets.
        </li>
        <li>
          Choose the edge with <code>side</code> (<code>"right"</code> default or{' '}
          <code>"left"</code>), and set <code>notDismissable</code> to disable
          overlay-click and Escape.
        </li>
        <li>
          Set <code>floating</code> to detach the panel from the screen edge —
          inset with a margin, rounded corners, and a shadow.
        </li>
        <li>
          Group related fields with <code>SideSheetSection</code> — a
          divider-labelled <code>bg-secondary</code> panel — for long forms.
        </li>
        <li>
          Always provide a <code>title</code> so assistive tech can announce the
          sheet.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Floating, with form',
      description:
        'A floating panel with a grouped form built from AdvancedInput / AdvancedSelect; the header and Save/Cancel footer stay pinned while the body scrolls.',
      render: () => <BackHeaderExample />,
      code: `function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open configuration</Button>
      <SideSheet
        open={open}
        onClose={() => setOpen(false)}
        onBack={() => setOpen(false)}
        floating
        title="PID Equation Program Configuration"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Save</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </>
        }
      >
        <AdvancedInput label="Program name" placeholder="Enter program name" required />
        <AdvancedSelect label="PID Equation Type" required options={EQUATION_TYPES} />

        <SideSheetSection label="Reading VS Target Settings">
          <div className="grid grid-cols-2 gap-4">
            <AdvancedSelect label="Reading Source" options={SOURCES} />
            <AdvancedSelect label="Target Source" options={SOURCES} />
          </div>
        </SideSheetSection>
      </SideSheet>
    </>
  )
}`,
    },
    {
      name: 'With close button',
      description: 'Default header with an X, a description, and footer actions.',
      render: () => <CloseHeaderExample />,
      code: `<SideSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Filters"
  description="Refine the list below."
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Reset</Button>
      <Button onClick={() => setOpen(false)}>Apply</Button>
    </>
  }
>
  {/* fields... */}
</SideSheet>`,
    },
  ],
  props: [
    {
      prop: 'open',
      type: 'boolean',
      description: 'Whether the sheet is open. Controlled.',
    },
    {
      prop: 'onClose',
      type: '() => void',
      description: 'Called when the sheet requests to close (control, overlay, or Esc).',
    },
    {
      prop: 'title',
      type: 'React.ReactNode',
      description: 'Heading shown in the pinned header.',
    },
    {
      prop: 'description',
      type: 'React.ReactNode',
      description: 'Optional supporting text under the title.',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      description: 'Body content — scrolls between the pinned header and footer.',
    },
    {
      prop: 'footer',
      type: 'React.ReactNode',
      description: 'Sticky footer actions, pinned to the bottom with a top border.',
    },
    {
      prop: 'side',
      type: '"left" | "right"',
      default: '"right"',
      description: 'Which edge the sheet slides in from.',
    },
    {
      prop: 'floating',
      type: 'boolean',
      default: 'false',
      description:
        'Detach the panel from the edge — inset, rounded, and shadowed like a card.',
    },
    {
      prop: 'onBack',
      type: '() => void',
      description: 'Show a back chevron instead of the close button; called on click.',
    },
    {
      prop: 'notDismissable',
      type: 'boolean',
      default: 'false',
      description: 'Disable overlay-click and Escape dismissal.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the sheet content surface (e.g. width overrides).',
    },
  ],
}
