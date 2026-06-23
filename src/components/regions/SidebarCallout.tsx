import type { ReactNode } from 'react'

export function SidebarCallout({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <section className="region-sidebar-callout">
      <div className="region-sidebar-mdx">
        {heading ? (
          <h2 className="region-sidebar-mdx__heading">
            <span className="region-sidebar-mdx__heading-label">Sidebar</span>
            {heading}
          </h2>
        ) : null}
        <div className="region-sidebar-mdx__body">{children}</div>
      </div>
    </section>
  )
}
