import { GitCompare, GitFork, GitMerge, GitPullRequest } from 'lucide-react'
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/ui/timeline'
import type { ComponentDoc } from './types'

const GIT_ITEMS = [
  { id: 1, date: '15 minutes ago', icon: GitFork, title: 'Forked Repository', description: 'Forked the repository to create a new branch for development.' },
  { id: 2, date: '10 minutes ago', icon: GitPullRequest, title: 'Pull Request Submitted', description: 'Submitted PR #342 with new feature implementation.' },
  { id: 3, date: '5 minutes ago', icon: GitCompare, title: 'Comparing Branches', description: 'Received comments on PR. Minor adjustments needed.' },
  { id: 4, icon: GitMerge, title: 'Merged Branch', description: 'Merged the feature branch into main. Ready for deployment.' },
]

const PHASES = [
  { id: 1, date: 'Mar 15, 2024', title: 'Project Kickoff', description: 'Initial team meeting.' },
  { id: 2, date: 'Mar 22, 2024', title: 'Design Phase', description: 'Completed wireframes.' },
  { id: 3, date: 'Apr 5, 2024', title: 'Development Sprint', description: 'Backend development.' },
  { id: 4, date: 'Apr 19, 2024', title: 'Testing & Deployment', description: 'Performance optimization.' },
]

const FEED = [
  { id: 1, action: 'opened a new issue', date: '15 minutes ago', image: 'https://i.pravatar.cc/80?img=1', title: 'Hannah Kandell', description: 'The new component library is not rendering properly.' },
  { id: 2, action: 'commented on', date: '10 minutes ago', image: 'https://i.pravatar.cc/80?img=2', title: 'Chris Tompson', description: 'Hey Hannah, can you share a reproduction?' },
  { id: 3, action: 'assigned you to', date: '5 minutes ago', image: 'https://i.pravatar.cc/80?img=3', title: 'Emma Davis', description: 'Can you take a look at this?' },
  { id: 4, action: 'closed the issue', date: '2 minutes ago', image: 'https://i.pravatar.cc/80?img=5', title: 'Alex Morgan', description: 'The issue has been fixed.' },
]

const MILESTONES = [
  { id: 1, date: 'Mar 15, 2024', title: 'Project Kickoff' },
  { id: 2, date: 'Mar 22, 2024', title: 'Design Phase' },
  { id: 3, date: 'Apr 5, 2024', title: 'Development Sprint' },
  { id: 4, date: 'Apr 19, 2024', title: 'Testing & Deployment' },
  { id: 5, date: 'May 3, 2024', title: 'User Training' },
  { id: 6, date: 'May 17, 2024', title: 'Project Handover' },
]

export const timelineDoc: ComponentDoc = {
  slug: 'timeline',
  name: 'Timeline',
  group: 'Custom',
  description:
    'A composable timeline (from Origin UI) for sequences of events — vertical or horizontal, with active/completed state, icon or avatar indicators, and an alternating layout.',
  usage: (
    <>
      <p>
        <code>Timeline</code> is composable: wrap <code>TimelineItem</code>s
        (each with a numeric <code>step</code>), and inside each use{' '}
        <code>TimelineHeader</code> with <code>TimelineSeparator</code>,{' '}
        <code>TimelineIndicator</code>, <code>TimelineTitle</code>,{' '}
        <code>TimelineDate</code>, and <code>TimelineContent</code>.
      </p>
      <ul>
        <li>
          <code>defaultValue</code> (or controlled <code>value</code> /{' '}
          <code>onValueChange</code>) sets the active step; items at or before it
          render as <strong>completed</strong>.
        </li>
        <li>
          Set <code>orientation="horizontal"</code> for a left-to-right timeline.
        </li>
        <li>
          Put a lucide icon or an <code>{'<img>'}</code> avatar inside{' '}
          <code>TimelineIndicator</code> for richer markers.
        </li>
        <li>
          The alternating layout is achieved with utility classes on{' '}
          <code>TimelineItem</code> (see the zig-zag example).
        </li>
      </ul>
    </>
  ),
  examples: [
    {
      name: 'Vertical with icons',
      description: 'defaultValue={3} marks the first three steps completed.',
      render: () => (
        <div className="max-w-md">
          <Timeline defaultValue={3}>
            {GIT_ITEMS.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="group-data-[orientation=vertical]/timeline:ms-10"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                  <TimelineTitle className="mt-0.5">{item.title}</TimelineTitle>
                  <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7">
                    <item.icon size={14} />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent>
                  {item.description}
                  {item.date && (
                    <TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ),
      code: `<Timeline defaultValue={3}>
  {items.map((item) => (
    <TimelineItem key={item.id} step={item.id}
      className="group-data-[orientation=vertical]/timeline:ms-10">
      <TimelineHeader>
        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
        <TimelineTitle className="mt-0.5">{item.title}</TimelineTitle>
        <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7">
          <item.icon size={14} />
        </TimelineIndicator>
      </TimelineHeader>
      <TimelineContent>
        {item.description}
        <TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>`,
    },
    {
      name: 'Horizontal',
      render: () => (
        <div className="w-full overflow-x-auto">
          <Timeline defaultValue={3} orientation="horizontal">
            {PHASES.map((item) => (
              <TimelineItem key={item.id} step={item.id}>
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
                <TimelineContent>{item.description}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ),
      code: `<Timeline defaultValue={3} orientation="horizontal">
  {items.map((item) => (
    <TimelineItem key={item.id} step={item.id}>
      <TimelineHeader>
        <TimelineSeparator />
        <TimelineDate>{item.date}</TimelineDate>
        <TimelineTitle>{item.title}</TimelineTitle>
        <TimelineIndicator />
      </TimelineHeader>
      <TimelineContent>{item.description}</TimelineContent>
    </TimelineItem>
  ))}
</Timeline>`,
    },
    {
      name: 'Activity feed (avatars)',
      render: () => (
        <div className="max-w-md">
          <Timeline>
            {FEED.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
              >
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                  <TimelineTitle className="mt-0.5">
                    {item.title}{' '}
                    <span className="text-sm font-normal text-muted-foreground">
                      {item.action}
                    </span>
                  </TimelineTitle>
                  <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-primary/10 group-data-[orientation=vertical]/timeline:-left-7">
                    <img alt="" className="size-6 rounded-full" src={item.image} />
                  </TimelineIndicator>
                </TimelineHeader>
                <TimelineContent className="mt-2 rounded-lg border px-4 py-3 text-foreground">
                  {item.description}
                  <TimelineDate className="mt-1 mb-0">{item.date}</TimelineDate>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ),
      code: `<Timeline>
  {items.map((item) => (
    <TimelineItem key={item.id} step={item.id}
      className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8">
      <TimelineHeader>
        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
        <TimelineTitle className="mt-0.5">
          {item.title} <span className="text-sm font-normal text-muted-foreground">{item.action}</span>
        </TimelineTitle>
        <TimelineIndicator className="flex size-6 items-center justify-center border-none bg-primary/10 group-data-[orientation=vertical]/timeline:-left-7">
          <img alt="" className="size-6 rounded-full" src={item.image} />
        </TimelineIndicator>
      </TimelineHeader>
      <TimelineContent className="mt-2 rounded-lg border px-4 py-3 text-foreground">
        {item.description}
        <TimelineDate className="mt-1 mb-0">{item.date}</TimelineDate>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>`,
    },
    {
      name: 'Alternating (zig-zag)',
      render: () => (
        <div className="mx-auto max-w-xl">
          <Timeline defaultValue={3}>
            {MILESTONES.map((item) => (
              <TimelineItem
                key={item.id}
                step={item.id}
                className="w-[calc(50%-1.5rem)] odd:ms-auto even:text-right even:group-data-[orientation=vertical]/timeline:ms-0 even:group-data-[orientation=vertical]/timeline:me-8 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:right-[-1.5rem] even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:translate-x-1/2 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:right-[-1.5rem] even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:translate-x-1/2"
              >
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ),
      code: `<Timeline defaultValue={3}>
  {items.map((item) => (
    <TimelineItem key={item.id} step={item.id}
      className="w-[calc(50%-1.5rem)] odd:ms-auto even:text-right even:group-data-[orientation=vertical]/timeline:ms-0 even:group-data-[orientation=vertical]/timeline:me-8 /* + even:* indicator/separator overrides */">
      <TimelineHeader>
        <TimelineSeparator />
        <TimelineDate>{item.date}</TimelineDate>
        <TimelineTitle>{item.title}</TimelineTitle>
        <TimelineIndicator />
      </TimelineHeader>
    </TimelineItem>
  ))}
</Timeline>`,
    },
  ],
  props: [
    {
      prop: 'Timeline',
      type: '{ defaultValue?, value?, onValueChange?, orientation? }',
      description: 'Root. orientation "vertical" (default) | "horizontal"; defaultValue/value set the active step.',
    },
    {
      prop: 'TimelineItem',
      type: '{ step: number }',
      description: 'A single entry. Items with step <= active value are marked completed.',
    },
    {
      prop: 'TimelineHeader',
      type: '—',
      description: 'Wraps the separator, indicator, title, and date.',
    },
    {
      prop: 'TimelineIndicator',
      type: 'ReactNode',
      description: 'The dot/marker; put an icon or avatar image inside it.',
    },
    {
      prop: 'TimelineSeparator',
      type: '—',
      description: 'The connecting line between items.',
    },
    {
      prop: 'TimelineTitle / TimelineDate / TimelineContent',
      type: 'ReactNode',
      description: 'Title, timestamp, and body content for the item.',
    },
  ],
}
