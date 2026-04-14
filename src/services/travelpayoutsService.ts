/**
 * Travelpayouts Service
 * Documentation: https://support.travelpayouts.com/hc/en-us/articles/203956163-Travelpayouts-Data-API
 */

const MARKER = import.meta.env.VITE_TRAVELPAYOUTS_MARKER || '12345'; // Default marker if not set

export interface FlightPrice {
  price: number;
  airline: string;
  flight_number: number;
  departure_at: string;
  return_at: string;
  expires_at: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  tripClass: 'Y' | 'C' | 'F'; // Y: Economy, C: Business, F: First
}

/**
 * Fetches the cheapest flight prices from Travelpayouts API via server proxy
 */
export async function fetchCheapestFlights(origin: string, destination: string): Promise<{ data: Record<string, FlightPrice>, error?: string }> {
  try {
    const response = await fetch(
      `/api/flights/cheap?origin=${origin}&destination=${destination}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error fetching flights:', errorData.error);
      return { data: {}, error: errorData.error };
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return { data: data.data[destination] || {} };
    }
    return { data: {} };
  } catch (error) {
    console.error('Error fetching flights from proxy:', error);
    return { data: {}, error: 'Failed to connect to search server' };
  }
}

/**
 * Generates a real affiliate booking URL for Travelpayouts (Aviasales/Jetradar)
 */
export function getBookingUrl(params: SearchParams): string {
  const { origin, destination, departDate, returnDate, adults, children, infants, tripClass } = params;
  
  // Format: https://www.jetradar.com/flights/?origin=NCE&destination=KIX&depart_date=2026-05-12&return_date=2026-05-19&adults=2&children=1&marker=YOUR_MARKER
  const baseUrl = 'https://www.jetradar.com/flights/';
  const query = new URLSearchParams({
    origin,
    destination,
    depart_date: departDate,
    return_date: returnDate,
    adults: adults.toString(),
    children: children.toString(),
    infants: infants.toString(),
    trip_class: tripClass,
    marker: MARKER,
    with_request: 'true'
  });

  return `${baseUrl}?${query.toString()}`;
}

/**
 * Helper to get airline logo URL
 */
export function getAirlineLogo(iata: string): string {
  return `https://pics.avs.io/200/200/${iata}.png`;
}
