'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { timeDiff } from '@/lib/timeDiff';
import { IBus } from '@/schemas/buses';
import { BusLoc } from '@/types/BusLoc';

const UniversityLoc: number[] = [22.613093, 92.164563];

const MapComponent = ({
  buses,
  busLoc,
}: {
  buses: IBus[];
  busLoc: BusLoc;
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[] | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map

      mapRef.current = L.map('map').setView([22.65802316870434, 92.17314352612269], 13);

      const varsityIcon = L.icon({
        iconUrl: '/loc-icon.png',
        iconSize: [60, 55],
        iconAnchor: [30, 55],
        popupAnchor: [0, -60],
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© Zero Or One',
      }).addTo(mapRef.current);

      //Ad Univwersity Location
      L.marker(UniversityLoc as L.LatLngExpression, { icon: varsityIcon })
        .bindPopup('Rangamati Science and Technology University')
        .addTo(mapRef.current!);
    }
  }, [busLoc]);

  useEffect(() => {
    if (markersRef.current) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    }

    buses.forEach((bus) => {
      const Loc = busLoc.get(bus.id);
      if (!Loc) return;

      const busIcon = L.icon({
        iconUrl: '/bus-icon.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      });

      const marker = L.marker([Loc.longitude, Loc.latitude] as L.LatLngExpression, { icon: busIcon })
        .bindPopup(
          `
          <div class="text-center">
            <h3 class="font-bold">Bus No - ${bus.id} : ${bus.name}</h3>
            <p>Last Update: ${timeDiff(bus.lastUpdateTime)}</p>
          </div>
        `
        )
        .addTo(mapRef.current!)
        .on('click', () => mapRef.current?.setView([Loc.longitude, Loc.latitude]));

      markersRef.current?.push(marker);
    });
  }, [buses, busLoc]);

  return <div id="map" className="h-[500px] w-full" />;
};
export default MapComponent;
