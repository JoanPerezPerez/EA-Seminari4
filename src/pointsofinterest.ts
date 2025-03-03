import mongoose, { Schema, model } from 'mongoose';

// 1. Create an interface representing a TS object.
export interface IPoint {
  _id: mongoose.Types.ObjectId;
  name: string;
  latitude: number;
  longitude: number;
  description: String;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const pointSchema = new Schema<IPoint>({
  name: { type: String, required: true },
  latitude:{type: Number, required: true  },
  longitude:{ type: Number, required: true },
  description: { type: String, required: true }
});

// 3. Create a Model.
export const PointOfInterest = model('PointOfInterest', pointSchema);