import type { ReactNode } from 'react'

export function SidebarCallout({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <section
      className="region-sidebar-callout"
      style={{
        padding: 'clamp(72px, 11vw, 120px) clamp(24px, 5vw, 48px)',
        borderTop: '1px solid rgba(26,22,20,0.08)',
      }}
    >
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
