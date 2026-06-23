import { Suspense } from 'react'
import { ExploreMap, type ExploreMapProps } from './ExploreMap'

function ExploreMapFallback() {
  return (
    <div style={{ minHeight: 480, background: '#0D0B09', color: '#9B9283', padding: 48, textAlign: 'center' }}>
      Loading map…
    </div>
  )
}

export function ExploreMapSection(props: ExploreMapProps) {
  return (
    <Suspense fallback={<ExploreMapFallback />}>
      <ExploreMap {...props} />
    </Suspense>
  )
}
