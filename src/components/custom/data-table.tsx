import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ActionsMenu,
  type ActionsMenuItem,
} from "@/components/custom/actions-menu";
import { AdvancedSelect } from "@/components/custom/advanced-select";
import { Spinner } from "@/components/ui/spinner";

// ============================================================================
// Types
// ============================================================================

export interface DataTableColumn<TRow> {
  /** Stable key; also used to read `row[key]` when no `cell` is given. */
  key: string;
  /** Header cell content. */
  header?: React.ReactNode;
  /** Custom cell renderer; defaults to String(row[key]). */
  cell?: (row: TRow, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  /** Fixed column width, e.g. "12rem" or "120px". */
  width?: string;
  /** Extra class for this column's header + body cells. */
  className?: string;
  /** Extra class for the header cell only. */
  headerClassName?: string;
}

export interface DataTableProps<TRow> {
  columns: DataTableColumn<TRow>[];
  data: TRow[];
  /** Unique id per row; required for selection. Defaults to the row index. */
  getRowId?: (row: TRow, index: number) => string;
  // --- selection (optional) ---
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  // --- row actions (optional) ---
  rowActions?: (row: TRow) => ActionsMenuItem[];
  // --- states ---
  loading?: boolean;
  emptyMessage?: React.ReactNode;
  // --- pagination (optional, client-side) ---
  /** Enable client-side pagination with a footer of page controls. */
  pagination?: boolean;
  /** Rows per page. Default `25`. */
  pageSize?: number;
  /** Page-size options in the footer selector. Default `[25, 50, 100, 200]`. */
  pageSizeOptions?: number[];
  // --- appearance ---
  /** Alternating row backgrounds for easier scanning. */
  striped?: boolean;
  /** Keep the header visible while the body scrolls (pair with maxHeight). */
  stickyHeader?: boolean;
  /** Constrains height and enables vertical scroll, e.g. "24rem" or 400. */
  maxHeight?: string | number;
  // --- misc ---
  onRowClick?: (row: TRow) => void;
  className?: string;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

// ============================================================================
// DataTable
// ============================================================================

export function DataTable<TRow>({
  columns,
  data,
  getRowId = (_row, index) => String(index),
  selectable = false,
  selectedIds,
  onSelectionChange,
  rowActions,
  loading = false,
  emptyMessage = "No results.",
  pagination = false,
  pageSize: pageSizeProp = 25,
  pageSizeOptions = [25, 50, 100, 200],
  striped = true,
  stickyHeader = false,
  maxHeight,
  onRowClick,
  className,
}: DataTableProps<TRow>) {
  const ids = React.useMemo(
    () => data.map((row, i) => getRowId(row, i)),
    [data, getRowId],
  );

  // Selection is controlled when selectedIds is provided, else internal.
  const [internalSelected, setInternalSelected] = React.useState<string[]>([]);
  const selected = selectedIds ?? internalSelected;

  const setSelected = (next: string[]) => {
    if (selectedIds === undefined) setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const allSelected =
    ids.length > 0 && ids.every((id) => selected.includes(id));
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => setSelected(allSelected ? [] : ids);
  const toggleRow = (id: string) =>
    setSelected(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id],
    );

  const totalCols =
    columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);

  // --- pagination (client-side) ---
  const [pageSize, setPageSize] = React.useState(pageSizeProp);
  const [rawPageIndex, setPageIndex] = React.useState(0);

  const pageCount = pagination
    ? Math.max(1, Math.ceil(data.length / pageSize))
    : 1;
  // Clamp during render (no effect): if data shrank or page size grew, the last
  // valid page is shown without an extra render pass.
  const pageIndex = Math.min(rawPageIndex, pageCount - 1);

  // Rows for the current page, paired with their original index so selection,
  // striping, and cell renderers keep using the row's true position.
  const pageRows = React.useMemo(() => {
    const rows = data.map((row, index) => ({ row, index }));
    if (!pagination) return rows;
    const start = pageIndex * pageSize;
    return rows.slice(start, start + pageSize);
  }, [data, pagination, pageIndex, pageSize]);

  // Comfier, consistent cell padding; first/last cells get extra edge inset.
  const cellPad = "px-4 py-3 first:pl-5 last:pr-5";
  const headPad = "px-4 first:pl-5 last:pr-5";

  return (
    <div className={cn("rounded-lg border", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-lg",
          maxHeight !== undefined ? "overflow-auto" : "overflow-hidden",
          // Square the bottom corners when a footer follows.
          pagination && "rounded-b-none",
        )}
        style={
          maxHeight !== undefined
            ? {
                maxHeight:
                  typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
              }
            : undefined
        }
      >
      <Table>
        <TableHeader
          className={cn(
            "bg-muted/60",
            stickyHeader &&
              "sticky top-0 z-10 [&_th]:bg-muted/95 [&_th]:backdrop-blur supports-backdrop-filter:[&_th]:bg-muted/80",
          )}
        >
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead className={cn("w-10", headPad)}>
                <Checkbox
                  aria-label="Select all rows"
                  checked={
                    allSelected ? true : someSelected ? "indeterminate" : false
                  }
                  onCheckedChange={toggleAll}
                />
              </TableHead>
            )}
            {columns.map((col) => (
              <TableHead
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  "h-11 text-xs font-semibold tracking-wide text-foreground uppercase",
                  headPad,
                  col.align && alignClass[col.align],
                  col.className,
                  col.headerClassName,
                )}
              >
                {col.header}
              </TableHead>
            ))}
            {rowActions && <TableHead className="w-12" />}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={totalCols} className="h-28 text-center">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Spinner className="size-4" /> Loading…
                </span>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={totalCols}
                className="h-28 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            pageRows.map(({ row, index }) => {
              const id = ids[index];
              const isSelected = selected.includes(id);
              return (
                <TableRow
                  key={id}
                  data-state={isSelected ? "selected" : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    // Zebra stripe: a neutral, low-contrast tint.
                    striped && !isSelected && "odd:bg-muted/40",
                    // Selected: a distinct primary tint + left accent bar, so it
                    // never reads like a stripe (overrides the stripe color).
                    isSelected &&
                      "bg-primary/10 shadow-[inset_3px_0_0_0_var(--primary)] hover:bg-primary/15",
                    onRowClick && "cursor-pointer",
                  )}
                >
                  {selectable && (
                    <TableCell
                      className={cn("w-10", cellPad)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        aria-label="Select row"
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      style={col.width ? { width: col.width } : undefined}
                      className={cn(
                        cellPad,
                        col.align && alignClass[col.align],
                        col.className,
                      )}
                    >
                      {col.cell
                        ? col.cell(row, index)
                        : String(
                            (row as Record<string, unknown>)[col.key] ?? "",
                          )}
                    </TableCell>
                  ))}
                  {rowActions && (
                    <TableCell
                      className="w-12 pr-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ActionsMenu items={rowActions(row)} />
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      </div>

      {pagination && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-sm">
          <p className="text-muted-foreground">
            Page {data.length === 0 ? 0 : pageIndex + 1} of {pageCount} (
            {data.length} total {data.length === 1 ? "item" : "items"})
          </p>

          <div className="flex items-center gap-4">
            {pageSizeOptions && pageSizeOptions.length > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="whitespace-nowrap">Rows per page</span>
                <AdvancedSelect
                  size="sm"
                  className="w-20"
                  value={String(pageSize)}
                  onValueChange={(v) => {
                    // Single-select emits the chosen option object; read its value.
                    const raw =
                      typeof v === "object" && v !== null && "value" in v
                        ? (v as { value: string }).value
                        : v;
                    setPageSize(Number(raw));
                    setPageIndex(0);
                  }}
                  options={pageSizeOptions.map((opt) => ({
                    value: String(opt),
                    label: String(opt),
                  }))}
                />
              </div>
            )}

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Previous page"
                disabled={pageIndex <= 0}
                onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Next page"
                disabled={pageIndex >= pageCount - 1}
                onClick={() =>
                  setPageIndex(Math.min(pageCount - 1, pageIndex + 1))
                }
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
