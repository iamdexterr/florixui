"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  ImageUpIcon,
  Trash2Icon,
  UploadIcon,
  VideoIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/lib/use-file-upload"
import { Button } from "@/components/ui/button"

// ============================================================================
// Types
// ============================================================================

export type FileUploadProps = {
  /**
   * `image` renders a single-image dropzone with an inline preview overlay.
   * `files` renders a multi-file grid with per-file cards. Defaults to `image`.
   */
  variant?: "image" | "files"
  /** `accept` attribute, e.g. `"image/*"` or `".pdf,.png"`. */
  accept?: string
  /** Maximum size per file, in bytes. */
  maxSize?: number
  /** Maximum number of files (`files` variant). */
  maxFiles?: number
  /** Allow more than one file. Forced on for the `files` variant. */
  multiple?: boolean
  /** Files to seed the uploader with (already-uploaded items). */
  initialFiles?: FileMetadata[]
  /** Disables the dropzone and hides the file input. */
  disabled?: boolean
  /** Called whenever the file list changes. */
  onFilesChange?: (files: FileWithPreview[]) => void
  /** Class for the outer wrapper element. */
  className?: string
}

type EntryFile = File | FileMetadata

// ============================================================================
// File-type helpers (files variant)
// ============================================================================

const FILE_ICON_MATCHERS: {
  match: (type: string, name: string) => boolean
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    match: (type, name) =>
      type.includes("zip") ||
      type.includes("archive") ||
      name.endsWith(".zip") ||
      name.endsWith(".rar"),
    Icon: FileArchiveIcon,
  },
  { match: (type) => type.includes("audio/"), Icon: HeadphonesIcon },
  {
    match: (type, name) =>
      type.includes("excel") ||
      name.endsWith(".xls") ||
      name.endsWith(".xlsx"),
    Icon: FileSpreadsheetIcon,
  },
  { match: (type) => type.startsWith("image/"), Icon: ImageIcon },
  {
    match: (type, name) =>
      type.includes("pdf") ||
      name.endsWith(".pdf") ||
      type.includes("word") ||
      name.endsWith(".doc") ||
      name.endsWith(".docx"),
    Icon: FileTextIcon,
  },
  { match: (type) => type.includes("video/"), Icon: VideoIcon },
]

function getFileIcon(file: EntryFile) {
  for (const { match, Icon } of FILE_ICON_MATCHERS) {
    if (match(file.type, file.name)) {
      return <Icon className="size-5 opacity-60" />
    }
  }
  return <FileIcon className="size-5 opacity-60" />
}

function FilePreview({ entry }: { entry: FileWithPreview }) {
  const { file } = entry
  const isImage = file.type.startsWith("image/")

  return (
    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit] bg-accent">
      {isImage && entry.preview ? (
        <img
          alt={file.name}
          className="size-full rounded-t-[inherit] object-cover"
          src={entry.preview}
        />
      ) : (
        getFileIcon(file)
      )}
    </div>
  )
}

// ============================================================================
// Component
// ============================================================================

function FileUpload({
  variant = "image",
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  maxFiles = 6,
  multiple,
  initialFiles,
  disabled,
  onFilesChange,
  className,
}: FileUploadProps) {
  const isMulti = variant === "files" ? true : (multiple ?? false)

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept,
    maxSize,
    maxFiles,
    multiple: isMulti,
    initialFiles,
    onFilesChange,
  })

  const maxSizeLabel = formatBytes(maxSize)

  const errorBlock = errors.length > 0 && (
    <div
      className="flex items-center gap-1 text-destructive text-xs"
      role="alert"
    >
      <AlertCircleIcon className="size-3 shrink-0" />
      <span>{errors[0]}</span>
    </div>
  )

  // --- Single image variant -------------------------------------------------
  if (variant === "image") {
    const previewUrl = files[0]?.preview || null
    const firstFile = files[0]

    return (
      <div className={cn("flex w-full flex-col gap-2", className)}>
        <div className="relative">
          <div
            className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-[img]:border-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
            data-dragging={isDragging || undefined}
            onClick={disabled ? undefined : openFileDialog}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            role="button"
            tabIndex={-1}
          >
            <input
              {...getInputProps({ disabled })}
              aria-label="Upload image file"
              className="sr-only"
            />
            {previewUrl ? (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <img
                  alt={firstFile?.file?.name || "Uploaded image"}
                  className="size-full rounded-xl object-cover"
                  src={previewUrl}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                <div
                  aria-hidden="true"
                  className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                >
                  <ImageUpIcon className="size-4 opacity-60" />
                </div>
                <p className="mb-1.5 font-medium text-sm">
                  Drop your image here or click to browse
                </p>
                <p className="text-muted-foreground text-xs">
                  Max size: {maxSizeLabel}
                </p>
              </div>
            )}
          </div>
          {previewUrl && (
            <div className="absolute top-4 right-4">
              <button
                aria-label="Remove image"
                className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                onClick={() => firstFile && removeFile(firstFile.id)}
                type="button"
              >
                <XIcon aria-hidden="true" className="size-4" />
              </button>
            </div>
          )}
        </div>

        {errorBlock}
      </div>
    )
  }

  // --- Multi-file variant ---------------------------------------------------
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div
        className="relative flex min-h-52 flex-col items-center not-data-files:justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          {...getInputProps({ disabled })}
          aria-label="Upload files"
          className="sr-only"
        />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate font-medium text-sm">
                Files ({files.length})
              </h3>
              <div className="flex gap-2">
                <Button
                  disabled={disabled}
                  onClick={openFileDialog}
                  size="sm"
                  variant="outline"
                >
                  <UploadIcon
                    aria-hidden="true"
                    className="-ms-0.5 size-3.5 opacity-60"
                  />
                  Add files
                </Button>
                <Button
                  disabled={disabled}
                  onClick={clearFiles}
                  size="sm"
                  variant="outline"
                >
                  <Trash2Icon
                    aria-hidden="true"
                    className="-ms-0.5 size-3.5 opacity-60"
                  />
                  Remove all
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {files.map((entry) => (
                <div
                  className="relative flex flex-col rounded-md border bg-background"
                  key={entry.id}
                >
                  <FilePreview entry={entry} />
                  <Button
                    aria-label="Remove file"
                    className="-top-2 -right-2 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
                    onClick={() => removeFile(entry.id)}
                    size="icon"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                  <div className="flex min-w-0 flex-col gap-0.5 border-t p-3">
                    <p className="truncate font-medium text-[13px]">
                      {entry.file.name}
                    </p>
                    <p className="truncate text-muted-foreground text-xs">
                      {formatBytes(entry.file.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              aria-hidden="true"
              className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 font-medium text-sm">Drop your files here</p>
            <p className="text-muted-foreground text-xs">
              Max {maxFiles} files ∙ Up to {maxSizeLabel}
            </p>
            <Button
              className="mt-4"
              disabled={disabled}
              onClick={openFileDialog}
              variant="outline"
            >
              <UploadIcon aria-hidden="true" className="-ms-1 opacity-60" />
              Select files
            </Button>
          </div>
        )}
      </div>

      {errorBlock}
    </div>
  )
}

export { FileUpload }
