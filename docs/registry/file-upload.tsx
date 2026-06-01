import { FileUpload } from '@/components/custom/file-upload'
import type { ComponentDoc } from './types'

const initialFiles = [
  {
    id: 'intro.zip-1744638436563-8u5xuls',
    name: 'intro.zip',
    size: 252873,
    type: 'application/zip',
    url: 'https://example.com/intro.zip',
  },
  {
    id: 'image-01-123456789',
    name: 'image-01.jpg',
    size: 1528737,
    type: 'image/jpeg',
    url: 'https://picsum.photos/1000/800?grayscale&random=1',
  },
  {
    id: 'audio-123456789',
    name: 'audio.mp3',
    size: 1528737,
    type: 'audio/mpeg',
    url: 'https://example.com/audio.mp3',
  },
]

export const fileUploadDoc: ComponentDoc = {
  slug: 'file-upload',
  name: 'File Upload',
  group: 'Custom',
  description:
    'A batteries-included drag-and-drop uploader with validation, previews, and two layouts: a single-image dropzone and a multi-file card grid. Backed by the headless useFileUpload hook.',
  usage: (
    <>
      <p>
        <code>FileUpload</code> handles the common upload patterns out of the
        box — drag &amp; drop, click-to-browse, size/type validation, object-URL
        previews, and remove/clear actions. Pick a layout with{' '}
        <code>variant</code>:
      </p>
      <ul>
        <li>
          <code>variant="image"</code> — a single-image dropzone that shows the
          picked image as a full-bleed preview with a floating remove button.
        </li>
        <li>
          <code>variant="files"</code> — a multi-file grid of cards with a
          type-aware icon (or image thumbnail), name, and size; always multiple.
        </li>
      </ul>
      <ul>
        <li>
          Constrain uploads with <code>accept</code>, <code>maxSize</code>{' '}
          (bytes), and <code>maxFiles</code>; validation errors surface inline.
        </li>
        <li>
          Seed previously-uploaded items with <code>initialFiles</code> (each
          needs an <code>id</code>, <code>name</code>, <code>size</code>,{' '}
          <code>type</code>, and <code>url</code>).
        </li>
        <li>
          Listen for changes with <code>onFilesChange</code>. For full control
          over markup, drop down to the <code>useFileUpload</code> hook directly.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Single image',
      description: 'A dropzone for one image with an inline preview overlay.',
      render: () => (
        <FileUpload
          className="max-w-md"
          variant="image"
          accept="image/*"
          maxSize={5 * 1024 * 1024}
        />
      ),
      code: `<FileUpload
  variant="image"
  accept="image/*"
  maxSize={5 * 1024 * 1024}
/>`,
    },
    {
      name: 'Multiple files',
      description: 'A grid of file cards with type-aware previews.',
      render: () => (
        <FileUpload
          className="max-w-2xl"
          variant="files"
          accept="*"
          maxFiles={6}
          maxSize={5 * 1024 * 1024}
        />
      ),
      code: `<FileUpload
  variant="files"
  maxFiles={6}
  maxSize={5 * 1024 * 1024}
/>`,
    },
    {
      name: 'With initial files',
      description: 'Seed the uploader with already-uploaded items.',
      render: () => (
        <FileUpload
          className="max-w-2xl"
          variant="files"
          maxFiles={6}
          maxSize={5 * 1024 * 1024}
          initialFiles={initialFiles}
        />
      ),
      code: `const initialFiles = [
  {
    id: 'image-01-123456789',
    name: 'image-01.jpg',
    size: 1528737,
    type: 'image/jpeg',
    url: 'https://picsum.photos/1000/800?grayscale&random=1',
  },
  // ...
]

<FileUpload
  variant="files"
  maxFiles={6}
  initialFiles={initialFiles}
/>`,
    },
    {
      name: 'Disabled',
      render: () => (
        <FileUpload className="max-w-md" variant="image" disabled />
      ),
      code: `<FileUpload variant="image" disabled />`,
    },
  ],
  props: [
    {
      prop: 'variant',
      type: '"image" | "files"',
      default: '"image"',
      description:
        'image = single-image dropzone with preview; files = multi-file card grid.',
    },
    {
      prop: 'accept',
      type: 'string',
      default: '"image/*"',
      description: 'Accepted types, e.g. "image/*" or ".pdf,.png".',
    },
    {
      prop: 'maxSize',
      type: 'number',
      default: '5 * 1024 * 1024',
      description: 'Maximum size per file, in bytes.',
    },
    {
      prop: 'maxFiles',
      type: 'number',
      default: '6',
      description: 'Maximum number of files (files variant).',
    },
    {
      prop: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Allow more than one file. Forced on for the files variant.',
    },
    {
      prop: 'initialFiles',
      type: 'FileMetadata[]',
      description: 'Already-uploaded items to seed the uploader with.',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the dropzone and file input.',
    },
    {
      prop: 'onFilesChange',
      type: '(files: FileWithPreview[]) => void',
      description: 'Called whenever the file list changes.',
    },
    {
      prop: 'className',
      type: 'string',
      description: 'Class for the outer wrapper element.',
    },
  ],
}
