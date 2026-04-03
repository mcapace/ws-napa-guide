import Nav from '@/components/ui/Nav'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="grain" style={{ minHeight: '100vh' }}>
      <Nav />
      <div style={{ paddingTop: '200px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Coming Soon</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, color: 'var(--cream)', marginTop: '1rem' }}>Building this section</h1>
        <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--mist)', textDecoration: 'none' }}>&larr; Back to guide</Link>
      </div>
    </div>
  )
}
