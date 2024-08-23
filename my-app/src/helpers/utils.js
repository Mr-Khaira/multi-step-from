import mongoose from "mongoose";

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

export function emailErrorCheck(currentValue) {
  //console.log("Email current value", currentValue);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(currentValue)) {
    return "Must be a valid email";
  }
}

export function passwordErrorCheck(currentValue) {
  //console.log("Pswd current value", currentValue);
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
  if (currentValue.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!passwordPattern.test(currentValue)) {
    return "Password must contain atlease a special character and a capital letter.";
  }
}
