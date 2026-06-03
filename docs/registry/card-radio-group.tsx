import { CardRadioGroup } from '@/components/custom/card-radio-group'
import type { ComponentDoc } from './types'

const MastercardIcon = (
  <svg aria-hidden="true" height={24} viewBox="0 0 32 24" width={32} xmlns="http://www.w3.org/2000/svg">
    <rect fill="#252525" height="24" rx="4" width="32" />
    <path d="M19.0537 6.49742H12.9282V17.5026H19.0537V6.49742Z" fill="#FF5A00" />
    <path
      d="M13.3359 12C13.3359 9.76408 14.3871 7.77961 16 6.49741C14.8129 5.56408 13.3155 5 11.6822 5C7.81295 5 4.68221 8.13074 4.68221 12C4.68221 15.8693 7.81295 19 11.6822 19C13.3155 19 14.8129 18.4359 16 17.5026C14.3848 16.2385 13.3359 14.2359 13.3359 12Z"
      fill="#EB001B"
    />
    <path
      d="M27.3178 12C27.3178 15.8693 24.1871 19 20.3178 19C18.6845 19 17.1871 18.4359 16 17.5026C17.6333 16.2181 18.6641 14.2359 18.6641 12C18.6641 9.76408 17.6129 7.77961 16 6.49741C17.1848 5.56408 18.6822 5 20.3155 5C24.1871 5 27.3178 8.15113 27.3178 12Z"
      fill="#F79E1B"
    />
  </svg>
)

const VisaIcon = (
  <svg aria-hidden="true" height={24} viewBox="0 0 32 24" width={32} xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#vc-a)">
      <path d="M28 0H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z" fill="#252525" />
      <path d="m15.884 8.262-1.604 7.496h-1.94l1.604-7.496h1.94Z" fill="#fff" />
      <path
        clipRule="evenodd"
        d="M26.207 15.758H28l-1.567-7.496H24.78a.882.882 0 0 0-.826.55l-2.91 6.946h2.037l.404-1.12h2.488l.235 1.12Zm-2.165-2.656 1.021-2.815.587 2.815h-1.608Z"
        fill="#fff"
        fillRule="evenodd"
      />
      <path
        d="M21.144 13.31c.005-1.183-.975-1.698-1.76-2.11-.526-.276-.964-.506-.957-.861.007-.27.263-.555.823-.628.277-.036 1.044-.065 1.913.335l.34-1.59a5.23 5.23 0 0 0-1.815-.331c-1.917 0-3.265 1.018-3.276 2.477-.013 1.08.963 1.681 1.697 2.04.756.368 1.01.604 1.006.932-.005.503-.604.726-1.16.734-.945.015-1.506-.247-1.95-.454l-.042-.02-.352 1.643c.454.208 1.29.39 2.156.398 2.038 0 3.371-1.006 3.377-2.565Z"
        fill="#fff"
      />
      <path
        d="M13.112 8.262 9.97 15.758H7.92L6.374 9.775c-.094-.368-.175-.503-.46-.658-.467-.253-1.237-.49-1.914-.638l.046-.217h3.3c.42 0 .798.28.894.763l.817 4.338 2.018-5.101h2.037Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="vc-a">
        <path d="M0 0h32v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
)

export const cardRadioGroupDoc: ComponentDoc = {
  slug: 'card-radio-group',
  name: 'Card Radio Group',
  group: 'Custom',
  description:
    'A radio group whose options are bordered cards — each with an optional icon, a label (plus inline sublabel), and a description. The whole card is clickable and the selected card highlights its border.',
  usage: (
    <>
      <p>
        <code>CardRadioGroup</code> renders one bordered card per option from an{' '}
        <code>items</code> array instead of composed children. The entire card is
        the click target, and the selected card highlights its border.
      </p>
      <ul>
        <li>
          Each item takes a <code>value</code> and <code>label</code>, plus
          optional <code>sublabel</code>, <code>description</code>,{' '}
          <code>icon</code>, and <code>disabled</code>.
        </li>
        <li>
          Control selection with <code>value</code>/<code>onValueChange</code> or
          the uncontrolled <code>defaultValue</code>, like the base RadioGroup.
        </li>
        <li>
          Move the radio dot to the leading edge with{' '}
          <code>indicatorPosition="start"</code> (defaults to the trailing edge).
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'With icons',
      description: 'Payment-method cards with brand logos, a sublabel, and a description.',
      render: () => (
        <CardRadioGroup
          className="max-w-md"
          defaultValue="mastercard"
          items={[
            {
              value: 'mastercard',
              label: 'Mastercard',
              sublabel: '(•••• 4242)',
              description: 'You can use this card with a label and a description.',
              icon: MastercardIcon,
            },
            {
              value: 'visa',
              label: 'Visa',
              sublabel: '(•••• 1881)',
              description: 'You can use this card with a label and a description.',
              icon: VisaIcon,
            },
          ]}
        />
      ),
      code: `<CardRadioGroup
  defaultValue="mastercard"
  items={[
    {
      value: 'mastercard',
      label: 'Mastercard',
      sublabel: '(•••• 4242)',
      description: 'You can use this card with a label and a description.',
      icon: <MastercardIcon />,
    },
    {
      value: 'visa',
      label: 'Visa',
      sublabel: '(•••• 1881)',
      description: 'You can use this card with a label and a description.',
      icon: <VisaIcon />,
    },
  ]}
/>`,
    },
    {
      name: 'Without icons',
      description: 'Plain cards — label, sublabel, and description only.',
      render: () => (
        <CardRadioGroup
          className="max-w-md"
          defaultValue="starter"
          items={[
            {
              value: 'starter',
              label: 'Starter',
              sublabel: '(Free)',
              description: 'For individuals getting started.',
            },
            {
              value: 'pro',
              label: 'Pro',
              sublabel: '($12/mo)',
              description: 'For growing teams that need more.',
            },
            {
              value: 'enterprise',
              label: 'Enterprise',
              description: 'Custom limits and support.',
              disabled: true,
            },
          ]}
        />
      ),
      code: `<CardRadioGroup
  defaultValue="starter"
  items={[
    { value: 'starter', label: 'Starter', sublabel: '(Free)', description: 'For individuals getting started.' },
    { value: 'pro', label: 'Pro', sublabel: '($12/mo)', description: 'For growing teams that need more.' },
    { value: 'enterprise', label: 'Enterprise', description: 'Custom limits and support.', disabled: true },
  ]}
/>`,
    },
    {
      name: 'Indicator on the left',
      description: 'Move the radio dot to the leading edge.',
      render: () => (
        <CardRadioGroup
          className="max-w-md"
          indicatorPosition="start"
          defaultValue="a"
          items={[
            { value: 'a', label: 'Option A', description: 'The first choice.' },
            { value: 'b', label: 'Option B', description: 'The second choice.' },
          ]}
        />
      ),
      code: `<CardRadioGroup
  indicatorPosition="start"
  defaultValue="a"
  items={[
    { value: 'a', label: 'Option A', description: 'The first choice.' },
    { value: 'b', label: 'Option B', description: 'The second choice.' },
  ]}
/>`,
    },
  ],
  props: [
    {
      prop: 'items',
      type: 'CardRadioItem[]',
      description:
        'Cards to render. Each has value, label, and optional sublabel, description, icon, disabled.',
    },
    {
      prop: 'indicatorPosition',
      type: '"start" | "end"',
      default: '"end"',
      description: 'Which edge the radio dot sits on.',
    },
    {
      prop: 'value',
      type: 'string',
      description: 'Controlled selected value.',
    },
    {
      prop: 'defaultValue',
      type: 'string',
      description: 'Uncontrolled initial selected value.',
    },
    {
      prop: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called when the selection changes.',
    },
    {
      prop: 'cardClassName',
      type: 'string',
      description: 'Class for each card.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the radio group wrapper.',
    },
  ],
}
