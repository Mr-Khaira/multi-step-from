"use server";

const { signIn } = require("@/auth");
const { User } = require("@/models/UserModel");

export default async function LoginHandler(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { message: "Please provide all credencials" };
    //throw new Error("Please provide all credencials");
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    return error.message;
  }
}
