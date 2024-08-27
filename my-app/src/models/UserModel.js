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
  image: { type: String },
  isVerified: { type: Boolean, default: false }, // Email verification.
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 300,
    partialFilterExpression: { isVerified: false },
  }
);

//TTL https://stackoverflow.com/questions/14597241/setting-expiry-time-for-a-collection-in-mongodb-using-mongoose

/*
index - Indexes support efficient execution of queries in MongoDB. If your 
application is repeatedly running queries on the same fields, you can create an 
index on those fields to improve performance for those queries.

https://www.mongodb.com/docs/manual/core/indexes/create-index/#std-label-manual-create-an-index

Basically index is like a if condition, upon a record
here if we were to put line 21 in words :-

index field 'createAt', remove document after 'expireAfterSeconds',
if `isVerified` is `false`.

The '1' with the createdAt is just for keeping ascending order.
Its not really important here.
https://www.mongodb.com/docs/manual/core/index-ttl/

*/

export const User =
  mongoose.models?.Users || mongoose.model("Users", userSchema);
