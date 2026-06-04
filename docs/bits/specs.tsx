import {
  ArrowLeftRightIcon,
  Building2Icon,
  ImageIcon,
  LayersIcon,
  MapPinIcon,
  PackageIcon,
  RadioIcon,
  StarIcon,
  TagIcon,
  TrendingUpIcon,
} from 'lucide-react'

import { QuickStat } from '@/components/custom/quick-stat'
import { DefRow } from '@/components/custom/def-row'
import {
  StatusAvatar,
  StatusIcon,
  StatusList,
  StatusListGroup,
  StatusListItem,
} from '@/components/custom/status-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from '@/components/ui/card'
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
  {
    id: 'status-list',
    name: 'StatusList',
    description:
      'Status rows with flexible leading visuals (tinted icon box, avatar/initials, or plain icon), pill / outline / text status, and group headers.',
    render: () => (
      <StatusList className="w-full max-w-md">
        <StatusListGroup label="Gateways" count={2}>
          <StatusListItem
            media={
              <StatusIcon tone="success">
                <RadioIcon />
              </StatusIcon>
            }
            title="GW-SKY-B01"
            description="WiFi · 100% · 2 tags"
            status="Online"
            statusVariant="outline"
            tone="success"
          />
          <StatusListItem
            media={
              <StatusIcon tone="warning">
                <RadioIcon />
              </StatusIcon>
            }
            title="GW-SKY-B04"
            description="4G · 54% · 2 tags"
            status="Degraded"
            statusVariant="outline"
            tone="warning"
          />
        </StatusListGroup>

        <StatusListGroup label="Workers" count={2}>
          <StatusListItem
            media={<StatusAvatar name="Arjun Das" tone="primary" />}
            title="Arjun Das"
            description="Electrician"
            status="Active"
            statusVariant="text"
            tone="success"
          />
          <StatusListItem
            media={<StatusAvatar name="Fatima Sheikh" tone="primary" />}
            title="Fatima Sheikh"
            description="Safety Officer"
            status="Active"
            statusVariant="text"
            tone="success"
          />
        </StatusListGroup>
      </StatusList>
    ),
    code: `<StatusList>
  <StatusListGroup label="Gateways" count={2}>
    <StatusListItem
      media={<StatusIcon tone="success"><RadioIcon /></StatusIcon>}
      title="GW-SKY-B01"
      description="WiFi · 100% · 2 tags"
      status="Online"
      statusVariant="outline"
      tone="success"
    />
    <StatusListItem
      media={<StatusIcon tone="warning"><RadioIcon /></StatusIcon>}
      title="GW-SKY-B04"
      description="4G · 54% · 2 tags"
      status="Degraded"
      statusVariant="outline"
      tone="warning"
    />
  </StatusListGroup>

  <StatusListGroup label="Workers" count={2}>
    <StatusListItem
      media={<StatusAvatar name="Arjun Das" tone="primary" />}
      title="Arjun Das"
      description="Electrician"
      status="Active"
      statusVariant="text"
      tone="success"
    />
    <StatusListItem
      media={<StatusAvatar name="Fatima Sheikh" tone="primary" />}
      title="Fatima Sheikh"
      description="Safety Officer"
      status="Active"
      statusVariant="text"
      tone="success"
    />
  </StatusListGroup>
</StatusList>`,
  },
  {
    id: 'nested-card',
    name: 'Card in card',
    wide: true,
    description:
      'An outer card with a header + action, containing nested cards — one per Card background variant.',
    render: () => {
      const SITES = [
        { variant: 'alt', name: 'Skyline Tower', floor: 'Floor 4', addr: '12 Harbour Rd, Mumbai', status: 'On Site', badge: 'bg-muted text-muted-foreground' },
        { variant: 'primary', name: 'Marina Heights', floor: 'Floor 8', addr: '4 Marina Blvd, Mumbai', status: 'Active', badge: 'bg-primary/10 text-primary' },
        { variant: 'success', name: 'Green Park Plaza', floor: 'Floor 2', addr: '7 Park Ln, Pune', status: 'Online', badge: 'bg-green/10 text-green' },
        { variant: 'warning', name: 'Dockside Depot', floor: 'Floor 1', addr: '9 Dock Rd, Chennai', status: 'Degraded', badge: 'bg-orange/10 text-orange' },
        { variant: 'danger', name: 'Old Mill Unit', floor: 'Basement', addr: '2 Mill St, Delhi', status: 'Offline', badge: 'bg-red/10 text-red' },
      ] as const
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2Icon className="size-5" />
              Site Assignment
            </CardTitle>
            <CardDescription>Nested cards, one per variant</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">
                <ArrowLeftRightIcon className="size-4" />
                Reassign
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {SITES.map((s) => (
              <Card key={s.name} variant={s.variant} size="sm">
                <CardContent className="flex items-center gap-3">
                  <StatusIcon tone="neutral" className="bg-card text-foreground">
                    <Building2Icon />
                  </StatusIcon>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{s.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <LayersIcon className="size-3.5" /> {s.floor}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPinIcon className="size-3.5" /> {s.addr}
                    </p>
                  </div>
                  <Badge className={`border-transparent font-medium ${s.badge}`}>
                    {s.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )
    },
    code: `// One nested card per Card variant
const SITES = [
  { variant: 'alt',     name: 'Skyline Tower',    /* … */ },
  { variant: 'primary', name: 'Marina Heights',   /* … */ },
  { variant: 'success', name: 'Green Park Plaza', /* … */ },
  { variant: 'warning', name: 'Dockside Depot',   /* … */ },
  { variant: 'danger',  name: 'Old Mill Unit',    /* … */ },
]

<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Building2Icon className="size-5" /> Site Assignment
    </CardTitle>
    <CardDescription>Nested cards, one per variant</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">
        <ArrowLeftRightIcon className="size-4" /> Reassign
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent className="grid gap-3 sm:grid-cols-2">
    {SITES.map((s) => (
      <Card key={s.name} variant={s.variant} size="sm">
        <CardContent className="flex items-center gap-3">
          <StatusIcon className="bg-card text-foreground"><Building2Icon /></StatusIcon>
          <div className="flex-1">
            <p className="font-medium">{s.name}</p>
            <p className="text-xs text-muted-foreground">
              <LayersIcon className="size-3.5" /> {s.floor}
            </p>
            <p className="text-xs text-muted-foreground">
              <MapPinIcon className="size-3.5" /> {s.addr}
            </p>
          </div>
          <Badge>{s.status}</Badge>
        </CardContent>
      </Card>
    ))}
  </CardContent>
</Card>`,
  },
]
