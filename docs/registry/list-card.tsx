import {
  ArchiveIcon,
  CheckIcon,
  EyeIcon,
  FileTextIcon,
  FlagIcon,
  ClockIcon,
  TruckIcon,
  FolderIcon,
  MailIcon,
  PhoneIcon,
  ImageIcon,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  StarIcon,
  TagIcon,
  MapPinIcon,
  CalendarIcon,
  DownloadIcon,
  Share2Icon,
  Trash2Icon,
  PencilIcon,
} from 'lucide-react'
import {
  ListCard,
  ListCardChip,
  ListCardGrid,
  ListCardPerson,
} from '@/components/custom/list-card'
import type { ComponentDoc } from './types'

const alertActions = [
  { label: 'View details', icon: EyeIcon },
  { label: 'Mark as safe', icon: CheckIcon },
  { label: 'Add note', icon: FileTextIcon },
  { label: 'Flag', icon: FlagIcon },
  { type: 'separator' as const },
  { label: 'Archive', icon: ArchiveIcon, destructive: true },
]

const alerts = [
  {
    badge: 'Over Limit',
    title: 'Daily cap exceeded',
    description: '3800L over limit at Cairo West station',
    person: 'Khalid Al-Jabari',
    entity: 'Truck #67',
  },
  {
    badge: 'Outside Zone',
    title: 'Refueled beyond assigned area',
    description: '75L at 20km from fuel zone boundary',
    person: 'Adel Al-Zahrani',
    entity: 'Truck #11',
  },
  {
    badge: 'Partial Fills',
    title: 'Multiple small refuels logged',
    description: '6 fills under 20L in 3 days at PetroMax',
    person: 'Tariq Al-Saleh',
    entity: 'Truck #33',
  },
]

const contacts = [
  {
    name: 'Sara Lee',
    role: 'Product Designer',
    team: 'Design',
    email: 'sara@acme.co',
    phone: '+1 555 0142',
  },
  {
    name: 'Marcus Chen',
    role: 'Staff Engineer',
    team: 'Platform',
    email: 'marcus@acme.co',
    phone: '+1 555 0198',
  },
]

const files = [
  {
    name: 'brand-guidelines.pdf',
    size: '4.2 MB',
    date: 'Jun 1, 2026',
    icon: FileTextIcon,
  },
  {
    name: 'q2-report.xlsx',
    size: '1.1 MB',
    date: 'May 28, 2026',
    icon: FileSpreadsheetIcon,
  },
  {
    name: 'launch-assets.zip',
    size: '38 MB',
    date: 'May 24, 2026',
    icon: FileArchiveIcon,
  },
  {
    name: 'hero-banner.png',
    size: '820 KB',
    date: 'May 22, 2026',
    icon: ImageIcon,
  },
  {
    name: 'onboarding.mp4',
    size: '64 MB',
    date: 'May 20, 2026',
    icon: FolderIcon,
  },
  {
    name: 'invoice-0412.pdf',
    size: '96 KB',
    date: 'May 18, 2026',
    icon: FileTextIcon,
  },
]

const products = [
  {
    name: 'Aurora Desk Lamp',
    price: '$89.00',
    tag: 'New',
    rating: '4.8',
    category: 'Lighting',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=120&q=60',
  },
  {
    name: 'Linen Throw Blanket',
    price: '$54.00',
    tag: 'Sale',
    rating: '4.6',
    category: 'Textiles',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=120&q=60',
  },
  {
    name: 'Ceramic Planter Set',
    price: '$32.00',
    tag: 'Popular',
    rating: '4.9',
    category: 'Decor',
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=120&q=60',
  },
]

export const listCardDoc: ComponentDoc = {
  slug: 'list-card',
  name: 'List Card',
  group: 'Custom',
  description:
    'A minimal content card for list and grid layouts. A top row (badge + meta), an optional media thumbnail beside a title and description, a footer, and a corner actions menu — every slot is optional, so it renders any kind of data.',
  usage: (
    <>
      <p>
        <code>ListCard</code> is a slot-based card built for repeating
        collections — alerts, tasks, contacts, files, anything. Drop them into a{' '}
        <code>ListCardGrid</code> (or your own layout) and feed each card from
        your data. Nothing is required except <code>title</code>.
      </p>
      <ul>
        <li>
          <code>media</code> accepts an image URL (rendered as a thumbnail) or
          any node — an icon, an avatar, a chart.
        </li>
        <li>
          <code>actions</code> takes an <code>ActionsMenu</code> item array and
          renders the kebab menu in the corner, or pass your own node.
        </li>
        <li>
          Compose footers with <code>ListCardPerson</code> (avatar + name) and{' '}
          <code>ListCardChip</code> (bordered tag), or pass any content.
        </li>
        <li>
          Set <code>selectable</code> for a checkbox, <code>active</code> to ring
          the card, and <code>onClick</code> to make the whole card a button.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Card grid',
      description:
        'A grid of cards with badges, timestamps, media, footers, and a corner menu.',
      render: () => (
        <ListCardGrid columns={3}>
          {alerts.map((a) => (
            <ListCard
              key={a.title + a.entity}
              badge={a.badge}
              title={a.title}
              description={a.description}
              media="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=120&q=60"
              meta={
                <span className="inline-flex items-center gap-1">
                  <ClockIcon className="size-3" />
                  10:12 AM
                </span>
              }
              actions={alertActions}
              footer={
                <>
                  <ListCardPerson name={a.person} />
                  <span className="text-muted-foreground/50">•</span>
                  <ListCardChip icon={<TruckIcon />}>{a.entity}</ListCardChip>
                </>
              }
            />
          ))}
        </ListCardGrid>
      ),
      code: `<ListCardGrid columns={3}>
  {alerts.map((a) => (
    <ListCard
      key={a.id}
      badge={a.badge}
      title={a.title}
      description={a.description}
      media={a.imageUrl}
      meta={<><ClockIcon className="size-3" /> 10:12 AM</>}
      actions={[
        { label: 'View details', icon: EyeIcon },
        { label: 'Mark as safe', icon: CheckIcon },
        { type: 'separator' },
        { label: 'Archive', icon: ArchiveIcon, destructive: true },
      ]}
      footer={
        <>
          <ListCardPerson name={a.person} />
          <ListCardChip icon={<TruckIcon />}>{a.entity}</ListCardChip>
        </>
      }
    />
  ))}
</ListCardGrid>`,
    },
    {
      name: 'Contacts',
      description: 'Avatar media, contact details in the footer, edit menu.',
      render: () => (
        <ListCardGrid columns={1}>
          {contacts.map((c) => (
            <ListCard
              key={c.email}
              media={
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                  {c.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')}
                </span>
              }
              title={c.name}
              description={c.role}
              badge={c.team}
              actions={[
                { label: 'Edit', icon: PencilIcon },
                { label: 'Share', icon: Share2Icon },
                { type: 'separator' as const },
                { label: 'Remove', icon: Trash2Icon, destructive: true },
              ]}
              footer={
                <>
                  <ListCardChip icon={<MailIcon />}>{c.email}</ListCardChip>
                  <ListCardChip icon={<PhoneIcon />}>{c.phone}</ListCardChip>
                </>
              }
            />
          ))}
        </ListCardGrid>
      ),
      code: `<ListCardGrid columns={1}>
  {contacts.map((c) => (
    <ListCard
      key={c.email}
      media={<Avatar name={c.name} className="size-12" />}
      title={c.name}
      description={c.role}
      badge={c.team}
      actions={[
        { label: 'Edit', icon: PencilIcon },
        { label: 'Remove', icon: Trash2Icon, destructive: true },
      ]}
      footer={
        <>
          <ListCardChip icon={<MailIcon />}>{c.email}</ListCardChip>
          <ListCardChip icon={<PhoneIcon />}>{c.phone}</ListCardChip>
        </>
      }
    />
  ))}
</ListCardGrid>`,
    },
    {
      name: 'Files (row layout)',
      description:
        'Single-line layout: checkbox, type icon, name, then the menu — all on one row.',
      render: () => (
        <ListCardGrid columns={2}>
          {files.map((f) => (
            <ListCard
              key={f.name}
              selectable
              layout="row"
              media={
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <f.icon className="size-5" />
                </span>
              }
              title={f.name}
              description={f.size}
              actions={[
                { label: 'Download', icon: DownloadIcon },
                { label: 'Share', icon: Share2Icon },
                { type: 'separator' as const },
                { label: 'Delete', icon: Trash2Icon, destructive: true },
              ]}
              footer={
                <ListCardChip icon={<CalendarIcon />}>{f.date}</ListCardChip>
              }
            />
          ))}
        </ListCardGrid>
      ),
      code: `<ListCardGrid columns={2}>
  {files.map((f) => (
    <ListCard
      key={f.name}
      selectable
      layout="row"
      media={
        <span className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <f.icon className="size-5" />
        </span>
      }
      title={f.name}
      description={f.size}
      actions={[
        { label: 'Download', icon: DownloadIcon },
        { label: 'Delete', icon: Trash2Icon, destructive: true },
      ]}
      footer={<ListCardChip icon={<CalendarIcon />}>{f.date}</ListCardChip>}
    />
  ))}
</ListCardGrid>`,
    },
    {
      name: 'Products',
      description: 'Image thumbnails, price + rating, clickable cards.',
      render: () => (
        <ListCardGrid columns={2}>
          {products.map((p) => (
            <ListCard
              key={p.name}
              onClick={() => {}}
              media={p.image}
              badge={p.tag}
              title={p.name}
              description={p.price}
              footer={
                <>
                  <ListCardChip icon={<StarIcon />}>{p.rating}</ListCardChip>
                  <ListCardChip icon={<TagIcon />}>{p.category}</ListCardChip>
                </>
              }
            />
          ))}
        </ListCardGrid>
      ),
      code: `<ListCardGrid columns={2}>
  {products.map((p) => (
    <ListCard
      key={p.id}
      onClick={() => openProduct(p.id)}
      media={p.image}
      badge={p.tag}
      title={p.name}
      description={p.price}
      footer={
        <>
          <ListCardChip icon={<StarIcon />}>{p.rating}</ListCardChip>
          <ListCardChip icon={<TagIcon />}>{p.category}</ListCardChip>
        </>
      }
    />
  ))}
</ListCardGrid>`,
    },
    {
      name: 'Minimal',
      description: 'Only a title and description — no media or footer.',
      render: () => (
        <div className="w-full max-w-2xl">
          <ListCard
            title="Weekly report ready"
            description="Your team's summary for May 26 – Jun 1 is available to download."
            meta="2h ago"
          />
        </div>
      ),
      code: `<ListCard
  title="Weekly report ready"
  description="Your team's summary for May 26 – Jun 1 is available."
  meta="2h ago"
/>`,
    },
    {
      name: 'Single row, full width',
      description: 'A wide single card with media, badge, footer, and a menu.',
      render: () => (
        <div className="w-full max-w-3xl">
          <ListCard
            badge="Event"
            title="Design systems meetup"
            description="A hands-on session on tokens, theming, and component APIs."
            media={
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <CalendarIcon className="size-5" />
              </span>
            }
            meta="Jun 12, 6:00 PM"
            actions={[
              { label: 'View details', icon: EyeIcon },
              { label: 'Add to calendar', icon: CalendarIcon },
            ]}
            footer={
              <>
                <ListCardChip icon={<MapPinIcon />}>Hall B, Floor 3</ListCardChip>
                <ListCardChip>42 going</ListCardChip>
              </>
            }
          />
        </div>
      ),
      code: `<ListCard
  badge="Event"
  title="Design systems meetup"
  description="A hands-on session on tokens, theming, and component APIs."
  media={<CalendarIcon className="size-5" />}
  meta="Jun 12, 6:00 PM"
  actions={[{ label: 'View details', icon: EyeIcon }]}
  footer={
    <>
      <ListCardChip icon={<MapPinIcon />}>Hall B, Floor 3</ListCardChip>
      <ListCardChip>42 going</ListCardChip>
    </>
  }
/>`,
    },
  ],
  props: [
    {
      prop: 'title',
      type: 'ReactNode',
      description: 'Primary heading (the only required prop).',
    },
    {
      prop: 'description',
      type: 'ReactNode',
      description: 'Muted secondary line below the title.',
    },
    {
      prop: 'media',
      type: 'ReactNode | string',
      description:
        'A string renders as an image thumbnail; a node renders as-is (icon, avatar).',
    },
    {
      prop: 'badge',
      type: 'ReactNode',
      description:
        'Top-left badge. A string/number uses the default secondary badge.',
    },
    {
      prop: 'meta',
      type: 'ReactNode',
      description: 'Muted text shown in the footer, e.g. a timestamp.',
    },
    {
      prop: 'footer',
      type: 'ReactNode',
      description: 'Footer row — use ListCardPerson / ListCardChip or any nodes.',
    },
    {
      prop: 'actions',
      type: 'ActionsMenuItem[] | ReactNode',
      description: 'Corner kebab menu. An array builds an ActionsMenu.',
    },
    {
      prop: 'selectable',
      type: 'boolean',
      default: 'false',
      description: 'Render a selection checkbox.',
    },
    {
      prop: 'layout',
      type: '"stacked" | "row"',
      default: '"stacked"',
      description:
        'stacked = header + body + footer; row = a single line (checkbox, media, title, menu).',
    },
    {
      prop: 'selected / onSelectedChange',
      type: 'boolean / (checked: boolean) => void',
      description: 'Controlled checkbox state.',
    },
    {
      prop: 'active',
      type: 'boolean',
      default: 'false',
      description: 'Highlight the card with a ring.',
    },
    {
      prop: 'onClick',
      type: '(e) => void',
      description: 'Makes the whole card a button.',
    },
    {
      prop: 'ListCardGrid columns',
      type: '1 | 2 | 3 | 4',
      default: '3',
      description: 'Responsive grid wrapper for laying out cards.',
    },
  ],
}
