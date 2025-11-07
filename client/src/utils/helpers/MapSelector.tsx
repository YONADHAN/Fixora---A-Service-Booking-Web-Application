'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import { useState, useEffect } from 'react'
import L from 'leaflet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Locate, Search, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function LocationMarker({
  position,
  onLocationSelect,
}: {
  position: L.LatLng | null
  onLocationSelect: (
    lat: number,
    lng: number,
    name?: string,
    displayName?: string
  ) => void
}) {
  useMapEvents({
    click: async (e) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
        )
        const data = await res.json()

        const name = data.name || ''
        const displayName = data.display_name || ''

        onLocationSelect(e.latlng.lat, e.latlng.lng, name, displayName)
      } catch (err) {
        console.error('Reverse geocoding failed', err)
        onLocationSelect(e.latlng.lat, e.latlng.lng)
      }
    },
  })

  return position ? <Marker position={position} icon={markerIcon} /> : null
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])

  return null
}

export default function MapSelector({
  onLocationSelect,
}: {
  onLocationSelect: (
    lat: number,
    lng: number,
    name?: string,
    displayName?: string
  ) => void
}) {
  const [position, setPosition] = useState<L.LatLng | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [locating, setLocating] = useState(false)
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    20.5937, 78.9629,
  ])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setSearching(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      )
      const data = await res.json()

      if (data && data.length > 0) {
        const { lat, lon, name, display_name } = data[0]
        const newPos = new L.LatLng(parseFloat(lat), parseFloat(lon))

        setPosition(newPos)
        setMapCenter([parseFloat(lat), parseFloat(lon)])
        onLocationSelect(parseFloat(lat), parseFloat(lon), name, display_name)
      } else {
        toast.error('Location not found. Please try a different search term.')
      }
    } catch (err) {
      console.error('Search failed', err)
      toast.error('Search failed. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.info('Geolocation is not supported by your browser')
      return
    }

    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        const newPos = new L.LatLng(latitude, longitude)

        setPosition(newPos)
        setMapCenter([latitude, longitude])

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()
          const name = data.name || ''
          const displayName = data.display_name || ''

          onLocationSelect(latitude, longitude, name, displayName)
        } catch (err) {
          console.error('Reverse geocoding failed', err)
          onLocationSelect(latitude, longitude)
        }

        setLocating(false)
      },
      (err) => {
        console.error('Geolocation error', err)
        toast.error(
          'Unable to retrieve your location. Please enable location services.'
        )
        setLocating(false)
      }
    )
  }

  const handleInternalLocationSelect = (
    lat: number,
    lng: number,
    name?: string,
    displayName?: string
  ) => {
    setPosition(new L.LatLng(lat, lng))
    onLocationSelect(lat, lng, name, displayName)
  }

  return (
    <div className='flex flex-col gap-3 h-full'>
      <div className='flex gap-2'>
        <div className='relative flex-1'>
          <Input
            type='text'
            placeholder='Search for a location...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className='pr-10'
          />
          <Button
            type='button'
            size='icon'
            variant='ghost'
            className='absolute right-0 top-0 h-full'
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Search className='h-4 w-4' />
            )}
          </Button>
        </div>
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={handleCurrentLocation}
          disabled={locating}
          title='Use current location'
        >
          {locating ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Locate className='h-4 w-4' />
          )}
        </Button>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={5}
        scrollWheelZoom={true}
        className='flex-1 rounded-md border '
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/">OpenStreetMap</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker
          position={position}
          onLocationSelect={handleInternalLocationSelect}
        />
        <MapController center={mapCenter} />
      </MapContainer>

      <p className='text-xs text-muted-foreground'>
        Click on the map to select a location, search for an address, or use
        your current location
      </p>
    </div>
  )
}
