import type { PropDoc } from '../registry/types'

export function PropsTable({ props }: { props: PropDoc[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.prop} className="border-b last:border-0 align-top">
              <td className="px-4 py-2.5 font-mono text-[0.8rem] whitespace-nowrap">
                {p.prop}
              </td>
              <td className="px-4 py-2.5 font-mono text-[0.8rem] text-muted-foreground">
                {p.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-[0.8rem] text-muted-foreground">
                {p.default ?? '—'}
              </td>
              <td className="px-4 py-2.5 text-muted-foreground">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
