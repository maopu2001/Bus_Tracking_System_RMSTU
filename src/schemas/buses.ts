import { Document, Schema } from 'mongoose';

export interface IBus extends Document {
  id: number;
  name: string;
  position: [number, number];
  routeId?: string;
  updatedAt?: string;
}

const busSchema: Schema<IBus> = new Schema(
  {
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
      default: [92.164563, 22.613093],
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: 'BusRoute',
    },
  },
  { timestamps: true }
);

export default busSchema;
