"use server";

import connectToDb from "@/helpers/utils";
import { User } from "@/models/UserModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export default async function singupAction(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  //console.log("Inside signupAction", username, email, password);
  if (!username || !email || !password) {
    throw new Error(
      "Please proived username, email and password, error in signupAction."
    );
  }

  await connectToDb(); // helpers/utils.js

  const user = await User.findOne({ email });

  if (user) {
    throw new Error("User with this email already exist");
  }

  const hashedPswd = await hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPswd,
  });

  redirect("/login");
}
