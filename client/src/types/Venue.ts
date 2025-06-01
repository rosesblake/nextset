export type Venue = {
  id: number;
  name: string;
  lat: number | null;
  lng: number | null;
  city: string;
  state: string;
  full_address: string;
  created_at: string;
  created_by: number;
  capacity?: number;
  street?: string;
  zip_code?: string;
  venue_amenities?: VenueAmenities[];
};

export type Amenities = {
  id: number;
  name: string;
};

export type VenueAmenities = {
  amenities: Amenities;
  amenity_id: number;
  venue_id: number;
};
