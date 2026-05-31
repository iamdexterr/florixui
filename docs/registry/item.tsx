import {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from '@/components/ui/item'
import { Button } from '@/components/ui/button'
import type { ComponentDoc } from './types'

export const itemDoc: ComponentDoc = {
  slug: 'item',
  name: 'Item',
  group: 'Display',
  description:
    'A flexible row for displaying a piece of content with optional media, title, description, and actions.',
  usage: (
    <>
      <p>
        Use an <code>Item</code> to present a single record in a list or a
        standalone card-like row: a setting, a file, a person, a notification.
        Compose it from <code>ItemMedia</code>, <code>ItemContent</code> (which
        holds <code>ItemTitle</code> and <code>ItemDescription</code>), and{' '}
        <code>ItemActions</code>. Stack several inside an <code>ItemGroup</code>{' '}
        and divide them with <code>ItemSeparator</code>.
      </p>
      <ul>
        <li>
          <code>ItemGroup</code> renders with <code>role="list"</code>; keep its
          children semantically list-like so assistive tech announces them as a
          group.
        </li>
        <li>
          Put the human-readable label in <code>ItemTitle</code> and supporting
          text in <code>ItemDescription</code> so screen readers get a clear
          primary/secondary hierarchy.
        </li>
        <li>
          Decorative icons in <code>ItemMedia</code> should be hidden from
          assistive tech (e.g. <code>aria-hidden</code>); give image media a
          meaningful <code>alt</code>.
        </li>
        <li>
          Use <code>asChild</code> to turn the whole item into a single
          interactive element (such as a link) instead of nesting controls.
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Basic',
      description: 'Media, content, and a trailing action.',
      render: () => (
        <Item variant="outline" className="max-w-md">
          <ItemMedia variant="icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
            </svg>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Project Atlas</ItemTitle>
            <ItemDescription>Updated 3 minutes ago by Dana.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </ItemActions>
        </Item>
      ),
      code: `<Item variant="outline" className="max-w-md">
  <ItemMedia variant="icon">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </svg>
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Project Atlas</ItemTitle>
    <ItemDescription>Updated 3 minutes ago by Dana.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Open</Button>
  </ItemActions>
</Item>`,
    },
    {
      name: 'Variants',
      description: 'The three border/background styles.',
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-3">
          <Item variant="default">
            <ItemContent>
              <ItemTitle>Default</ItemTitle>
              <ItemDescription>Transparent border.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Outline</ItemTitle>
              <ItemDescription>Visible border.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Muted</ItemTitle>
              <ItemDescription>Subtle filled background.</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      ),
      code: `<Item variant="default">
  <ItemContent>
    <ItemTitle>Default</ItemTitle>
    <ItemDescription>Transparent border.</ItemDescription>
  </ItemContent>
</Item>
<Item variant="outline">
  <ItemContent>
    <ItemTitle>Outline</ItemTitle>
    <ItemDescription>Visible border.</ItemDescription>
  </ItemContent>
</Item>
<Item variant="muted">
  <ItemContent>
    <ItemTitle>Muted</ItemTitle>
    <ItemDescription>Subtle filled background.</ItemDescription>
  </ItemContent>
</Item>`,
    },
    {
      name: 'Group with separators',
      description: 'Several items stacked in an ItemGroup.',
      render: () => (
        <ItemGroup className="max-w-md">
          <Item>
            <ItemContent>
              <ItemTitle>Inbox</ItemTitle>
              <ItemDescription>12 unread messages.</ItemDescription>
            </ItemContent>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemContent>
              <ItemTitle>Drafts</ItemTitle>
              <ItemDescription>3 saved drafts.</ItemDescription>
            </ItemContent>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemContent>
              <ItemTitle>Archive</ItemTitle>
              <ItemDescription>248 archived messages.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      ),
      code: `<ItemGroup className="max-w-md">
  <Item>
    <ItemContent>
      <ItemTitle>Inbox</ItemTitle>
      <ItemDescription>12 unread messages.</ItemDescription>
    </ItemContent>
  </Item>
  <ItemSeparator />
  <Item>
    <ItemContent>
      <ItemTitle>Drafts</ItemTitle>
      <ItemDescription>3 saved drafts.</ItemDescription>
    </ItemContent>
  </Item>
  <ItemSeparator />
  <Item>
    <ItemContent>
      <ItemTitle>Archive</ItemTitle>
      <ItemDescription>248 archived messages.</ItemDescription>
    </ItemContent>
  </Item>
</ItemGroup>`,
    },
    {
      name: 'Header and footer',
      description: 'A full-width header and footer wrapping the content.',
      render: () => (
        <Item variant="outline" className="max-w-md">
          <ItemHeader>
            <ItemTitle>Deployment</ItemTitle>
            <span className="text-xs text-muted-foreground">production</span>
          </ItemHeader>
          <ItemContent>
            <ItemDescription>
              Build succeeded and was promoted automatically.
            </ItemDescription>
          </ItemContent>
          <ItemFooter>
            <span className="text-xs text-muted-foreground">2 minutes ago</span>
            <Button variant="ghost" size="sm">
              View logs
            </Button>
          </ItemFooter>
        </Item>
      ),
      code: `<Item variant="outline" className="max-w-md">
  <ItemHeader>
    <ItemTitle>Deployment</ItemTitle>
    <span className="text-xs text-muted-foreground">production</span>
  </ItemHeader>
  <ItemContent>
    <ItemDescription>
      Build succeeded and was promoted automatically.
    </ItemDescription>
  </ItemContent>
  <ItemFooter>
    <span className="text-xs text-muted-foreground">2 minutes ago</span>
    <Button variant="ghost" size="sm">View logs</Button>
  </ItemFooter>
</Item>`,
    },
  ],
  props: [
    {
      prop: 'variant',
      type: '"default" | "outline" | "muted"',
      default: '"default"',
      description: 'Border and background style of the item.',
    },
    {
      prop: 'size',
      type: '"default" | "sm" | "xs"',
      default: '"default"',
      description: 'Controls padding and gap; smaller sizes also shrink media.',
    },
    {
      prop: 'asChild',
      type: 'boolean',
      default: 'false',
      description:
        'Merge props onto the single child element instead of rendering a <div> (e.g. to make the whole item a link).',
    },
    {
      prop: '...props',
      type: 'React.ComponentProps<"div">',
      description: 'All native div attributes are forwarded.',
    },
  ],
}
