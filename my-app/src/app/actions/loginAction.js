"use server";

const { signIn } = require("@/auth");

export default async function LoginHandler(email, password) {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    //console.log("Hello hello", error.message);
    return error.cause;
  }
}
