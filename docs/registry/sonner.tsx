import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const sonnerDoc: ComponentDoc = {
  slug: 'sonner',
  name: 'Sonner',
  group: 'Overlays',
  description:
    'An opinionated toast notification system for surfacing brief, non-blocking feedback.',
  usage: (
    <>
      <p>
        Render a single <code><Toaster /></code> once near the root of your
        app, then call the imperative <code>toast()</code> function (imported from{' '}
        <code>sonner</code>) from anywhere to push notifications. The styled{' '}
        <code>Toaster</code> exported from <code>@/components/ui/sonner</code>{' '}
        follows the active theme via <code>next-themes</code> and ships preset
        icons for the success, info, warning, error, and loading variants.
      </p>
      <ul>
        <li>
          Mount exactly one <code><Toaster /></code> per app; mounting
          several causes duplicate toasts.
        </li>
        <li>
          Use toasts for transient, non-critical feedback. Don&apos;t put
          information the user must act on or read carefully in a toast.
        </li>
        <li>
          Prefer <code>toast.success</code> / <code>toast.error</code> over color
          alone so the meaning is conveyed by the icon and text, not just hue.
        </li>
        <li>
          Keep messages short; for longer flows pair a toast with a{' '}
          <code>description</code> and an optional <code>action</code> button.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic toast',
      description:
        'Mount the Toaster once, then call toast() to show a message.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Toaster />
          <Button
            variant="outline"
            onClick={() => toast('Your changes have been saved')}
          >
            Show toast
          </Button>
        </div>
      ),
      code: `import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

// Render <Toaster /> once near your app root.
<Toaster />

<Button
  variant="outline"
  onClick={() => toast("Your changes have been saved")}
>
  Show toast
</Button>`,
    },
    {
      name: 'Status variants',
      description: 'Built-in variants render with their preset icons.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Toaster />
          <Button
            variant="outline"
            onClick={() => toast.success('Profile updated')}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error('Something went wrong')}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning('Storage almost full')}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info('A new version is available')}
          >
            Info
          </Button>
        </div>
      ),
      code: `<Toaster />

<Button variant="outline" onClick={() => toast.success("Profile updated")}>
  Success
</Button>
<Button variant="outline" onClick={() => toast.error("Something went wrong")}>
  Error
</Button>
<Button variant="outline" onClick={() => toast.warning("Storage almost full")}>
  Warning
</Button>
<Button variant="outline" onClick={() => toast.info("A new version is available")}>
  Info
</Button>`,
    },
    {
      name: 'Description and action',
      description:
        'Add a secondary line and an actionable button to the toast.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Toaster />
          <Button
            variant="outline"
            onClick={() =>
              toast('Event created', {
                description: 'Friday, May 29 at 9:00 AM',
                action: {
                  label: 'Undo',
                  onClick: () => toast('Event removed'),
                },
              })
            }
          >
            Show with action
          </Button>
        </div>
      ),
      code: `<Toaster />

<Button
  variant="outline"
  onClick={() =>
    toast("Event created", {
      description: "Friday, May 29 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => toast("Event removed"),
      },
    })
  }
>
  Show with action
</Button>`,
    },
    {
      name: 'Promise toast',
      description:
        'Drive loading, success, and error states from a single promise.',
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Toaster />
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1500)),
                {
                  loading: 'Saving...',
                  success: 'Saved successfully',
                  error: 'Failed to save',
                },
              )
            }
          >
            Save with promise
          </Button>
        </div>
      ),
      code: `<Toaster />

<Button
  variant="outline"
  onClick={() =>
    toast.promise(saveChanges(), {
      loading: "Saving...",
      success: "Saved successfully",
      error: "Failed to save",
    })
  }
>
  Save with promise
</Button>`,
    },
  ],
  props: [
    {
      prop: 'theme',
      type: '"light" | "dark" | "system"',
      default: '"system"',
      description:
        'Color scheme of the toasts. The styled Toaster derives this from next-themes by default.',
    },
    {
      prop: 'position',
      type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
      default: '"bottom-right"',
      description: 'Where toasts are anchored on the screen.',
    },
    {
      prop: 'richColors',
      type: 'boolean',
      default: 'false',
      description: 'Use saturated, status-tinted backgrounds for variant toasts.',
    },
    {
      prop: 'closeButton',
      type: 'boolean',
      default: 'false',
      description: 'Show a close button on each toast.',
    },
    {
      prop: 'expand',
      type: 'boolean',
      default: 'false',
      description: 'Expand the stack to show all toasts at once instead of collapsing them.',
    },
    {
      prop: 'duration',
      type: 'number',
      default: '4000',
      description: 'Default time in milliseconds before a toast auto-dismisses.',
    },
    {
      prop: 'toastOptions',
      type: 'ToastOptions',
      description: 'Default options (class names, styles, duration) applied to every toast.',
    },
    {
      prop: '...props',
      type: 'ToasterProps',
      description: 'All remaining props are forwarded to the underlying sonner Toaster.',
    },
  ],
}
