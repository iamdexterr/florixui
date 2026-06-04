import { useMemo, useRef, useState } from 'react'
import {
  CheckIcon,
  CodeIcon,
  CopyIcon,
  EyeIcon,
  NavigationIcon,
  PauseIcon,
  PlusIcon,
} from 'lucide-react'

// The file's own source, for the "View code" toggle (Vite ?raw import).
import source from './FleetViewExample.tsx?raw'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Map,
  MapMarker,
  MarkerContent,
  type MapRef,
} from '@/components/ui/map'
import { ListCard } from '@/components/custom/list-card'
import { FacetedFilter } from '@/components/custom/faceted-filter'

// ============================================================================
// Demo data
// ============================================================================

type VehicleStatus = 'moving' | 'idle' | 'stopped'

interface Vehicle {
  id: string
  name: string
  model: string
  driver: string
  longitude: number
  latitude: number
  speed: number
  heading?: number
  status: VehicleStatus
  origin: string
  destination: string
  distanceMi: number
  image: string
}

// A shared device photo so every card shows a thumbnail.
const TRUCK_IMG =
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=120&q=60'

const VEHICLES: Vehicle[] = [
  {
    id: 'LH100',
    name: 'LH100',
    model: 'Peterbilt',
    driver: 'Jose Bernardo',
    longitude: -84.02,
    latitude: 33.78,
    speed: 68,
    heading: 35,
    status: 'moving',
    origin: '1381 Scenic Hwy S, Snellville, GA',
    destination: '6101 Kings Mountain Ct, Stone Mountain, GA',
    distanceMi: 13,
    image: TRUCK_IMG,
  },
  {
    id: 'LH105',
    name: 'LH105',
    model: 'Freightliner',
    driver: 'Christopher Williams',
    longitude: -84.13,
    latitude: 33.86,
    speed: 65,
    heading: 290,
    status: 'moving',
    origin: '4971 Lawrenceville Hwy, Lilburn, GA',
    destination: 'Trowbridge St, Greenville, KY',
    distanceMi: 340,
    image: TRUCK_IMG,
  },
  {
    id: 'LH110',
    name: 'LH110',
    model: 'Peterbilt',
    driver: 'Peter Hanson',
    longitude: -84.11,
    latitude: 33.81,
    speed: 0,
    status: 'idle',
    origin: '6101 Kings Mountain Ct, Stone Mountain, GA',
    destination: '6101 Kings Mountain Ct, Stone Mountain, GA',
    distanceMi: 0,
    image: TRUCK_IMG,
  },
  {
    id: 'LH120',
    name: 'LH120',
    model: 'Kenworth',
    driver: 'Samantha Gonzalez',
    longitude: -84.0,
    latitude: 33.95,
    speed: 0,
    status: 'stopped',
    origin: '3522 Sugarloaf Pkwy, Lawrenceville, GA',
    destination: '3522 Sugarloaf Pkwy, Lawrenceville, GA',
    distanceMi: 0,
    image: TRUCK_IMG,
  },
  {
    id: 'LH130',
    name: 'LH130',
    model: 'Volvo VNL',
    driver: 'Marcus Lee',
    longitude: -83.92,
    latitude: 33.74,
    speed: 54,
    heading: 120,
    status: 'moving',
    origin: 'Centerville, GA',
    destination: 'Rosebud, GA',
    distanceMi: 88,
    image: TRUCK_IMG,
  },
  {
    id: 'LH140',
    name: 'LH140',
    model: 'Mack Anthem',
    driver: 'Diana Cruz',
    longitude: -84.2,
    latitude: 33.7,
    speed: 0,
    status: 'idle',
    origin: 'Smoke Rise, GA',
    destination: 'Atlanta, GA',
    distanceMi: 21,
    image: TRUCK_IMG,
  },
  {
    id: 'LH150',
    name: 'LH150',
    model: 'International LT',
    driver: 'Aaron Bennett',
    longitude: -84.08,
    latitude: 33.9,
    speed: 61,
    heading: 75,
    status: 'moving',
    origin: 'Duluth, GA',
    destination: 'Athens, GA',
    distanceMi: 54,
    image: TRUCK_IMG,
  },
  {
    id: 'LH160',
    name: 'LH160',
    model: 'Peterbilt 579',
    driver: 'Olivia Martin',
    longitude: -83.98,
    latitude: 33.72,
    speed: 47,
    heading: 200,
    status: 'moving',
    origin: 'Snellville, GA',
    destination: 'Macon, GA',
    distanceMi: 132,
    image: TRUCK_IMG,
  },
  {
    id: 'LH170',
    name: 'LH170',
    model: 'Freightliner Cascadia',
    driver: 'Ethan Carter',
    longitude: -84.25,
    latitude: 33.88,
    speed: 0,
    status: 'stopped',
    origin: 'Tucker, GA',
    destination: 'Tucker, GA',
    distanceMi: 0,
    image: TRUCK_IMG,
  },
  {
    id: 'LH180',
    name: 'LH180',
    model: 'Kenworth T680',
    driver: 'Sophia Reyes',
    longitude: -83.88,
    latitude: 33.95,
    speed: 58,
    heading: 310,
    status: 'moving',
    origin: 'Lawrenceville, GA',
    destination: 'Gainesville, GA',
    distanceMi: 39,
    image: TRUCK_IMG,
  },
  {
    id: 'LH190',
    name: 'LH190',
    model: 'Volvo VNL 760',
    driver: 'Liam Foster',
    longitude: -84.15,
    latitude: 33.65,
    speed: 0,
    status: 'idle',
    origin: 'Decatur, GA',
    destination: 'Columbus, GA',
    distanceMi: 107,
    image: TRUCK_IMG,
  },
  {
    id: 'LH200',
    name: 'LH200',
    model: 'Mack Pinnacle',
    driver: 'Mia Coleman',
    longitude: -84.03,
    latitude: 34.0,
    speed: 64,
    heading: 90,
    status: 'moving',
    origin: 'Suwanee, GA',
    destination: 'Greenville, SC',
    distanceMi: 149,
    image: TRUCK_IMG,
  },
  {
    id: 'LH210',
    name: 'LH210',
    model: 'Western Star 5700',
    driver: 'Noah Price',
    longitude: -83.95,
    latitude: 33.6,
    speed: 0,
    status: 'stopped',
    origin: 'Conyers, GA',
    destination: 'Conyers, GA',
    distanceMi: 0,
    image: TRUCK_IMG,
  },
]

const STATUS_META: Record<
  VehicleStatus,
  { label: string; tone: string; dot: string; icon: typeof NavigationIcon }
> = {
  moving: {
    label: 'Moving',
    tone: 'text-green',
    dot: 'bg-green',
    icon: NavigationIcon,
  },
  idle: {
    label: 'Idle',
    tone: 'text-orange',
    dot: 'bg-orange',
    icon: PauseIcon,
  },
  stopped: {
    label: 'Stopped',
    tone: 'text-muted-foreground',
    dot: 'bg-foreground',
    icon: PauseIcon,
  },
}

// ============================================================================
// Map marker
// ============================================================================

function VehicleMarker({
  vehicle,
  selected,
}: {
  vehicle: Vehicle
  selected: boolean
}) {
  const meta = STATUS_META[vehicle.status]
  const Icon = meta.icon

  return (
    <span className="relative flex flex-col items-center">
      {selected && (
        <span
          className={cn(
            'absolute top-0 size-8 animate-ping rounded-full opacity-30',
            meta.dot,
          )}
        />
      )}
      <span
        className={cn(
          'flex size-7 items-center justify-center rounded-full text-white shadow-md ring-2 ring-background transition-transform',
          meta.dot,
          selected && 'scale-110',
        )}
      >
        <Icon
          className="size-3.5"
          style={
            vehicle.status === 'moving' && vehicle.heading != null
              ? { transform: `rotate(${vehicle.heading}deg)` }
              : undefined
          }
        />
      </span>
      {selected && (
        <span className="mt-1 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background shadow">
          {vehicle.name} · {vehicle.driver}
        </span>
      )}
    </span>
  )
}

// ============================================================================
// The pattern
// ============================================================================

function FleetView() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string>('LH105')
  const mapRef = useRef<MapRef>(null)

  const statusOptions = useMemo(
    () =>
      (Object.keys(STATUS_META) as VehicleStatus[]).map((s) => ({
        label: STATUS_META[s].label,
        value: s,
      })),
    [],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return VEHICLES.filter((v) => {
      const matchesSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.driver.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
      const matchesStatus = status.length === 0 || status.includes(v.status)
      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const select = (v: Vehicle) => {
    setSelectedId(v.id)
    mapRef.current?.flyTo({
      center: [v.longitude, v.latitude],
      zoom: 11,
      duration: 700,
    })
  }

  return (
    <div className="flex h-[calc(100svh-13rem)] min-h-112 flex-col gap-4">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Fleet View</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {VEHICLES.length} vehicles
          </p>
        </div>
        <Button size="sm">
          <PlusIcon /> Add a vehicle
        </Button>
      </div>

      {/* Split: list + map — fills the remaining height */}
      <div className="flex min-h-0 flex-1 gap-4">
        {/* Sidebar */}
        <div className="flex w-96 shrink-0 flex-col overflow-hidden rounded-xl border bg-card">
          {/* Toolbar */}
          <div className="flex shrink-0 items-center gap-2 border-b p-3">
            <Input
              placeholder="Search vehicles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 flex-1"
            />
            <FacetedFilter
              title="Status"
              options={statusOptions}
              value={status}
              onChange={setStatus}
            />
          </div>

          {/* List of devices — compact row ListCard */}
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
            {filtered.map((v) => {
              const meta = STATUS_META[v.status]
              const selected = v.id === selectedId
              return (
                <ListCard
                  key={v.id}
                  layout="row"
                  variant="alt"
                  onClick={() => select(v)}
                  className={cn(
                    'rounded-lg p-2.5 shadow-none ring-0 hover:bg-muted',
                    selected && 'border-primary bg-primary/5',
                  )}
                  media={
                    <img
                      src={v.image}
                      alt=""
                      className="size-10 shrink-0 rounded-md object-cover"
                    />
                  }
                  title={
                    <span className="flex items-baseline gap-2">
                      {v.name}
                      <span className="font-normal text-muted-foreground text-xs">
                        {v.model}
                      </span>
                    </span>
                  }
                  description={`${v.driver} · ${v.speed} mph`}
                  actions={
                    <span
                      className={cn(
                        'flex items-center gap-1.5 text-xs font-medium',
                        meta.tone,
                      )}
                    >
                      <span className={cn('size-2 rounded-full', meta.dot)} />
                      {meta.label}
                    </span>
                  }
                />
              )
            })}
            {filtered.length === 0 && (
              <p className="px-1 py-8 text-center text-sm text-muted-foreground">
                No vehicles match your filters.
              </p>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-xl border bg-card">
          <Map
            ref={mapRef}
            viewport={{ center: [-84.05, 33.82], zoom: 10 }}
            className="size-full"
          >
            {filtered.map((v) => (
              <MapMarker
                key={v.id}
                longitude={v.longitude}
                latitude={v.latitude}
                onClick={() => select(v)}
              >
                <MarkerContent>
                  <VehicleMarker vehicle={v} selected={v.id === selectedId} />
                </MarkerContent>
              </MapMarker>
            ))}
          </Map>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Page wrapper — live preview + "View code" toggle
// ============================================================================

export function FleetViewExample() {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-4">
      {showCode ? (
        <pre className="max-h-[70svh] overflow-auto rounded-xl border bg-muted/40 p-4 text-xs leading-relaxed">
          <code>{source}</code>
        </pre>
      ) : (
        <FleetView />
      )}

      {/* Pattern toolbar — at the bottom */}
      <div className="flex items-center justify-between gap-3 border-t pt-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Pattern
          </h2>
          <p className="text-xs text-muted-foreground">
            A list of devices (ListCard) beside a map, with search, status
            filter, and two-way selection that flies the map to the device.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode((s) => !s)}
          >
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
    </div>
  )
}
