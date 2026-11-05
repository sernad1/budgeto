import mongoose from 'mongoose';
import dns from 'dns';

try{
    dns.setServers(['8.8.8.8', '1.1.1.1']);

}catch(e){
    //ignoruj jesli serwere sa juz skonfigorowane
}



const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI){
    throw new Error('Brak MONGODB_URI w pliku .env.local');

}

interface MongooseCache{
    conn : typeof mongoose | null;
    promise : Promise<typeof mongoose> | null;

}

declare global { 
    var mongooseCache : MongooseCache | undefined;
}

let cached = global.mongooseCache || {conn: null, promise : null};

if(!global.mongooseCache){
    global.mongooseCache = cached;
}

export async function connectDB(){
    if(cached.conn) return cached.conn;

    if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        family: 4, // Zmusza do korzystania z połączenia IPv4
      })
      .then((m) => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
