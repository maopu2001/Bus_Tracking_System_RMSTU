import { Document, Schema } from 'mongoose';

export interface IBus extends Document {
  id: number;
  name: string;
  position: [number, number];
  lastUpdateTime: string;
  routeId?: string;
}

const busSchema: Schema<IBus> = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: [Number],
    required: true,
  },
  lastUpdateTime: {
    type: String,
    required: true,
  },
  routeId: {
    type: Schema.Types.ObjectId,
    ref: 'BusRoute',
  },
});

export default busSchema;
