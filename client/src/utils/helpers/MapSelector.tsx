'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function LocationMarker({
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

  useMapEvents({
    click: async (e) => {
      setPosition(e.latlng)

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
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Center: India
      zoom={5}
      scrollWheelZoom={true}
      className='h-64 w-full rounded-md border'
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/">OpenStreetMap</a>'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  )
}
