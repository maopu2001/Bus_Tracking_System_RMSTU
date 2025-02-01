'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bus } from '@/types/bus';

const MapComponent = ({ buses }: { buses: Bus[] }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      
      // Initialize the map
      mapRef.current = L.map('map').setView([23.8103, 90.4125], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      const busIcon = L.icon({
        iconUrl: '/bus-icon.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      buses.forEach((bus) => {
        L.marker(bus.position as L.LatLngExpression, { icon: busIcon })
          .bindPopup(
            `
            <div class="text-center">
              <h3 class="font-bold">Bus No - ${bus.id} : ${bus.name}</h3>
              <p>Last Update: ${timeDiff(bus.lastUpdateTime)}</p>
            </div>
          `
          )
          .addTo(mapRef.current!);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" className="h-[500px] w-full" />;
};

function timeDiff(date: string) {
  console.log(new Date(date));
  let remTime = Math.abs(Date.now() - new Date(date).getTime());
  const diffDays = Math.floor(remTime / (1000 * 60 * 60 * 24));
  remTime = Math.floor(remTime % (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(remTime / (1000 * 60 * 60));
  remTime = Math.floor(remTime % (1000 * 60 * 60));
  const diffMinutes = Math.floor(remTime / (1000 * 60));
  return `${diffDays > 0 ? diffDays + ' days' : ''} ${diffHours > 0 ? diffHours + ' hours' : ''} ${
    diffMinutes > 0 ? diffMinutes + ' minutes' : ''
  }`;
}
export default MapComponent;
