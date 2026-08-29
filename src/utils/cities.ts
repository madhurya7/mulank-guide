export interface City {
  key: string;
  label: string;
  group: string;
  lat: number;
  lon: number;
  tz: string;
}

export const CITIES: City[] = [
  // India
  { key: "delhi", label: "New Delhi, India", group: "India", lat: 28.6139, lon: 77.209, tz: "Asia/Kolkata" },
  { key: "mumbai", label: "Mumbai, India", group: "India", lat: 19.076, lon: 72.8777, tz: "Asia/Kolkata" },
  { key: "kolkata", label: "Kolkata, India", group: "India", lat: 22.5726, lon: 88.3639, tz: "Asia/Kolkata" },
  { key: "chennai", label: "Chennai, India", group: "India", lat: 13.0827, lon: 80.2707, tz: "Asia/Kolkata" },
  { key: "bengaluru", label: "Bengaluru, India", group: "India", lat: 12.9716, lon: 77.5946, tz: "Asia/Kolkata" },
  { key: "hyderabad", label: "Hyderabad, India", group: "India", lat: 17.385, lon: 78.4867, tz: "Asia/Kolkata" },

  // USA & Canada
  { key: "newyork", label: "New York, USA", group: "USA & Canada", lat: 40.7128, lon: -74.006, tz: "America/New_York" },
  { key: "chicago", label: "Chicago, USA", group: "USA & Canada", lat: 41.8781, lon: -87.6298, tz: "America/Chicago" },
  { key: "denver", label: "Denver, USA", group: "USA & Canada", lat: 39.7392, lon: -104.9903, tz: "America/Denver" },
  { key: "sanfran", label: "San Francisco, USA", group: "USA & Canada", lat: 37.7749, lon: -122.4194, tz: "America/Los_Angeles" },
  { key: "toronto", label: "Toronto, Canada", group: "USA & Canada", lat: 43.6532, lon: -79.3832, tz: "America/Toronto" },
  { key: "vancouver", label: "Vancouver, Canada", group: "USA & Canada", lat: 49.2827, lon: -123.1207, tz: "America/Vancouver" },

  // Europe
  { key: "london", label: "London, UK", group: "Europe", lat: 51.5074, lon: -0.1278, tz: "Europe/London" },
  { key: "paris", label: "Paris, France", group: "Europe", lat: 48.8566, lon: 2.3522, tz: "Europe/Paris" },
  { key: "berlin", label: "Berlin, Germany", group: "Europe", lat: 52.52, lon: 13.405, tz: "Europe/Berlin" },
  { key: "madrid", label: "Madrid, Spain", group: "Europe", lat: 40.4168, lon: -3.7038, tz: "Europe/Madrid" },
  { key: "rome", label: "Rome, Italy", group: "Europe", lat: 41.9028, lon: 12.4964, tz: "Europe/Rome" },
  { key: "moscow", label: "Moscow, Russia", group: "Europe", lat: 55.7558, lon: 37.6173, tz: "Europe/Moscow" },

  // Asia & Oceania
  { key: "dubai", label: "Dubai, UAE", group: "Asia & Oceania", lat: 25.2048, lon: 55.2708, tz: "Asia/Dubai" },
  { key: "singapore", label: "Singapore", group: "Asia & Oceania", lat: 1.3521, lon: 103.8198, tz: "Asia/Singapore" },
  { key: "tokyo", label: "Tokyo, Japan", group: "Asia & Oceania", lat: 35.6762, lon: 139.6503, tz: "Asia/Tokyo" },
  { key: "sydney", label: "Sydney, Australia", group: "Asia & Oceania", lat: -33.8688, lon: 151.2093, tz: "Australia/Sydney" },
];

export const CITY_MAP: Record<string, City> = Object.fromEntries(CITIES.map((c) => [c.key, c]));

export const DEFAULT_CITY_KEY = "delhi";
