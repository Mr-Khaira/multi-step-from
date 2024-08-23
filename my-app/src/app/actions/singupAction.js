"use server";

import connectToDb from "@/helpers/utils";
import { User } from "@/models/UserModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export default async function singupAction(formData) {
  //console.log("I am here", formData);
  const username = formData.username;
  const email = formData.email;
  const password = formData.password;

  // Not these because error hadling is not possible with these :-
  // const username = formData.get("username");
  // const email = formData.get("email");
  // const password = formData.get("password");

  //console.log("Inside signupAction", username, email, password);

  await connectToDb(); // helpers/utils.js

  const user = await User.findOne({ email });

  if (user) {
    return { message: "User with this email already exists" };
    // throw new Error("User with this email already exist");
  }

  const hashedPswd = await hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPswd,
  });

  redirect("/login");
}
