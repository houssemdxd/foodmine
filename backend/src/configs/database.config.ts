import { connect,ConnectOptions} from "mongoose";
    

export const dbConnect=()=>{

    connect( process.env.MONGO_URL as string, {
    } as ConnectOptions).then(()=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("[error ] "+err.message)
    } )
}