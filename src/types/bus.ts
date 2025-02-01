export type Bus = {
  id: number;
  name: string;
  position: [number, number];
  lastUpdateTime: string;
  routeId: string;
};

export type BusRoute = {
  id: string;
  startingPoint: string;
  endingPoint: string;
  startTime: string;
};
