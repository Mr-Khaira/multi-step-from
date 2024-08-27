"use server";
import mongoose from "mongoose";
// import "react-toastify/dist/ReactToastify.css";
/*
Dynamic Code Evaluation (e. g. 'eval', 'new Function', 'WebAssembly.compile') not allowed in Edge Runtime 
*/

export default async function connectToDb() {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;

    const { connection } = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING,
      {
        dbName: "LoginSignupAuth",
      }
    );

    //console.log("Connection object, ", connection);
    //console.log("Connected to DB, ", connection.host);
  } catch (error) {
    throw new Error("Error in utils.js connectToDb", error);
  }
}
