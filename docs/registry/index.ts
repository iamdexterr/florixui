import type { ComponentDoc } from './types'

import { actionsMenuDoc } from './actions-menu'
import { advancedInputDoc } from './advanced-input'
import { advancedSelectDoc } from './advanced-select'
import { cardRadioGroupDoc } from './card-radio-group'
import { colorsDoc } from './colors'
import { customTabsDoc } from './custom-tabs'
import { dataTableDoc } from './data-table'
import { dateTimeRangePickerDoc } from './date-time-range-picker'
import { fileUploadDoc } from './file-upload'
import { formDialogDoc } from './form-dialog'
import { mapDoc } from './map'
import { sideSheetDoc } from './side-sheet'
import { stepperDoc } from './stepper'
import { timelineDoc } from './timeline'
import { alertDialogDoc } from './alert-dialog'
import { alertDoc } from './alert'
import { badgeDoc } from './badge'
import { buttonGroupDoc } from './button-group'
import { buttonDoc } from './button'
import { calendarDoc } from './calendar'
import { cardDoc } from './card'
import { chartDoc } from './chart'
import { checkboxDoc } from './checkbox'
import { commandDoc } from './command'
import { dialogDoc } from './dialog'
import { dropdownMenuDoc } from './dropdown-menu'
import { fieldDoc } from './field'
import { hoverCardDoc } from './hover-card'
import { inputGroupDoc } from './input-group'
import { inputDoc } from './input'
import { itemDoc } from './item'
import { labelDoc } from './label'
import { popoverDoc } from './popover'
import { progressDoc } from './progress'
import { radioGroupDoc } from './radio-group'
import { selectDoc } from './select'
import { separatorDoc } from './separator'
import { sheetDoc } from './sheet'
import { sliderDoc } from './slider'
import { sonnerDoc } from './sonner'
import { spinnerDoc } from './spinner'
import { switchDoc } from './switch'
import { tableDoc } from './table'
import { tabsDoc } from './tabs'
import { textareaDoc } from './textarea'
import { toggleGroupDoc } from './toggle-group'
import { toggleDoc } from './toggle'
import { tooltipDoc } from './tooltip'

export type { ComponentDoc, Example, PropDoc } from './types'

/** Every documented component. */
export const components: ComponentDoc[] = [
  actionsMenuDoc,
  advancedInputDoc,
  advancedSelectDoc,
  cardRadioGroupDoc,
  colorsDoc,
  customTabsDoc,
  dataTableDoc,
  dateTimeRangePickerDoc,
  fileUploadDoc,
  formDialogDoc,
  mapDoc,
  sideSheetDoc,
  stepperDoc,
  timelineDoc,
  alertDoc,
  alertDialogDoc,
  badgeDoc,
  buttonDoc,
  buttonGroupDoc,
  calendarDoc,
  cardDoc,
  chartDoc,
  checkboxDoc,
  commandDoc,
  dialogDoc,
  dropdownMenuDoc,
  fieldDoc,
  hoverCardDoc,
  inputDoc,
  inputGroupDoc,
  itemDoc,
  labelDoc,
  popoverDoc,
  progressDoc,
  radioGroupDoc,
  selectDoc,
  separatorDoc,
  sheetDoc,
  sliderDoc,
  sonnerDoc,
  spinnerDoc,
  switchDoc,
  tableDoc,
  tabsDoc,
  textareaDoc,
  toggleDoc,
  toggleGroupDoc,
  tooltipDoc,
]

const GROUP_ORDER = [
  'Custom',
  'Forms',
  'Display',
  'Overlays',
  'Navigation',
  'Layout',
]

/** Components grouped for the sidebar, in a stable order. */
export const groupedComponents: { group: string; items: ComponentDoc[] }[] =
  GROUP_ORDER.map((group) => ({
    group,
    items: components
      .filter((c) => (c.group ?? 'Display') === group)
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.items.length > 0)

export function findComponent(slug: string): ComponentDoc | undefined {
  return components.find((c) => c.slug === slug)
}
