'use client'

import { useState, useCallback, useRef } from 'react'
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
  type MapRef,
  type LayerProps,
} from 'react-map-gl/mapbox'
import { mapPins, PIN_COLORS, PIN_LABELS, type MapPin } from '@/data/map-pins'
import type { MapPinFilterType, MapRegionFilter } from '@/lib/types'
import { avaBoundaries } from '@/data/ava-boundaries'
import MapSidebar from '@/components/map/MapSidebar'
import MapFilterBar from '@/components/map/MapFilterBar'
import MapLegend from '@/components/map/MapLegend'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!
const NAPA_CENTER: [number, number] = [-122.4194, 38.4700]
const NAPA_BOUNDS: [[number, number], [number, number]] = [
  [-122.720, 38.170],
  [-122.100, 38.720],
]

const avaFillLayer: LayerProps = {
  id: 'ava-fill',
  type: 'fill',
  paint: { 'fill-color': ['get', 'color'], 'fill-opacity': 0.07 },
}
const avaStrokeLayer: LayerProps = {
  id: 'ava-stroke',
  type: 'line',
  paint: {
    'line-color': ['get', 'color'],
    'line-width': 1.5,
    'line-opacity': 0.6,
    'line-dasharray': [3, 2],
  },
}
const avaLabelLayer: LayerProps = {
  id: 'ava-label',
  type: 'symbol',
  layout: {
    'text-field': ['get', 'name'],
    'text-font': ['DIN Pro Italic', 'Arial Unicode MS Regular'],
    'text-size': 11,
    'text-letter-spacing': 0.12,
    'text-transform': 'uppercase',
  },
  paint: {
    'text-color': ['get', 'color'],
    'text-opacity': 0.8,
    'text-halo-color': 'rgba(13,11,9,0.8)',
    'text-halo-width': 2,
  },
}

export default function NapaMap() {
  const mapRef = useRef<MapRef>(null)
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null)
  const [hoveredPin, setHoveredPin] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<MapPinFilterType>('all')
  const [filterRegion, setFilterRegion] = useState<MapRegionFilter>('all')
  const [showAVAs, setShowAVAs] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [zoom, setZoom] = useState(10)

  const visiblePins = mapPins.filter((pin) => {
    if (filterType !== 'all' && pin.type !== filterType) return false
    if (filterRegion !== 'all' && pin.region !== filterRegion) return false
    return true
  })

  const handlePinClick = useCallback((pin: MapPin) => {
    setSelectedPin(pin)
    setSidebarOpen(true)
    mapRef.current?.flyTo({
      center: pin.coords,
      zoom: Math.max(zoom, 13),
      duration: 1200,
      essential: true,
      offset: [190, 0],
    })
  }, [zoom])

  const flyToRegion = useCallback((slug: string) => {
    const feature = avaBoundaries.features.find((f) => f.properties.slug === slug)
    if (!feature) return
    const coords = feature.geometry.coordinates[0]
    const lngs = coords.map((c) => c[0])
    const lats = coords.map((c) => c[1])
    mapRef.current?.flyTo({
      center: [(Math.min(...lngs) + Math.max(...lngs)) / 2, (Math.min(...lats) + Math.max(...lats)) / 2],
      zoom: 12.5,
      duration: 1400,
      essential: true,
    })
  }, [])

  const resetView = useCallback(() => {
    mapRef.current?.flyTo({ center: NAPA_CENTER, zoom: 10, pitch: 45, bearing: -15, duration: 1200, essential: true })
    setSelectedPin(null)
    setSidebarOpen(false)
    setFilterType('all')
    setFilterRegion('all')
  }, [])

  const handleMapLoad = useCallback(() => {
    setMapLoaded(true)
    const map = mapRef.current?.getMap()
    if (!map) return
    // Subtle atmosphere for satellite style
    map.setFog({
      color: 'rgb(240,235,225)',
      'high-color': 'rgb(200,220,240)',
      'horizon-blend': 0.02,
      'space-color': 'rgb(150,180,210)',
      'star-intensity': 0.0,
    })
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: NAPA_CENTER[0],
          latitude: NAPA_CENTER[1],
          zoom: 10,
          pitch: 45,
          bearing: -15,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        maxBounds={NAPA_BOUNDS}
        onLoad={handleMapLoad}
        onMove={() => { if (mapRef.current) setZoom(mapRef.current.getZoom()) }}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.4 }}
        onClick={(e) => {
          if (!(e.originalEvent.target as HTMLElement).closest('.map-pin')) {
            setSelectedPin(null)
          }
        }}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />

        {showAVAs && (
          <Source id="ava-boundaries" type="geojson" data={avaBoundaries}>
            <Layer {...avaFillLayer} />
            <Layer {...avaStrokeLayer} />
            <Layer {...avaLabelLayer} />
          </Source>
        )}

        <NavigationControl position="bottom-right" visualizePitch />
        <ScaleControl position="bottom-left" />

        {visiblePins.map((pin) => (
          <Marker
            key={pin.id}
            longitude={pin.coords[0]}
            latitude={pin.coords[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              handlePinClick(pin)
            }}
          >
            <PinMarker
              pin={pin}
              isSelected={selectedPin?.id === pin.id}
              isHovered={hoveredPin === pin.id}
              onHover={setHoveredPin}
            />
          </Marker>
        ))}

        {/* Hover tooltip */}
        {hoveredPin && zoom > 12 && !selectedPin && (() => {
          const pin = mapPins.find((p) => p.id === hoveredPin)
          if (!pin) return null
          return (
            <Popup
              longitude={pin.coords[0]}
              latitude={pin.coords[1]}
              anchor="bottom"
              offset={[0, -44]}
              closeButton={false}
              closeOnClick={false}
            >
              <div
                style={{
                  background: 'rgba(13,11,9,0.95)',
                  border: '1px solid rgba(247,243,236,0.08)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  padding: '0.65rem 1rem',
                  backdropFilter: 'blur(8px)',
                  maxWidth: '200px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: '#F7F3EC',
                    marginBottom: '2px',
                    lineHeight: 1.2,
                  }}
                >
                  {pin.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem',
                    color: PIN_COLORS[pin.type],
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {PIN_LABELS[pin.type]}
                  {pin.rating ? ` · ${pin.rating}pts` : ''}
                  {pin.priceRange ? ` · ${pin.priceRange}` : ''}
                </p>
              </div>
            </Popup>
          )
        })()}
      </Map>

      <MapFilterBar
        filterType={filterType}
        filterRegion={filterRegion}
        showAVAs={showAVAs}
        onTypeChange={setFilterType}
        onRegionChange={(region) => {
          setFilterRegion(region)
          if (region !== 'all') flyToRegion(region)
        }}
        onToggleAVAs={() => setShowAVAs((v) => !v)}
        onReset={resetView}
        visibleCount={visiblePins.length}
      />

      <MapSidebar pin={selectedPin} isOpen={sidebarOpen} onClose={() => { setSidebarOpen(false); setSelectedPin(null) }} />
      <MapLegend />

      {/* Loading */}
      {!mapLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0D0B09',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            zIndex: 50,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C4943A',
            }}
          >
            Wine Spectator
          </span>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontStyle: 'italic',
              color: '#F7F3EC',
            }}
          >
            Loading Napa Valley…
          </p>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: '#6B1C2A',
              animation: 'loadPulse 1.5s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes loadPulse {
              0%,100%{opacity:0.2;transform:scaleX(0.4)}
              50%{opacity:1;transform:scaleX(1)}
            }
          `}</style>
        </div>
      )}

      <style>{`
        .mapboxgl-popup-content{background:transparent!important;padding:0!important;box-shadow:none!important;border-radius:0!important;}
        .mapboxgl-popup-tip{display:none!important;}
        .mapboxgl-ctrl-group{background:rgba(13,11,9,0.92)!important;border:1px solid rgba(247,243,236,0.08)!important;backdrop-filter:blur(8px);box-shadow:0 2px 12px rgba(0,0,0,0.3)!important;}
        .mapboxgl-ctrl-group button{background:transparent!important;}
        .mapboxgl-ctrl-scale{background:rgba(13,11,9,0.85)!important;border-color:rgba(247,243,236,0.08)!important;color:#9b9283!important;font-family:var(--font-body)!important;font-size:10px!important;}
      `}</style>
    </div>
  )
}

function PinMarker({ pin, isSelected, isHovered, onHover }: {
  pin: MapPin; isSelected: boolean; isHovered: boolean; onHover: (id: string | null) => void
}) {
  const color = PIN_COLORS[pin.type]
  const isActive = isSelected || isHovered

  return (
    <div
      className="map-pin"
      onMouseEnter={() => onHover(pin.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: isActive ? 'scale(1.25) translateY(-2px)' : 'scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        filter: isSelected ? `drop-shadow(0 0 10px ${color}60)` : 'drop-shadow(0 2px 4px rgba(28,22,18,0.3))',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: isSelected ? '34px' : '26px',
          height: isSelected ? '34px' : '26px',
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
          background: isSelected ? color : `${color}DD`,
          border: `2px solid ${isSelected ? '#F7F3EC' : 'rgba(247,243,236,0.6)'}`,
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(45deg)', lineHeight: 1 }}>
          {pin.type === 'winery' && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M7 2l5 8 5-8M7 2H5l2 8h10l2-8h-2M9 10v12M15 10v12M9 22h6"/>
            </svg>
          )}
          {pin.type === 'restaurant' && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
            </svg>
          )}
          {pin.type === 'hotel' && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M3 22V8a2 2 0 012-2h14a2 2 0 012 2v14M3 22h18M9 22v-4h6v4"/>
              <rect x="9" y="10" width="2" height="2"/>
              <rect x="13" y="10" width="2" height="2"/>
            </svg>
          )}
        </div>
      </div>

      {pin.rating && isSelected && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-14px',
            background: '#6B1C2A',
            color: '#F7F3EC',
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            padding: '1px 5px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(28,22,18,0.2)',
          }}
        >
          {pin.rating}
        </div>
      )}
    </div>
  )
}
