'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaBus, FaSearch, FaRoute } from 'react-icons/fa';
import { Bus, BusRoute } from '@/types/bus';

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-100 animate-pulse rounded-lg"></div>,
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const routes: BusRoute[] = [
    { id: '1', startingPoint: 'Varsity', endingPoint: 'Bonorupa', startTime: '08:00 AM' },
    { id: '2', startingPoint: 'Varsity', endingPoint: 'Reserve Bazar', startTime: '09:00 AM' },
    { id: '3', startingPoint: 'Varsity', endingPoint: 'Bonorupa', startTime: '10:00 AM' },
  ];

  const buses: Bus[] = [
    {
      id: 1,
      name: 'Furomon',
      position: [22.660325, 92.170089],
      lastUpdateTime: '2025-02-01T09:00:00+06:00',
      routeId: '1',
    },
    {
      id: 2,
      name: 'Kachalong',
      position: [22.6621771, 92.1618834],
      lastUpdateTime: '2025-02-01T09:00:00+06:00',
      routeId: '2',
    },
    {
      id: 3,
      name: 'Sajek',
      position: [23.8003, 90.4025],
      lastUpdateTime: '2025-02-01T10:00:00+06:00',
      routeId: '3',
    },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
            <FaBus className="text-4xl" />
            Live Bus Tracking System for RMSTU
          </h1>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search for bus routes..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <MapComponent buses={buses} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaRoute />
                Available Routes
              </h2>
              <div className="space-y-2">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      selectedRoute === route.id ? 'bg-blue-500 text-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <b>Route - {route.id}:</b> {route.startingPoint} to {route.endingPoint}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Route Information</h2>
              {selectedRoute ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <b>Starting Point:</b> {routes.find((r) => r.id === selectedRoute)?.startingPoint}
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Ending Point:</b> {routes.find((r) => r.id === selectedRoute)?.endingPoint}
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Start Time:</b> {routes.find((r) => r.id === selectedRoute)?.startTime}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Select a route to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
