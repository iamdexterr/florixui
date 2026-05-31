import * as React from 'react'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'
import { CreditCard, ShoppingCart, Truck } from 'lucide-react'
import type { ComponentDoc } from './types'

const STEPS = [
  { step: 1, title: 'Step One', description: 'Desc for step one' },
  { step: 2, title: 'Step Two', description: 'Desc for step two' },
  { step: 3, title: 'Step Three', description: 'Desc for step three' },
]

const ICON_STEPS = [
  { step: 1, title: 'Cart', icon: ShoppingCart },
  { step: 2, title: 'Payment', icon: CreditCard },
  { step: 3, title: 'Shipping', icon: Truck },
]

function ControlledExample() {
  const [current, setCurrent] = React.useState(1)
  return (
    <div className="space-y-6">
      <Stepper value={current} onValueChange={setCurrent} className="mx-auto max-w-xl gap-4">
        {ICON_STEPS.map(({ step, title, icon: Icon }) => (
          <StepperItem
            key={step}
            step={step}
            className="relative flex-1 flex-col!"
          >
            <StepperTrigger className="w-full flex-col gap-2 rounded">
              <StepperIndicator asChild className="size-9">
                <Icon className="size-4" />
              </StepperIndicator>
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {step < ICON_STEPS.length && (
              <StepperSeparator className="-order-1 absolute inset-x-0 top-4.5 left-[calc(50%+1.125rem+0.5rem)] m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-2.25rem-1rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={current === 1}
          onClick={() => setCurrent((s) => s - 1)}
        >
          Prev
        </Button>
        <Button
          size="sm"
          disabled={current === STEPS.length}
          onClick={() => setCurrent((s) => s + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export const stepperDoc: ComponentDoc = {
  slug: 'stepper',
  name: 'Stepper',
  group: 'Custom',
  description:
    'A composable stepper (from Origin UI) for multi-step flows — horizontal or vertical, with numbered indicators, titles, descriptions, and an active/completed state.',
  usage: (
    <>
      <p>
        <code>Stepper</code> wraps <code>StepperItem</code>s (each with a numeric{' '}
        <code>step</code>). Inside each, <code>StepperTrigger</code> holds the{' '}
        <code>StepperIndicator</code> plus <code>StepperTitle</code> /{' '}
        <code>StepperDescription</code>, and <code>StepperSeparator</code>{' '}
        connects them.
      </p>
      <ul>
        <li>
          <code>defaultValue</code> (or controlled <code>value</code> /{' '}
          <code>onValueChange</code>) sets the active step; earlier steps render
          as <strong>completed</strong> and the active one is highlighted.
        </li>
        <li>
          Set <code>orientation="vertical"</code> for a top-to-bottom stepper;
          the default is horizontal.
        </li>
        <li>
          <code>StepperTrigger</code> is a button, so steps are clickable — wire{' '}
          <code>onValueChange</code> to let users jump between them.
        </li>
        <li>
          Layout (flex sizing, separator positioning) is controlled with utility
          classes on the items/separators — see the examples.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Horizontal with titles & descriptions',
      render: () => (
        <Stepper defaultValue={2} className="mx-auto max-w-xl">
          {STEPS.map(({ step, title, description }) => (
            <StepperItem
              key={step}
              step={step}
              className="relative flex-1 flex-col!"
            >
              <StepperTrigger className="flex-col gap-3 rounded">
                <StepperIndicator />
                <div className="space-y-0.5 px-2">
                  <StepperTitle>{title}</StepperTitle>
                  <StepperDescription className="max-sm:hidden">
                    {description}
                  </StepperDescription>
                </div>
              </StepperTrigger>
              {step < STEPS.length && (
                <StepperSeparator className="-order-1 absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
              )}
            </StepperItem>
          ))}
        </Stepper>
      ),
      code: `<Stepper defaultValue={2}>
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
</Stepper>`,
    },
    {
      name: 'Vertical',
      render: () => (
        <Stepper
          defaultValue={2}
          orientation="vertical"
          className="mx-auto max-w-xs"
        >
          {STEPS.map(({ step, title, description }) => (
            <StepperItem
              key={step}
              step={step}
              className="relative items-start not-last:flex-1"
            >
              <StepperTrigger className="items-start rounded pb-12 last:pb-0">
                <StepperIndicator />
                <div className="mt-0.5 space-y-0.5 px-2 text-left">
                  <StepperTitle>{title}</StepperTitle>
                  <StepperDescription>{description}</StepperDescription>
                </div>
              </StepperTrigger>
              {step < STEPS.length && (
                <StepperSeparator className="-order-1 absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
              )}
            </StepperItem>
          ))}
        </Stepper>
      ),
      code: `<Stepper defaultValue={2} orientation="vertical">
  {steps.map(({ step, title, description }) => (
    <StepperItem key={step} step={step} className="relative items-start not-last:flex-1">
      <StepperTrigger className="items-start rounded pb-12 last:pb-0">
        <StepperIndicator />
        <div className="mt-0.5 space-y-0.5 px-2 text-left">
          <StepperTitle>{title}</StepperTitle>
          <StepperDescription>{description}</StepperDescription>
        </div>
      </StepperTrigger>
      {step < steps.length && (
        <StepperSeparator className="-order-1 absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
      )}
    </StepperItem>
  ))}
</Stepper>`,
    },
    {
      name: 'Controlled, with icons',
      description: 'Icon indicators, driven by your own state via prev / next.',
      render: () => <ControlledExample />,
      code: `const [current, setCurrent] = React.useState(1)
const steps = [
  { step: 1, title: "Cart", icon: ShoppingCart },
  { step: 2, title: "Payment", icon: CreditCard },
  { step: 3, title: "Shipping", icon: Truck },
]

<Stepper value={current} onValueChange={setCurrent} className="gap-4">
  {steps.map(({ step, title, icon: Icon }) => (
    <StepperItem key={step} step={step} className="relative flex-1 flex-col!">
      <StepperTrigger className="w-full flex-col gap-2 rounded">
        <StepperIndicator asChild className="size-9">
          <Icon className="size-4" />
        </StepperIndicator>
        <StepperTitle>{title}</StepperTitle>
      </StepperTrigger>
      {step < steps.length && (
        <StepperSeparator className="-order-1 absolute inset-x-0 top-4.5 left-[calc(50%+1.125rem+0.5rem)] m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-2.25rem-1rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
      )}
    </StepperItem>
  ))}
</Stepper>

<Button onClick={() => setCurrent((s) => s - 1)}>Prev</Button>
<Button onClick={() => setCurrent((s) => s + 1)}>Next</Button>`,
    },
  ],
  props: [
    {
      prop: 'Stepper',
      type: '{ defaultValue?, value?, onValueChange?, orientation? }',
      description:
        'Root. orientation "horizontal" (default) | "vertical"; defaultValue/value set the active step.',
    },
    {
      prop: 'StepperItem',
      type: '{ step: number; completed?: boolean; disabled?: boolean; loading?: boolean }',
      description: 'A single step. Steps before the active value render as completed.',
    },
    {
      prop: 'StepperTrigger',
      type: 'button props',
      description: 'Clickable region for the step (sets the active step on click).',
    },
    {
      prop: 'StepperIndicator',
      type: 'ReactNode',
      description: 'The numbered circle; shows a check when completed.',
    },
    {
      prop: 'StepperSeparator',
      type: '—',
      description: 'The connecting line between steps.',
    },
    {
      prop: 'StepperTitle / StepperDescription',
      type: 'ReactNode',
      description: 'Label and supporting text for the step.',
    },
  ],
}
