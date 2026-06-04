import { useMemo, useState } from 'react'
import {
  CheckIcon,
  CircleCheckIcon,
  CircleOffIcon,
  CodeIcon,
  CopyIcon,
  EyeIcon,
  PackageXIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react'

// The file's own source, for the "View code" toggle (Vite ?raw import).
import source from './ListPageExample.tsx?raw'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DataTable, type DataTableColumn } from '@/components/custom/data-table'
import { FacetedFilter } from '@/components/custom/faceted-filter'
import { StatCard } from '@/components/custom/stat-card'

// ============================================================================
// Demo data
// ============================================================================

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  sku: string
  rating: number
  status: 'active' | 'out-of-stock' | 'closed'
}

const CATEGORIES = ['Electronics', 'Beauty', 'Fashion', 'Home']
const STATUSES: Product['status'][] = ['active', 'out-of-stock', 'closed']
const NAMES = [
  'HP Pavilion 16.1 Gaming Laptop',
  'Samsung Galaxy A21S',
  'Schwaiger KH510S Headphones',
  'Ultimate Ears Wonderboom Speaker',
  'Canon Pixma TS3350 Printer',
  'Canon 4000D 18-55mm III',
  'Lenovo Tab M10 TB-X605F',
  'Sony WH-1000XM4 Headphones',
  'Logitech MX Master 3S',
  'Anker PowerCore 26800',
  'Dell UltraSharp U2723QE',
  'Keychron K8 Mechanical',
  'Razer DeathAdder V3',
  'Nintendo Switch OLED',
  'GoPro HERO12 Black',
  'Kindle Paperwhite 11th Gen',
  'Bose QuietComfort Earbuds',
  'Asus ROG Strix Monitor',
  'Seagate 2TB Portable Drive',
  'TP-Link Archer AX73 Router',
]

// Deterministic pseudo-random so the demo is stable across renders.
function seeded(i: number) {
  const x = Math.sin(i * 99.13) * 10000
  return x - Math.floor(x)
}

const PRODUCTS: Product[] = Array.from({ length: 47 }, (_, i) => {
  const r = seeded(i)
  return {
    id: String(i + 1),
    name: NAMES[i % NAMES.length],
    price: Math.round((20 + r * 980) * 100) / 100,
    category: CATEGORIES[i % CATEGORIES.length],
    stock: Math.floor(r * 40),
    sku: `SKU-${(1000 + i * 37).toString(36).toUpperCase()}`,
    rating: Math.round((3.5 + r * 1.5) * 10) / 10,
    status: STATUSES[Math.floor(seeded(i + 100) * STATUSES.length)],
  }
})

const STATUS_META: Record<
  Product['status'],
  { label: string; variant: 'green' | 'orange' | 'red'; icon: React.ReactNode }
> = {
  active: { label: 'Active', variant: 'green', icon: <CircleCheckIcon /> },
  'out-of-stock': {
    label: 'Out of stock',
    variant: 'orange',
    icon: <PackageXIcon />,
  },
  closed: { label: 'Closed for sale', variant: 'red', icon: <CircleOffIcon /> },
}

// ============================================================================
// List Page
// ============================================================================

function ListPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string[]>([])
  const [category, setCategory] = useState<string[]>([])

  const statusOptions = useMemo(
    () =>
      STATUSES.map((s) => ({
        value: s,
        label: STATUS_META[s].label,
        icon: STATUS_META[s].icon,
        count: PRODUCTS.filter((p) => p.status === s).length,
      })),
    []
  )
  const categoryOptions = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        value: c,
        label: c,
        count: PRODUCTS.filter((p) => p.category === c).length,
      })),
    []
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q))
        return false
      if (status.length && !status.includes(p.status)) return false
      if (category.length && !category.includes(p.category)) return false
      return true
    })
  }, [search, status, category])

  const columns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      header: 'Product',
      cell: (p) => <span className="font-medium text-foreground">{p.name}</span>,
    },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      cell: (p) => `$${p.price.toFixed(2)}`,
    },
    { key: 'category', header: 'Category' },
    { key: 'stock', header: 'Stock', align: 'right' },
    {
      key: 'sku',
      header: 'SKU',
      cell: (p) => <span className="font-mono text-xs">{p.sku}</span>,
    },
    {
      key: 'rating',
      header: 'Rating',
      cell: (p) => (
        <span className="inline-flex items-center gap-1">
          <StarIcon className="size-3.5 fill-orange text-orange" />
          {p.rating}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (p) => {
        const m = STATUS_META[p.status]
        return <Badge variant={m.variant}>{m.label}</Badge>
      },
    },
  ]

  const hasFilters = search || status.length > 0 || category.length > 0

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all your products.
          </p>
        </div>
        <Button>
          <PlusIcon />
          Add Product
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value="$30,230"
          color="success"
          trend={{ value: '+20.1%', direction: 'up', label: 'this month' }}
        />
        <StatCard
          title="Number of Sales"
          value="982"
          color="success"
          trend={{ value: '+5.02%', direction: 'up', label: 'this month' }}
        />
        <StatCard
          title="Affiliate"
          value="$4,530"
          color="success"
          trend={{ value: '+3.1%', direction: 'up', label: 'this month' }}
        />
        <StatCard
          title="Discounts"
          value="$2,230"
          color="danger"
          trend={{ value: '-3.58%', direction: 'down', label: 'this month' }}
        />
      </div>

      {/* Toolbar + table, wrapped in a card */}
      <Card>
        <CardContent className="space-y-4">
          {/* Toolbar: count on the left, search + filters on the right */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filtered.length}</span>{' '}
              of {PRODUCTS.length} products
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch('')
                    setStatus([])
                    setCategory([])
                  }}
                >
                  Reset
                </Button>
              )}
              <Input
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full sm:w-56"
              />
              <FacetedFilter
                title="Status"
                options={statusOptions}
                value={status}
                onChange={setStatus}
              />
              <FacetedFilter
                title="Category"
                options={categoryOptions}
                value={category}
                onChange={setCategory}
              />
            </div>
          </div>

          {/* Table */}
          <DataTable
            data={filtered}
            columns={columns}
            getRowId={(p) => p.id}
            selectable
            pagination
            pageSize={10}
            pageSizeOptions={[10, 25, 50]}
            emptyMessage="No products match your filters."
            rowActions={(p) => [
              { label: 'Edit', icon: PencilIcon, onSelect: () => alert(`Edit ${p.name}`) },
              { type: 'separator' },
              {
                label: 'Delete',
                icon: Trash2Icon,
                destructive: true,
                onSelect: () => alert(`Delete ${p.name}`),
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// Page wrapper — live preview + "View code" toggle
// ============================================================================

export function ListPageExample() {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Pattern
          </h2>
          <p className="text-xs text-muted-foreground">
            Stat cards, faceted filters, and a paginated table composed into one
            page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowCode((s) => !s)}>
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

      {showCode ? (
        <pre className="max-h-[70svh] overflow-auto rounded-xl border bg-muted/40 p-4 text-xs leading-relaxed">
          <code>{source}</code>
        </pre>
      ) : (
        <ListPage />
      )}
    </div>
  )
}
