import { useState } from "react";
import {
  CheckIcon,
  ChevronLeftIcon,
  CodeIcon,
  CopyIcon,
  EyeIcon,
  GitCommitVerticalIcon,
  ImageIcon,
  PackageIcon,
  PencilIcon,
  StarIcon,
  TagIcon,
  TrendingUpIcon,
  TruckIcon,
} from "lucide-react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Map, MapMarker } from "@/components/ui/map";
import { Separator } from "@/components/ui/separator";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { CustomTabs } from "@/components/custom/custom-tabs";
import { ActionsMenu } from "@/components/custom/actions-menu";
import { QuickStat } from "@/components/custom/quick-stat";
import { DefRow } from "@/components/custom/def-row";
import { StatCard } from "@/components/custom/stat-card";

import source from "./DetailPageExample.tsx?raw";

// ============================================================================
// Demo data
// ============================================================================

const PRODUCT = {
  name: 'HP Pavilion 16.1" Gaming Laptop',
  sku: "SKU-RCH45Q1A",
  status: "Active" as const,
  category: "Electronics",
  price: 960.99,
  stock: 5,
  rating: 4.9,
  sales: 982,
  // Optional product image — falls back to a placeholder icon when absent.
  image: "https://picsum.photos/seed/hp-pavilion/200/200",
  description:
    "A 16.1-inch gaming laptop with a 144Hz display, RTX graphics, and a fast NVMe SSD. Built for sustained performance and everyday portability.",
};

const SPECS: [string, string][] = [
  ["Brand", "HP"],
  ["Model", "Pavilion 16-a0xxx"],
  ["Display", '16.1" FHD 144Hz'],
  ["Processor", "Intel Core i7-10750H"],
  ["Memory", "16 GB DDR4"],
  ["Storage", "512 GB NVMe SSD"],
  ["Graphics", "NVIDIA GeForce GTX 1660 Ti"],
  ["Weight", "2.33 kg"],
];

const SALES = [
  { month: "Jan", units: 42 },
  { month: "Feb", units: 58 },
  { month: "Mar", units: 51 },
  { month: "Apr", units: 73 },
  { month: "May", units: 66 },
  { month: "Jun", units: 88 },
];

const SALES_CONFIG = {
  units: { label: "Units sold", color: "var(--chart-1)" },
} satisfies ChartConfig;

// Warehouses stocking this product — [longitude, latitude].
const WAREHOUSES = [
  { id: "w1", city: "San Francisco", coords: [-122.4194, 37.7749] as [number, number], stock: 3 },
  { id: "w2", city: "Austin", coords: [-97.7431, 30.2672] as [number, number], stock: 1 },
  { id: "w3", city: "New York", coords: [-74.006, 40.7128] as [number, number], stock: 1 },
];

const ACTIVITY = [
  { id: 4, title: "Price updated to $960.99", date: "2h ago", icon: TagIcon },
  {
    id: 3,
    title: "Restocked — 20 units received",
    date: "Yesterday",
    icon: PackageIcon,
  },
  {
    id: 2,
    title: "Shipment SH-2231 delivered",
    date: "3 days ago",
    icon: TruckIcon,
  },
  {
    id: 1,
    title: "Product created",
    date: "Mar 2, 2026",
    icon: GitCommitVerticalIcon,
  },
];

// ============================================================================
// Detail page
// ============================================================================

/** Optional product thumbnail with an icon fallback when no image is set. */
function ProductThumb({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <ImageIcon className="size-6 text-muted-foreground" />
      )}
    </div>
  );
}

function DetailPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              aria-label="Back to products"
              asChild
              className="mt-1 shrink-0"
            >
              <a href="#/list-page">
                <ChevronLeftIcon className="size-4" />
              </a>
            </Button>
            <ProductThumb src={PRODUCT.image} alt={PRODUCT.name} />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {PRODUCT.name}
                </h1>
                <Badge variant="green">{PRODUCT.status}</Badge>
              </div>
              {/* SKU + quick stats on one line, divided by vertical rules */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 [&>[data-slot=separator]]:h-4">
                <span className="font-mono text-sm text-muted-foreground">
                  {PRODUCT.sku}
                </span>
                <Separator orientation="vertical" />
                <QuickStat
                  icon={<TagIcon />}
                  value={`$${PRODUCT.price.toFixed(2)}`}
                />
                <Separator orientation="vertical" />
                <QuickStat
                  icon={<PackageIcon />}
                  label="in stock"
                  value={PRODUCT.stock}
                />
                <Separator orientation="vertical" />
                <QuickStat
                  icon={<StarIcon className="fill-orange text-orange" />}
                  value={PRODUCT.rating}
                />
                <Separator orientation="vertical" />
                <QuickStat
                  icon={<TrendingUpIcon />}
                  label="sold"
                  value={PRODUCT.sales}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              startItem={<PencilIcon className="size-3.5" />}
            >
              Edit
            </Button>
            <ActionsMenu
              items={[
                { label: "Duplicate" },
                { label: "Export" },
                { type: "separator" },
                { label: "Delete", destructive: true },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <CustomTabs
        type="underline"
        value={tab}
        onValueChange={setTab}
        items={[
          { value: "overview", label: "Overview" },
          { value: "specs", label: "Specifications" },
          { value: "activity", label: "Activity" },
        ]}
      />

      {/* Panels */}
      {tab === "overview" && (
        <div className="space-y-5">
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Revenue"
              value="$48.0k"
              color="success"
              trend={{ value: "+12.4%", direction: "up", label: "30d" }}
            />
            <StatCard title="Units sold" value="378" color="primary" />
            <StatCard
              title="Views"
              value="12.6k"
              color="primary"
              trend={{ value: "+4.1%", direction: "up", label: "30d" }}
            />
            <StatCard
              title="Return rate"
              value="2.3%"
              color="warning"
              trend={{ value: "-0.4%", direction: "down", label: "30d" }}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="space-y-5">
            {/* Sales chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Units sold</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={SALES_CONFIG}
                  className="h-[200px] w-full"
                >
                  <AreaChart accessibilityLayer data={SALES}>
                    <defs>
                      <linearGradient id="fillUnits" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--color-units)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-units)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      dataKey="units"
                      type="natural"
                      stroke="var(--color-units)"
                      strokeWidth={2}
                      fill="url(#fillUnits)"
                      fillOpacity={1}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {PRODUCT.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Pricing &amp; inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                <DefRow label="Price" value={`$${PRODUCT.price.toFixed(2)}`} />
                <DefRow label="Stock" value={`${PRODUCT.stock} units`} />
                <DefRow label="Category" value={PRODUCT.category} />
                <DefRow
                  label="Rating"
                  value={
                    <span className="inline-flex items-center gap-1">
                      ★ {PRODUCT.rating}
                    </span>
                  }
                />
              </CardContent>
            </Card>
          </div>

          {/* Side column */}
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Availability
                  </span>
                  <Badge variant="green">{PRODUCT.status}</Badge>
                </div>
                <Separator />
                <DefRow label="SKU" value={PRODUCT.sku} />
                <DefRow label="Updated" value="2h ago" />
              </CardContent>
            </Card>

            {/* Stock locations map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Stock locations</CardTitle>
              </CardHeader>
              <CardContent>
                <Map
                  viewport={{ center: [-98, 39], zoom: 2.4 }}
                  className="h-[180px] w-full overflow-hidden rounded-lg border"
                >
                  {WAREHOUSES.map((w) => (
                    <MapMarker
                      key={w.id}
                      longitude={w.coords[0]}
                      latitude={w.coords[1]}
                    >
                      <span className="flex size-3 items-center justify-center rounded-full bg-primary ring-2 ring-background" />
                    </MapMarker>
                  ))}
                </Map>
                <div className="mt-3 space-y-1">
                  {WAREHOUSES.map((w) => (
                    <DefRow
                      key={w.id}
                      label={w.city}
                      value={`${w.stock} in stock`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      )}

      {tab === "specs" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Technical specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-x-8 sm:grid-cols-2">
            {SPECS.map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center justify-between gap-4 py-2",
                  i < SPECS.length - (SPECS.length % 2 === 0 ? 2 : 1) &&
                    "border-b",
                )}
              >
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "activity" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline defaultValue={ACTIVITY.length}>
              {ACTIVITY.map((item) => (
                <TimelineItem
                  key={item.id}
                  step={item.id}
                  className="group-data-[orientation=vertical]/timeline:ms-10"
                >
                  <TimelineHeader>
                    <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                    <TimelineTitle className="mt-0.5">
                      {item.title}
                    </TimelineTitle>
                    <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7">
                      <item.icon size={14} />
                    </TimelineIndicator>
                  </TimelineHeader>
                  <TimelineContent>
                    <TimelineDate className="mt-1 mb-0">
                      {item.date}
                    </TimelineDate>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ============================================================================
// Page wrapper — live preview + "View code" toggle
// ============================================================================

export function DetailPageExample() {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      {showCode ? (
        <pre className="max-h-[70svh] overflow-auto rounded-xl border bg-muted/40 p-4 text-xs leading-relaxed">
          <code>{source}</code>
        </pre>
      ) : (
        <DetailPage />
      )}

      {/* Pattern toolbar — at the bottom */}
      <div className="flex items-center justify-between gap-3 border-t pt-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Pattern
          </h2>
          <p className="text-xs text-muted-foreground">
            A record header with status and actions, tabbed panels, and card
            sections.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode((s) => !s)}
          >
            {showCode ? <EyeIcon /> : <CodeIcon />}
            {showCode ? "Preview" : "View code"}
          </Button>
          {showCode && (
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
