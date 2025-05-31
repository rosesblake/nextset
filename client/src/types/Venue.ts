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
};
