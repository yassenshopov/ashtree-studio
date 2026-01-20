"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";

const LOCATION = {
  lat: 42.6977,
  lng: 23.3219,
};

const LIGHT_TILES = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const DARK_TILES = {
  url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export default function AboutMap() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");
  const tileConfig = useMemo(() => (isDark ? DARK_TILES : LIGHT_TILES), [isDark]);

  if (!mounted) {
    return <div className="h-full w-full" aria-hidden="true" />;
  }

  return (
    <MapContainer
      center={[LOCATION.lat, LOCATION.lng]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer url={tileConfig.url} attribution={tileConfig.attribution} />
      <CircleMarker
        center={[LOCATION.lat, LOCATION.lng]}
        radius={8}
        pathOptions={{
          color: isDark ? "#6ee7b7" : "#0f5132",
          fillColor: isDark ? "#10b981" : "#22c55e",
          fillOpacity: 0.9,
        }}
      />
    </MapContainer>
  );
}
