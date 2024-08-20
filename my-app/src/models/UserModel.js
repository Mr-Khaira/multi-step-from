import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // If someone directly signups with google then, there would be no password field.
  // And if the user would continue to login with a password email gotta be thrown.
  password: { type: String, select: false } /*
  select: false option ensures that the password field is excluded from query results 
  by default, this improves security by preventing the password from being inadvertently
  included in the result sets when retrieving user documents.

  Can be accessed by .select("+password");
  */,
  isVerified: { type: Boolean, default: false }, // Email verification.
  googleId: { type: String },
});

export const User =
  mongoose.models?.Users || mongoose.model("Users", userSchema);
