import { Model, model, models } from 'mongoose';
import busSchema, { IBus } from './buses';
import busRouteSchema, { IBusRoute } from './busRoutes';

let Bus: Model<IBus>;
let BusRoute: Model<IBusRoute>;

export const initializeSchemas = () => {
  Bus = models.Bus || model<IBus>('Bus', busSchema);
  BusRoute = models.BusRoute || model<IBusRoute>('BusRoute', busRouteSchema);
};

export { Bus, BusRoute };
