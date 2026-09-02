import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Footer from '@/components/ui/Footer'
import Newsletter from '@/components/ui/Newsletter'
import { PartnerDestinationPage } from '@/components/partners/PartnerDestinationPage'
import { getAllPartnerSlugs, getPartner } from '@/data/partners'
import { getSiteUrl } from '@/lib/site-url'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPartnerSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const partner = getPartner(slug)
  if (!partner) return {}
  const siteUrl = getSiteUrl()
  const canonical = `${siteUrl}/partners/${partner.slug}`
  const imageUrl = partner.heroImage.startsWith('http')
    ? partner.heroImage
    : `${siteUrl}${partner.heroImage}`

  return {
    title: `${partner.name} — ${partner.regionName}`,
    description: partner.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: partner.name,
      description: partner.description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: partner.name }],
    },
  }
}

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params
  const partner = getPartner(slug)
  if (!partner) notFound()

  return (
    <>
      <PartnerDestinationPage partner={partner} />
      <div data-site-surface="dark" style={{ background: '#0D0B09', color: '#F7F3EC' }}>
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}
