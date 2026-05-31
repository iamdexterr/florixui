import {
  Map,
  MapClusterLayer,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerPopup,
} from '@/components/ui/map'
import { Bike, MapPin, TrendingUp, Truck, Zap } from 'lucide-react'
import type { ComponentDoc } from './types'

const SF: [number, number] = [-122.4194, 37.7749]

// --- Active users data ------------------------------------------------------
const ACTIVE: {
  coords: [number, number]
  size: number
  city: string
  users: number
}[] = [
  { coords: [-122.4194, 37.7749], size: 28, city: 'San Francisco', users: 412 },
  { coords: [-74.006, 40.7128], size: 36, city: 'New York', users: 689 },
  { coords: [-0.1276, 51.5074], size: 24, city: 'London', users: 351 },
  { coords: [2.3522, 48.8566], size: 18, city: 'Paris', users: 204 },
  { coords: [139.6917, 35.6895], size: 30, city: 'Tokyo', users: 498 },
  { coords: [126.978, 37.5665], size: 20, city: 'Seoul', users: 233 },
  { coords: [77.209, 28.6139], size: 16, city: 'Delhi', users: 167 },
  { coords: [151.2093, -33.8688], size: 14, city: 'Sydney', users: 93 },
]

// --- EV stations data -------------------------------------------------------
type EvStatus = 'available' | 'busy' | 'offline'
const STATUS_COLOR: Record<EvStatus, string> = {
  available: 'bg-green-500',
  busy: 'bg-orange-500',
  offline: 'bg-gray-400',
}
const STATUS_LABEL: Record<EvStatus, string> = {
  available: 'Available',
  busy: 'In use',
  offline: 'Offline',
}
const STATIONS: {
  coords: [number, number]
  status: EvStatus
  name: string
  kw: number
}[] = [
  { coords: [-122.42, 37.78], status: 'available', name: 'Market St Hub', kw: 150 },
  { coords: [-122.44, 37.77], status: 'available', name: 'Hayes Valley', kw: 50 },
  { coords: [-122.41, 37.76], status: 'busy', name: 'Mission Garage', kw: 250 },
  { coords: [-122.46, 37.75], status: 'available', name: 'Sunset Plaza', kw: 50 },
  { coords: [-122.43, 37.75], status: 'offline', name: 'Castro Station', kw: 150 },
  { coords: [-122.4, 37.79], status: 'busy', name: 'Embarcadero', kw: 350 },
  { coords: [-122.45, 37.78], status: 'offline', name: 'Pac Heights', kw: 50 },
]

// --- Heatmap (NYC) data -----------------------------------------------------
const NYC_POINTS: [number, number][] = []
const NYC_CENTERS: [number, number][] = [
  [-74.01, 40.74],
  [-74.03, 40.76],
  [-73.99, 40.72],
]
NYC_CENTERS.forEach(([lng, lat]) => {
  for (let i = 0; i < 120; i++) {
    NYC_POINTS.push([lng + (Math.sin(i) * 0.02), lat + (Math.cos(i * 1.3) * 0.02)])
  }
})
const NYC_GEOJSON: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: 'FeatureCollection',
  features: NYC_POINTS.map((coordinates) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates },
    properties: {},
  })),
}

// --- Central Park loop ------------------------------------------------------
const CP_LOOP: [number, number][] = [
  [-73.9712, 40.7644],
  [-73.9582, 40.8003],
  [-73.958, 40.8009],
  [-73.9818, 40.7681],
  [-73.9812, 40.7672],
  [-73.9712, 40.7644],
]

// --- Delivery route (London) ------------------------------------------------
const LONDON_ROUTE: [number, number][] = [
  [-0.1426, 51.5208],
  [-0.13, 51.514],
  [-0.115, 51.508],
  [-0.1, 51.507],
  [-0.085, 51.508],
  [-0.07, 51.51],
  [-0.06, 51.512],
]
const STORE = LONDON_ROUTE[0]
const HOME = LONDON_ROUTE[LONDON_ROUTE.length - 1]

const mapClass = 'relative h-[360px] w-full overflow-hidden rounded-lg border'

export const mapDoc: ComponentDoc = {
  slug: 'map',
  name: 'Map',
  group: 'Custom',
  description:
    'An interactive map built on MapLibre GL (via mapcn), with markers, routes, clustering, and overlays. Uses a free CARTO light basemap by default with no attribution — no API key required.',
  usage: (
    <>
      <p>
        <code>Map</code> renders a MapLibre GL map and exposes composable pieces
        — <code>MapMarker</code>, <code>MapRoute</code>,{' '}
        <code>MapClusterLayer</code>, <code>MapControls</code>, and more. Compose
        them as children, and layer your own absolutely-positioned cards over the
        container for stats/legends.
      </p>
      <ul>
        <li>
          Set the view with{' '}
          <code>viewport={'{{ center: [lng, lat], zoom }}'}</code>. Coordinates
          are <strong>[longitude, latitude]</strong>.
        </li>
        <li>
          Markers take <code>longitude</code> / <code>latitude</code> and render
          their children via <code>MarkerContent</code> — style the pin however
          you like.
        </li>
        <li>
          Nest a <code>MarkerPopup</code> inside a <code>MapMarker</code> for a
          popup that opens on click (add <code>closeButton</code> for an × to
          dismiss it).
        </li>
        <li>
          <code>MapRoute</code> draws a line from a list of coordinates;{' '}
          <code>MapClusterLayer</code> takes GeoJSON points and clusters them.
        </li>
        <li>
          Zoom controls sit <strong>top-right</strong>, with a{' '}
          <strong>basemap button</strong> below them that opens a menu to pick a
          tile — Light, Voyager, and Dark by default. Pass a custom{' '}
          <code>tiles</code> array to change them, or <code>tiles={'{false}'}</code>{' '}
          to hide the button.
        </li>
        <li>
          The container is <code>position: relative</code>, so overlay cards are
          just absolutely-positioned children.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      render: () => (
        <Map viewport={{ center: SF, zoom: 10 }} className={mapClass} />
      ),
      code: `<Map
  viewport={{ center: [-122.4194, 37.7749], zoom: 10 }}
  className="h-[360px] w-full rounded-lg border"
/>`,
    },
    {
      name: 'Active users (world + overlay)',
      description: 'Glowing location markers with an absolutely-positioned stat card.',
      render: () => (
        <Map viewport={{ center: [10, 25], zoom: 0.6 }} className={mapClass}>
          {ACTIVE.map((p, i) => (
            <MapMarker key={i} longitude={p.coords[0]} latitude={p.coords[1]}>
              <MarkerContent>
                <span className="relative flex items-center justify-center">
                  <span
                    className="absolute rounded-full bg-green-500/25"
                    style={{ width: p.size, height: p.size }}
                  />
                  <span className="size-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                </span>
              </MarkerContent>
              <MarkerPopup>
                <div className="space-y-0.5">
                  <p className="font-medium">{p.city}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.users.toLocaleString()} active users
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
          <div className="absolute top-12 left-4 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              Active users
            </p>
            <p className="text-2xl font-bold tabular-nums">2,847</p>
            <p className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="size-3.5" /> +12.5% vs last hour
            </p>
          </div>
        </Map>
      ),
      code: `<Map viewport={{ center: [10, 25], zoom: 0.6 }} className="relative h-[360px] w-full rounded-lg border">
  {points.map((p, i) => (
    <MapMarker key={i} longitude={p.coords[0]} latitude={p.coords[1]}>
      <MarkerContent>
        <span className="relative flex items-center justify-center">
          <span className="absolute rounded-full bg-green-500/25" style={{ width: p.size, height: p.size }} />
          <span className="size-2.5 rounded-full bg-green-500 ring-2 ring-background" />
        </span>
      </MarkerContent>
      {/* Opens on click */}
      <MarkerPopup>
        <p className="font-medium">{p.city}</p>
        <p className="text-xs text-muted-foreground">{p.users} active users</p>
      </MarkerPopup>
    </MapMarker>
  ))}
  {/* Overlay card */}
  <div className="absolute top-4 left-4 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur">
    <p className="text-xs uppercase text-muted-foreground">Active users</p>
    <p className="text-2xl font-bold">2,847</p>
    <p className="text-xs text-green-600">+12.5% vs last hour</p>
  </div>
</Map>`,
    },
    {
      name: 'Route + stats overlay (Central Park)',
      description: 'A route line with an activity-stats card overlaid on the map.',
      render: () => (
        <Map viewport={{ center: [-73.9684, 40.7829], zoom: 12.6 }} className={mapClass}>
          <MapRoute coordinates={CP_LOOP} color="#22c55e" width={4} />
          <MapMarker longitude={CP_LOOP[0][0]} latitude={CP_LOOP[0][1]}>
            <MarkerContent>
              <span className="size-3 rounded-full bg-green-500 ring-2 ring-background" />
            </MarkerContent>
          </MapMarker>
          <div className="absolute top-12 left-4 rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-medium">
              <Bike className="size-4 text-green-600" /> Central Park Loop
            </p>
            <div className="flex gap-4 text-center">
              {[
                ['6.2', 'MILES'],
                ['32', 'MINS'],
                ['285', 'CAL'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-lg font-bold tabular-nums">{v}</p>
                  <p className="text-[10px] tracking-wide text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Map>
      ),
      code: `<Map viewport={{ center: [-73.9684, 40.7829], zoom: 12.6 }} className="relative h-[360px] w-full rounded-lg border">
  <MapRoute coordinates={loop} color="#22c55e" width={4} />
  {/* Stats overlay card */}
  <div className="absolute top-4 left-4 rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur">
    <p className="flex items-center gap-1.5 text-sm font-medium">
      <Bike className="size-4 text-green-600" /> Central Park Loop
    </p>
    <div className="flex gap-4 text-center">
      <div><p className="text-lg font-bold">6.2</p><p className="text-[10px]">MILES</p></div>
      <div><p className="text-lg font-bold">32</p><p className="text-[10px]">MINS</p></div>
      <div><p className="text-lg font-bold">285</p><p className="text-[10px]">CAL</p></div>
    </div>
  </div>
</Map>`,
    },
    {
      name: 'EV stations (status markers)',
      description: 'Colored markers by availability with a charge icon.',
      render: () => (
        <Map viewport={{ center: SF, zoom: 11.5 }} className={mapClass}>
          {STATIONS.map((s, i) => (
            <MapMarker key={i} longitude={s.coords[0]} latitude={s.coords[1]}>
              <MarkerContent>
                <span
                  className={`flex size-7 items-center justify-center rounded-full text-white shadow-md ring-2 ring-background ${STATUS_COLOR[s.status]}`}
                >
                  <Zap className="size-4 fill-current" />
                </span>
              </MarkerContent>
              <MarkerPopup closeButton>
                <div className="space-y-1">
                  <p className="font-medium">{s.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className={`size-2 rounded-full ${STATUS_COLOR[s.status]}`}
                    />
                    {STATUS_LABEL[s.status]} · {s.kw} kW
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map>
      ),
      code: `const STATUS_COLOR = {
  available: 'bg-green-500',
  busy: 'bg-orange-500',
  offline: 'bg-gray-400',
}

<Map viewport={{ center: [-122.4194, 37.7749], zoom: 11.5 }} className="h-[360px] w-full rounded-lg border">
  {stations.map((s, i) => (
    <MapMarker key={i} longitude={s.coords[0]} latitude={s.coords[1]}>
      <MarkerContent>
        <span className={\`flex size-7 items-center justify-center rounded-full text-white shadow-md ring-2 ring-background \${STATUS_COLOR[s.status]}\`}>
          <Zap className="size-4 fill-current" />
        </span>
      </MarkerContent>
      <MarkerPopup closeButton>
        <p className="font-medium">{s.name}</p>
        <p className="text-xs text-muted-foreground">{STATUS_LABEL[s.status]} · {s.kw} kW</p>
      </MarkerPopup>
    </MapMarker>
  ))}
</Map>`,
    },
    {
      name: 'Heatmap / clustering (NYC)',
      description: 'GeoJSON points clustered into colored circles.',
      render: () => (
        <Map viewport={{ center: [-74.01, 40.73], zoom: 10.5 }} className={mapClass}>
          <MapClusterLayer
            data={NYC_GEOJSON}
            clusterColors={['#eab308', '#f97316', '#ef4444']}
            clusterThresholds={[40, 90]}
            pointColor="#f97316"
          />
        </Map>
      ),
      code: `const geojson = {
  type: 'FeatureCollection',
  features: points.map((coordinates) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates },
    properties: {},
  })),
}

<Map viewport={{ center: [-74.01, 40.73], zoom: 10.5 }} className="h-[360px] w-full rounded-lg border">
  <MapClusterLayer
    data={geojson}
    clusterColors={['#eab308', '#f97316', '#ef4444']}
    clusterThresholds={[40, 90]}
    pointColor="#f97316"
  />
</Map>`,
    },
    {
      name: 'Delivery route (London)',
      description: 'A route line with start/end markers and a vehicle marker.',
      render: () => (
        <Map viewport={{ center: [-0.1, 51.512], zoom: 12 }} className={mapClass}>
          <MapRoute coordinates={LONDON_ROUTE} color="#3b82f6" width={4} />
          <MapMarker longitude={STORE[0]} latitude={STORE[1]}>
            <MarkerContent>
              <span className="size-3 rounded-full bg-green-500 ring-2 ring-background" />
            </MarkerContent>
            <MarkerPopup>
              <p className="font-medium">Store</p>
              <p className="text-xs text-muted-foreground">Order picked up</p>
            </MarkerPopup>
          </MapMarker>
          <MapMarker longitude={LONDON_ROUTE[3][0]} latitude={LONDON_ROUTE[3][1]}>
            <MarkerContent>
              <span className="flex size-7 items-center justify-center rounded-full bg-blue-500 text-white shadow-md ring-2 ring-background">
                <Truck className="size-4" />
              </span>
            </MarkerContent>
            <MarkerPopup>
              <p className="font-medium">Out for delivery</p>
              <p className="text-xs text-muted-foreground">ETA 12 min · 2.1 mi away</p>
            </MarkerPopup>
          </MapMarker>
          <MapMarker longitude={HOME[0]} latitude={HOME[1]}>
            <MarkerContent>
              <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background shadow-md ring-2 ring-background">
                <MapPin className="size-3.5" />
              </span>
            </MarkerContent>
            <MarkerPopup>
              <p className="font-medium">Home</p>
              <p className="text-xs text-muted-foreground">123 Thames St</p>
            </MarkerPopup>
          </MapMarker>
        </Map>
      ),
      code: `<Map viewport={{ center: [-0.1, 51.512], zoom: 12 }} className="h-[360px] w-full rounded-lg border">
  <MapRoute coordinates={route} color="#3b82f6" width={4} />
  <MapMarker longitude={store[0]} latitude={store[1]}>
    <MarkerContent>
      <span className="size-3 rounded-full bg-green-500 ring-2 ring-background" />
    </MarkerContent>
  </MapMarker>
  <MapMarker longitude={vehicle[0]} latitude={vehicle[1]}>
    <MarkerContent>
      <span className="flex size-7 items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-background">
        <Truck className="size-4" />
      </span>
    </MarkerContent>
  </MapMarker>
  <MapMarker longitude={home[0]} latitude={home[1]}>
    <MarkerContent>
      <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-background ring-2 ring-background">
        <MapPin className="size-3.5" />
      </span>
    </MarkerContent>
  </MapMarker>
</Map>`,
    },
  ],
  props: [
    {
      prop: 'viewport',
      type: '{ center: [lng, lat]; zoom: number; ... }',
      description: 'Initial (or controlled) view. Coordinates are [longitude, latitude].',
    },
    {
      prop: 'tiles',
      type: '{ label: string; url: string }[] | false',
      default: 'Light / Voyager / Dark',
      description: 'Selectable basemaps shown as a top-left picker. false hides it.',
    },
    {
      prop: 'theme',
      type: '"light" | "dark"',
      description: 'Fallback basemap theme when no tile picker is used.',
    },
    {
      prop: 'styles',
      type: '{ light?: string; dark?: string }',
      description: 'Override the default CARTO basemaps with custom style URLs.',
    },
    {
      prop: 'projection',
      type: 'ProjectionSpecification',
      description: 'Map projection, e.g. { type: "globe" } for a 3D globe.',
    },
    {
      prop: 'children',
      type: 'ReactNode',
      description:
        'MapMarker, MapRoute, MapClusterLayer, MapControls, MapPopup, MapArc — and overlay elements.',
    },
  ],
}
