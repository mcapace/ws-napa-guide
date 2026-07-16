import { redirect } from 'next/navigation'

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const q = new URLSearchParams()
  if (params.region && typeof params.region === 'string') {
    q.set('ava', params.region)
  }
  if (params.category && typeof params.category === 'string') {
    const cat = params.category
    if (cat === 'restaurant') q.set('category', 'dining')
    else if (cat === 'hotel') q.set('category', 'stay')
    else q.set('category', cat)
  }
  if (params.place && typeof params.place === 'string') {
    q.set('place', params.place)
  }
  const query = q.toString()
  redirect(query ? `/explore?${query}` : '/explore')
}
