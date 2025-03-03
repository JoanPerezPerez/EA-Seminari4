import { Schema, Types, model } from 'mongoose';
import { PointOfInterest } from './pointsofinterest.js';

// 1. Create an interface representing a TS object.
export interface ICountry {
  name: string;
  population: number;
  capital: string;
  longitude: number;
  latitude: number;
  pointsofinterest: Types.ObjectId[];// llistat de punts d'interès;
  _id?: string;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const countrySchema = new Schema<ICountry>({
  name: { type: String, required: true },
  population:Number,
  capital: { type: String, required: true },
  latitude:{type: Number, required: true},
  longitude:{type: Number, required: true},
  pointsofinterest: [{ type: Schema.Types.ObjectId, ref: 'PointOfInterest' }]
});

// 3. Create a Model.
export const CountryModel = model('Country', countrySchema);