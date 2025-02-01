import { Document, Schema } from 'mongoose';

export interface IBusRoute extends Document {
  id: number;
  startingPoint: string;
  endingPoint: string;
  startTime: string;
}

const busRouteSchema: Schema<IBusRoute> = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  startingPoint: {
    type: String,
    required: true,
  },
  endingPoint: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
});
export default busRouteSchema;
