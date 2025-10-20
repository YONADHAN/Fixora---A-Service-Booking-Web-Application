export interface LocationData {
  type?: string
  name: string
  displayName: string
  zipCode: string
  coordinates: [number, number]
}

export interface LocationSuggestion {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address?: {
    postcode?: string
    city?: string
    town?: string
    village?: string
    state?: string
    country?: string
  }
}
