import * as React from 'react'
import {
  BuildingIcon,
  CheckIcon,
  CodeIcon,
  CopyIcon,
  CreditCardIcon,
  EyeIcon,
  MailIcon,
  UserIcon,
} from 'lucide-react'

// The file's own source, for the "View code" toggle (Vite ?raw import).
import source from './FormPatternsExample.tsx?raw'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { AdvancedInput } from '@/components/custom/advanced-input'
import { AdvancedSelect } from '@/components/custom/advanced-select'
import { FormDialog } from '@/components/custom/form-dialog'
import { SideSheet } from '@/components/custom/side-sheet'

// ============================================================================
// Shared options
// ============================================================================

const ROLES = [
  { value: 'admin', label: 'Admin', description: 'Full access' },
  { value: 'editor', label: 'Editor', description: 'Can edit content' },
  { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
]

const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'in', label: 'India' },
  { value: 'ae', label: 'United Arab Emirates' },
]

const PLANS = [
  { value: 'starter', label: 'Starter', description: '$9 / month' },
  { value: 'pro', label: 'Pro', description: '$29 / month', badge: 'Popular' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing' },
]

// ============================================================================
// 1) Multi-step wizard inside a FormDialog
// ============================================================================

const WIZARD_STEPS = [
  { step: 1, title: 'Account', description: 'Your details', icon: UserIcon },
  { step: 2, title: 'Company', description: 'About your team', icon: BuildingIcon },
  { step: 3, title: 'Billing', description: 'Plan & payment', icon: CreditCardIcon },
]

// A small state machine for the shared stepped form.
function useWizard() {
  const [step, setStep] = React.useState(1)
  const [plan, setPlan] = React.useState('pro')
  const isFirst = step === 1
  const isLast = step === WIZARD_STEPS.length
  return {
    step,
    setStep,
    plan,
    setPlan,
    isFirst,
    isLast,
    reset: () => setStep(1),
    back: () => setStep((s) => Math.max(1, s - 1)),
    next: () => setStep((s) => Math.min(WIZARD_STEPS.length, s + 1)),
  }
}

type Wizard = ReturnType<typeof useWizard>

/** The stepper indicator row, shared by every container. */
function WizardStepperHeader({ wizard }: { wizard: Wizard }) {
  return (
    <Stepper
      value={wizard.step}
      onValueChange={wizard.setStep}
      className="gap-2"
    >
      {WIZARD_STEPS.map(({ step: s, title, icon: Icon }) => (
        <StepperItem key={s} step={s} className="relative flex-1 flex-col!">
          <StepperTrigger className="w-full flex-col gap-2 rounded">
            <StepperIndicator asChild className="size-9">
              <Icon className="size-4" />
            </StepperIndicator>
            <StepperTitle className="text-xs">{title}</StepperTitle>
          </StepperTrigger>
          {s < WIZARD_STEPS.length && (
            <StepperSeparator className="-order-1 absolute inset-x-0 top-4.5 left-[calc(50%+1.125rem+0.5rem)] m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-2.25rem-1rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
          )}
        </StepperItem>
      ))}
    </Stepper>
  )
}

/** A vertical stepper rail (left side), with a title + description per step. */
function WizardVerticalHeader({ wizard }: { wizard: Wizard }) {
  return (
    <Stepper
      value={wizard.step}
      onValueChange={wizard.setStep}
      orientation="vertical"
      className="w-44 shrink-0"
    >
      {WIZARD_STEPS.map(({ step: s, title, description }) => (
        <StepperItem
          key={s}
          step={s}
          className="relative items-start not-last:flex-1"
        >
          <StepperTrigger className="items-start rounded pb-10 last:pb-0">
            <StepperIndicator />
            <div className="mt-0.5 space-y-0.5 px-2 text-left">
              <StepperTitle>{title}</StepperTitle>
              <StepperDescription>{description}</StepperDescription>
            </div>
          </StepperTrigger>
          {s < WIZARD_STEPS.length && (
            <StepperSeparator className="-order-1 absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
          )}
        </StepperItem>
      ))}
    </Stepper>
  )
}

/** The body for the current step, shared by every container. */
function WizardStepBody({ wizard }: { wizard: Wizard }) {
  if (wizard.step === 1) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <AdvancedInput label="First name" placeholder="Jane" required />
        <AdvancedInput label="Last name" placeholder="Doe" required />
        <AdvancedInput
          className="sm:col-span-2"
          label="Work email"
          type="email"
          leftIcon={<MailIcon />}
          placeholder="jane@acme.co"
          required
        />
        <AdvancedInput
          className="sm:col-span-2"
          label="Password"
          type="password"
          placeholder="••••••••"
          helperText="At least 8 characters."
        />
      </div>
    )
  }

  if (wizard.step === 2) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <AdvancedInput
          className="sm:col-span-2"
          label="Company name"
          placeholder="Acme Inc."
          required
        />
        <AdvancedSelect
          label="Country"
          options={COUNTRIES}
          placeholder="Select a country"
          searchable
        />
        <AdvancedSelect
          label="Your role"
          options={ROLES}
          placeholder="Select a role"
        />
        <AdvancedInput
          as="textarea"
          className="sm:col-span-2"
          label="What does your team do?"
          placeholder="A short description…"
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AdvancedSelect
        label="Plan"
        options={PLANS}
        value={wizard.plan}
        onValueChange={(v) => wizard.setPlan(v as string)}
        placeholder="Choose a plan"
      />
      <AdvancedInput
        label="Card number"
        leftIcon={<CreditCardIcon />}
        placeholder="4242 4242 4242 4242"
      />
      <div className="grid grid-cols-2 gap-4">
        <AdvancedInput label="Expiry" placeholder="MM / YY" />
        <AdvancedInput label="CVC" placeholder="123" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked />
        Email me receipts
      </label>
    </div>
  )
}

/** Back / Cancel / Continue|Finish actions, shared by every container. */
function WizardFooter({
  wizard,
  onCancel,
  onFinish,
  finishLabel = 'Create workspace',
}: {
  wizard: Wizard
  onCancel?: () => void
  onFinish: () => void
  finishLabel?: string
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <Button variant="ghost" disabled={wizard.isFirst} onClick={wizard.back}>
        Back
      </Button>
      <div className="flex gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {wizard.isLast ? (
          <Button onClick={onFinish}>{finishLabel}</Button>
        ) : (
          <Button onClick={wizard.next}>Continue</Button>
        )}
      </div>
    </div>
  )
}

// --- The stepped form in a dialog -------------------------------------------
function WizardDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const wizard = useWizard()
  const close = () => {
    wizard.reset()
    onClose()
  }

  return (
    <FormDialog
      open={open}
      onClose={close}
      title="Create workspace"
      description="A few details to get your team set up."
      footer={
        <WizardFooter wizard={wizard} onCancel={close} onFinish={close} />
      }
    >
      <div className="space-y-6">
        <WizardStepperHeader wizard={wizard} />
        <WizardStepBody wizard={wizard} />
      </div>
    </FormDialog>
  )
}

// --- The same stepped form in a side sheet ----------------------------------
function WizardSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const wizard = useWizard()
  const close = () => {
    wizard.reset()
    onClose()
  }

  return (
    <SideSheet
      open={open}
      onClose={close}
      title="Create workspace"
      description="A few details to get your team set up."
      footer={
        <WizardFooter wizard={wizard} onCancel={close} onFinish={close} />
      }
    >
      <div className="space-y-6">
        <WizardStepperHeader wizard={wizard} />
        <WizardStepBody wizard={wizard} />
      </div>
    </SideSheet>
  )
}

// --- The same stepped form inline on the page -------------------------------
function WizardInline() {
  const wizard = useWizard()

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6 space-y-1">
        <h2 className="text-lg font-medium">Create workspace</h2>
        <p className="text-sm text-muted-foreground">
          The same stepped form, laid out directly on the page.
        </p>
      </div>
      <div className="space-y-6">
        <WizardStepperHeader wizard={wizard} />
        <WizardStepBody wizard={wizard} />
        <div className="border-t pt-4">
          <WizardFooter wizard={wizard} onFinish={wizard.reset} />
        </div>
      </div>
    </div>
  )
}

// --- Vertical stepper: rail on the left, body on the right ------------------
function WizardVerticalDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const wizard = useWizard()
  const close = () => {
    wizard.reset()
    onClose()
  }

  return (
    <FormDialog
      open={open}
      onClose={close}
      title="Create workspace"
      description="A few details to get your team set up."
      className="sm:max-w-3xl"
      footer={
        <WizardFooter wizard={wizard} onCancel={close} onFinish={close} />
      }
    >
      <div className="flex gap-8">
        <WizardVerticalHeader wizard={wizard} />
        <div className="min-w-0 flex-1">
          <WizardStepBody wizard={wizard} />
        </div>
      </div>
    </FormDialog>
  )
}

// --- Vertical stepper, inline on the page -----------------------------------
function WizardVerticalInline() {
  const wizard = useWizard()

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6 space-y-1">
        <h2 className="text-lg font-medium">Create workspace · vertical</h2>
        <p className="text-sm text-muted-foreground">
          A vertical stepper rail beside the step content.
        </p>
      </div>
      <div className="flex gap-8">
        <WizardVerticalHeader wizard={wizard} />
        <div className="min-w-0 flex-1 space-y-6">
          <WizardStepBody wizard={wizard} />
          <div className="border-t pt-4">
            <WizardFooter wizard={wizard} onFinish={wizard.reset} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 2) Simple form inside a SideSheet
// ============================================================================

function MemberSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [role, setRole] = React.useState('editor')
  return (
    <SideSheet
      open={open}
      onClose={onClose}
      title="Invite a member"
      description="They'll get an email to join your workspace."
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Send invite</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <AdvancedInput
          label="Email"
          type="email"
          leftIcon={<MailIcon />}
          placeholder="teammate@acme.co"
          required
        />
        <AdvancedSelect
          label="Role"
          options={ROLES}
          value={role}
          onValueChange={(v) => setRole(v as string)}
          placeholder="Select a role"
        />
        <AdvancedSelect
          label="Teams"
          options={['Design', 'Engineering', 'Marketing', 'Sales']}
          multiple
          placeholder="Add to teams"
          compactMultiple
        />
        <AdvancedInput
          as="textarea"
          label="Personal note"
          placeholder="Welcome to the team!"
          helperText="Optional — included in the invite email."
        />
        <label className="flex items-center justify-between gap-2 rounded-lg border p-3 text-sm">
          <span>
            <span className="font-medium">Make admin</span>
            <span className="block text-xs text-muted-foreground">
              Grants full access to settings and billing.
            </span>
          </span>
          <Switch />
        </label>
      </div>
    </SideSheet>
  )
}

// ============================================================================
// The pattern
// ============================================================================

function FormPatterns() {
  const [wizardOpen, setWizardOpen] = React.useState(false)
  const [wizardSheetOpen, setWizardSheetOpen] = React.useState(false)
  const [wizardVerticalOpen, setWizardVerticalOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [role, setRole] = React.useState('admin')

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Form patterns</h1>
        <p className="text-sm text-muted-foreground">
          Complex and simple forms composed from AdvancedInput, AdvancedSelect,
          and other inputs — in a dialog, a side sheet, and inline on a page.
        </p>
      </div>

      {/* Launchers */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setWizardOpen(true)}>
          Stepper form — dialog
        </Button>
        <Button variant="outline" onClick={() => setWizardSheetOpen(true)}>
          Stepper form — side sheet
        </Button>
        <Button variant="outline" onClick={() => setWizardVerticalOpen(true)}>
          Vertical stepper — dialog
        </Button>
        <Button variant="outline" onClick={() => setSheetOpen(true)}>
          Simple side-sheet form
        </Button>
      </div>

      {/* Inline stepper forms */}
      <WizardInline />
      <WizardVerticalInline />

      {/* Inline page form */}
      <div className="rounded-xl border bg-card p-6">
        <div className="mb-6 space-y-1">
          <h2 className="text-lg font-medium">Profile settings</h2>
          <p className="text-sm text-muted-foreground">
            An inline form laid out directly on the page.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AdvancedInput label="Full name" placeholder="Jane Doe" required />
            <AdvancedInput
              label="Email"
              type="email"
              leftIcon={<MailIcon />}
              placeholder="jane@acme.co"
              required
            />
            <AdvancedSelect
              label="Country"
              options={COUNTRIES}
              placeholder="Select a country"
              searchable
            />
            <AdvancedSelect
              label="Role"
              options={ROLES}
              value={role}
              onValueChange={(v) => setRole(v as string)}
              placeholder="Select a role"
            />
            <AdvancedInput
              startItem="https://"
              label="Website"
              placeholder="acme.co"
              className="sm:col-span-2"
            />
            <AdvancedInput
              as="textarea"
              label="Bio"
              placeholder="Tell us about yourself"
              helperText="Max 200 characters."
              className="sm:col-span-2"
            />
          </div>

          <label className="flex items-center justify-between gap-2 rounded-lg border p-3 text-sm">
            <span>
              <span className="font-medium">Product updates</span>
              <span className="block text-xs text-muted-foreground">
                Occasional emails about new features.
              </span>
            </span>
            <Switch defaultChecked />
          </label>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>

      <WizardDialog open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <WizardSheet
        open={wizardSheetOpen}
        onClose={() => setWizardSheetOpen(false)}
      />
      <WizardVerticalDialog
        open={wizardVerticalOpen}
        onClose={() => setWizardVerticalOpen(false)}
      />
      <MemberSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  )
}

// ============================================================================
// Page wrapper — live preview + "View code" toggle
// ============================================================================

export function FormPatternsExample() {
  const [showCode, setShowCode] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-4">
      {showCode ? (
        <pre className="max-h-[70svh] overflow-auto rounded-xl border bg-muted/40 p-4 text-xs leading-relaxed">
          <code>{source}</code>
        </pre>
      ) : (
        <FormPatterns />
      )}

      {/* Pattern toolbar — at the bottom */}
      <div className="flex items-center justify-between gap-3 border-t pt-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Pattern
          </h2>
          <p className="text-xs text-muted-foreground">
            A multi-step wizard in a dialog, a simple side-sheet form, and an
            inline page form — built from the form components.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode((s) => !s)}
          >
            {showCode ? <EyeIcon /> : <CodeIcon />}
            {showCode ? 'Preview' : 'View code'}
          </Button>
          {showCode && (
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
