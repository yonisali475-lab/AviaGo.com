/**
 * Travelpayouts Service
 * Documentation: https://support.travelpayouts.com/hc/en-us/articles/203956163-Travelpayouts-Data-API
 */

const MARKER = import.meta.env.VITE_TRAVELPAYOUTS_MARKER || '12345';
const TOKEN = import.meta.env.VITE_TRAVELPAYOUTS_TOKEN;

// Debug logs (dev only)
if (import.meta.env.DEV) {
  console.log("AviaGo: Travelpayouts Marker utilisé :", MARKER);
  console.log("AviaGo: Travelpayouts Token actif :", TOKEN ? "Configuré ✅" : "Manquant ❌");
}

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
export async function fetchCheapestFlights(params: {
  origin: string;
  destination: string;
  departDate?: string;
  returnDate?: string;
  currency?: string;
}): Promise<{ data: Record<string, FlightPrice>, error?: string }> {
  try {
    const { origin, destination, departDate, returnDate, currency = 'EUR' } = params;
    const query = new URLSearchParams({
      origin,
      destination,
      currency,
      ...(departDate && { departDate }),
      ...(returnDate && { returnDate }),
    });

    const response = await fetch(`/api/flights/cheap?${query.toString()}`);
    
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
 * Searches for locations (cities/airports) via server proxy
 */
export async function searchLocations(term: string): Promise<any[]> {
  if (term.length < 2) return [];
  try {
    const response = await fetch(`/api/locations?term=${encodeURIComponent(term)}`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
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

  const url = `${baseUrl}?${query.toString()}`;
  console.log("AviaGo: Flight Booking URL généré :", url);
  return url;
}

/**
 * Generates a Booking.com affiliate URL
 */
export function getHotelBookingUrl(destination: string, checkIn: string, checkOut: string): string {
  // Format: https://www.booking.com/searchresults.html?ss=Paris&checkin=2026-06-15&checkout=2026-06-20&aid=YOUR_MARKER
  const baseUrl = 'https://www.booking.com/searchresults.html';
  const query = new URLSearchParams({
    ss: destination,
    checkin: checkIn,
    checkout: checkOut,
    aid: MARKER // Using the same marker for simplicity, though Booking.com usually uses a different AID
  });

  const url = `${baseUrl}?${query.toString()}`;
  console.log("AviaGo: Hotel Booking URL généré :", url);
  return url;
}

/**
 * Helper to get airline logo URL
 */
export function getAirlineLogo(iata: string): string {
  return `https://pics.avs.io/200/200/${iata}.png`;
}
