import mongoose from 'mongoose';
import { UserModel, IUser } from './user.js';
import { PointOfInterest, IPoint } from './pointsofinterest.js';
import { CountryModel, ICountry } from './country.js';

async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb+srv://joan:1234@cluster0.3owhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };

  console.log("user1", user1); 
  const newUser= new UserModel(user1);
  const user2: IUser = await newUser.save();
  console.log("user2",user2);

  // findById devuelve un objeto usando el _id.
  const user3: IUser | null = await UserModel.findById(user2._id);
  console.log("user3",user3);

  // findOne devuelve un objeto usando un filtro.
  const user4: IUser | null = await UserModel.findOne({name: 'Bill'});
  console.log("user4",user4);

  // Partial<IUser> Indica que el objeto puede tener solo algunos campos de IUser.
  // select('name email') solo devuelve name y email.
  // lean() devuelve un objeto plano de JS en lugar de un documento de Mongoose.
  const user5: Partial<IUser> | null  = await UserModel.findOne({ name: 'Bill' })
    .select('name email').lean(); // agafo una sola part de tot el json. LLavors al no complir amb el contracte d'usuari es fa un partial de la interfase del usuari.
  console.log("user5",user5);
  const PoI1:  IPoint = {
    "_id" : new mongoose.Types.ObjectId(),
    "name": 'Torre1',
    "latitude": 12,
    "longitude": 12,  
    "description": 'Yess'
  };

  console.log("PoI1", PoI1); 
  const newPoI= new PointOfInterest(PoI1);
  const PoI1DB: IPoint = await newPoI.save();
  console.log("PoI1DB:",PoI1DB);

  const PoI2:  IPoint = {
    "_id" : new mongoose.Types.ObjectId(),
    "name": 'Torre2',
    "latitude": 14,
    "longitude": 18,  
    "description": 'Noooo'
  };

  console.log("PoI2", PoI2); 
  const newPoI2= new PointOfInterest(PoI2);
  const PoI2DB: IPoint = await newPoI2.save();
  console.log("user2",PoI2DB);

  
  const PoIall = await PointOfInterest.find();
  console.log("Point of interest found:", PoIall);

  const PoI2found: IPoint | null = await PointOfInterest.findOne({name: 'Torre2'});
  console.log("Point of interest found by name:", PoI2found);

  const PoI2edit = await PointOfInterest.updateOne({name: 'Torre2'},{$set: {latitude: 22}});
  console.log("Point of interest edited:", PoI2edit);
  const PoI2edited: IPoint | null = await PointOfInterest.findOne({name: 'Torre2'});
  console.log("Point of interest edited:", PoI2edited);

  const PoI2deleted = await PointOfInterest.deleteOne({name: 'Torre2'});
  console.log("Point of interest found:", PoI2found);

  const PoI2deleted2: IPoint | null = await PointOfInterest.findOne({name: 'Torre2'});
  console.log("Point of interest found:", PoI2deleted2);

  const Country1 : ICountry={
    "name": 'Spain',
    "population": 50000000,
    "capital": 'Madrid',
    "latitude": 40,
    "longitude": 3,
    "pointsofinterest": [PoI1DB._id,PoI2DB._id]
  }

  console.log("PoI1", Country1); 
  const newCountry1= new CountryModel(Country1);
  const Country1BD: ICountry = await newCountry1.save();
  console.log("Country found 1:", Country1BD);

  const aggregatedPoI = await PointOfInterest.aggregate([

    {
      $match: { latitude: { $gt: 10 } } // filtra per latitude major que 10
    },
    {
      $count: "total" // Counts matching documents
    }
  ])

  console.log("Aggregated PoI:", aggregatedPoI);
  mongoose.connection.close();
}
//.lean() deixa unicament json, es carrega tot el que ve de mongo.
main()

    
