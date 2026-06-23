import { Suspense } from 'react'
import { ExploreMap, type ExploreMapProps } from './ExploreMap'

function ExploreMapFallback() {
  return (
    <div
      style={{
        minHeight: 480,
        background: '#FAF7F2',
        color: '#6B6560',
        padding: 48,
        textAlign: 'center',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
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
