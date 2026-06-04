import {
  ImageIcon,
  PackageIcon,
  StarIcon,
  TagIcon,
  TrendingUpIcon,
} from 'lucide-react'

import { QuickStat } from '@/components/custom/quick-stat'
import { DefRow } from '@/components/custom/def-row'
import { Separator } from '@/components/ui/separator'
import type { BitSpec } from './types'

export const bits: BitSpec[] = [
  {
    id: 'quick-stat',
    name: 'QuickStat',
    description:
      'A compact inline stat — icon, value, and an optional muted label. Line several up with vertical separators.',
    render: () => (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 [&>[data-slot=separator]]:h-4">
        <QuickStat icon={<TagIcon />} value="$960.99" />
        <Separator orientation="vertical" />
        <QuickStat icon={<PackageIcon />} value={5} label="in stock" />
        <Separator orientation="vertical" />
        <QuickStat
          icon={<StarIcon className="fill-orange text-orange" />}
          value={4.9}
        />
        <Separator orientation="vertical" />
        <QuickStat icon={<TrendingUpIcon />} value={982} label="sold" />
      </div>
    ),
    code: `<div className="flex items-center gap-3 [&>[data-slot=separator]]:h-4">
  <QuickStat icon={<TagIcon />} value="$960.99" />
  <Separator orientation="vertical" />
  <QuickStat icon={<PackageIcon />} value={5} label="in stock" />
  <Separator orientation="vertical" />
  <QuickStat icon={<StarIcon className="fill-orange text-orange" />} value={4.9} />
  <Separator orientation="vertical" />
  <QuickStat icon={<TrendingUpIcon />} value={982} label="sold" />
</div>`,
  },
  {
    id: 'def-row',
    name: 'DefRow',
    description:
      'A label/value definition row for detail cards. Stack several in a divide-y container.',
    render: () => (
      <div className="w-full max-w-sm divide-y rounded-lg border px-3">
        <DefRow label="Price" value="$960.99" />
        <DefRow label="Stock" value="5 units" />
        <DefRow label="Category" value="Electronics" />
        <DefRow label="SKU" value="SKU-RCH45Q1A" />
      </div>
    ),
    code: `<div className="divide-y">
  <DefRow label="Price" value="$960.99" />
  <DefRow label="Stock" value="5 units" />
  <DefRow label="Category" value="Electronics" />
  <DefRow label="SKU" value="SKU-RCH45Q1A" />
</div>`,
  },
  {
    id: 'thumb',
    name: 'Thumbnail (inline)',
    description:
      'A square image with an icon fallback when no src is provided — for record headers and lists.',
    render: () => (
      <div className="flex items-center gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
          <img
            src="https://picsum.photos/seed/thumb/200/200"
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
          <ImageIcon className="size-6 text-muted-foreground" />
        </div>
      </div>
    ),
    code: `function Thumb({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <ImageIcon className="size-6 text-muted-foreground" />
      )}
    </div>
  )
}`,
  },
]
