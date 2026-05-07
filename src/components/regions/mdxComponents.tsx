import type { MDXComponents } from 'mdx/types'

const bodyStyle = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: 'inherit',
  lineHeight: 1.65,
  color: '#1A1614',
  margin: '0 0 1.1em',
}

export const editorialMdxComponents: MDXComponents = {
  p: (props) => <p {...props} style={bodyStyle} />,
  strong: (props) => <strong {...props} style={{ fontWeight: 600 }} />,
  em: (props) => <em {...props} style={{ fontStyle: 'italic' }} />,
  a: (props) => (
    <a
      {...props}
      style={{
        color: '#722F37',
        textDecoration: 'none',
        borderBottom: '1px solid transparent',
      }}
      className="editorial-mdx-anchor"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        paddingLeft: '1.25em',
        margin: '0 0 1.25em',
        lineHeight: 1.65,
        color: '#1A1614',
      }}
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        paddingLeft: '1.25em',
        margin: '0 0 1.25em',
        lineHeight: 1.65,
        color: '#1A1614',
      }}
    />
  ),
  li: (props) => <li {...props} style={{ marginBottom: '0.35em' }} />,
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid rgba(26,22,20,0.12)', margin: '2rem 0' }} />,
}

const ledeParagraphStyle = {
  ...bodyStyle,
  fontSize: 20,
  lineHeight: 1.65,
}

export const ledeMdxComponents: MDXComponents = {
  ...editorialMdxComponents,
  p: (props) => <p {...props} style={ledeParagraphStyle} />,
}

/** Sidebar MDX: allow styled spans (e.g. short small-caps opener) without affecting body features. */
export const sidebarMdxComponents: MDXComponents = {
  ...editorialMdxComponents,
  span: (props) => <span {...props} />,
}
