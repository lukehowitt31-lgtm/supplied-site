import fs from "fs";
import path from "path";

export interface MapPin {
  cx: number;
  cy: number;
  label: string;
  lat: number;
  lng: number;
}

export interface PinLocation {
  lat: number;
  lng: number;
  label: string;
}

const VB_WIDTH = 210;
const VB_HEIGHT = 100;

export const DEFAULT_SOURCING_LOCATIONS: PinLocation[] = [
  { lat: 68.26, lng: -0.99, label: "United Kingdom" },
  { lat: 52.02, lng: 25.77, label: "Bulgaria" },
  { lat: 67.14, lng: 20.99, label: "Poland" },
  { lat: 13.67, lng: 113.94, label: "China" },
  { lat: 46.43, lng: 34.51, label: "Turkey" },
  { lat: 59.93, lng: 24.65, label: "Romania" },
  { lat: 51.48, lng: -80.7, label: "East-Coast US" },
  { lat: -72.66, lng: 150.0, label: "Australia" },
  { lat: 4.63, lng: 79.3, label: "India" },
  { lat: 76.59, lng: 15.35, label: "Sweden" },
  { lat: 67.37, lng: 4.93, label: "Netherlands" },
  { lat: 66.2, lng: 12.82, label: "Germany" },
];

/**
 * Exact SVG coordinates from the user's pin placement on the test page.
 * Used on the homepage to avoid any projection rounding differences.
 */
export const HOMEPAGE_PINS: MapPin[] = [
  { cx: 104.4, cy: 23.7, lat: 68.26, lng: -0.99, label: "United Kingdom" },
  { cx: 120.0, cy: 33.0, lat: 52.02, lng: 25.77, label: "Bulgaria" },
  { cx: 117.2, cy: 24.6, lat: 67.14, lng: 20.99, label: "Poland" },
  { cx: 171.5, cy: 46.2, lat: 13.67, lng: 113.94, label: "China" },
  { cx: 125.1, cy: 35.4, lat: 46.43, lng: 34.51, label: "Turkey" },
  { cx: 119.4, cy: 29.1, lat: 59.93, lng: 24.65, label: "Romania" },
  { cx: 57.9, cy: 33.3, lat: 51.48, lng: -80.7, label: "East-Coast US" },
  { cx: 192.5, cy: 79.9, lat: -72.66, lng: 150.0, label: "Australia" },
  { cx: 151.3, cy: 48.7, lat: 4.63, lng: 79.3, label: "India" },
  { cx: 114.0, cy: 15.9, lat: 76.59, lng: 15.35, label: "Sweden" },
  { cx: 107.9, cy: 24.4, lat: 67.37, lng: 4.93, label: "Netherlands" },
  { cx: 112.5, cy: 25.2, lat: 66.2, lng: 12.82, label: "Germany" },
];

/** Mercator projection: lat/lng → SVG coordinates for a 210×100 viewBox. */
export function latLngToSvg(lat: number, lng: number): { cx: number; cy: number } {
  const x = ((lng + 180) / 360) * VB_WIDTH;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = VB_HEIGHT / 2 - (VB_HEIGHT * mercN) / (2 * Math.PI);
  return { cx: x, cy: y };
}

/** Reverse Mercator projection: SVG coordinates → lat/lng. */
export function svgToLatLng(cx: number, cy: number): { lat: number; lng: number } {
  const lng = (cx / VB_WIDTH) * 360 - 180;
  const mercN = ((VB_HEIGHT / 2 - cy) * Math.PI) / (VB_HEIGHT / 2);
  const lat = (2 * Math.atan(Math.exp(mercN)) - Math.PI / 2) * (180 / Math.PI);
  return { lat: Math.round(lat * 100) / 100, lng: Math.round(lng * 100) / 100 };
}

/** Compute SVG pin positions for a set of sourcing locations. */
export function getDefaultPins(locations: PinLocation[] = DEFAULT_SOURCING_LOCATIONS): MapPin[] {
  return locations.map((loc) => {
    const { cx, cy } = latLngToSvg(loc.lat, loc.lng);
    return { cx, cy, label: loc.label, lat: loc.lat, lng: loc.lng };
  });
}

/**
 * Read the world-map SVG from public/ and return the raw circle HTML
 * with fill attributes stripped (so they inherit from a parent <g>).
 */
export function loadMapDotsHtml(): { dotsHtml: string; viewBox: string } {
  const svgPath = path.join(process.cwd(), "public/images/world-map.svg");
  const svgContent = fs.readFileSync(svgPath, "utf8");

  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch?.[1] || `0 0 ${VB_WIDTH} ${VB_HEIGHT}`;

  const dotsHtml = svgContent
    .replace(/<svg[^>]*>[\s]*/, "")
    .replace(/[\s]*<\/svg>/, "")
    .replace(/ fill="#00000040"/g, "")
    .trim();

  return { dotsHtml, viewBox };
}
