/*
 It is not allowed to define inline "use server" annotated Server Actions in Client 
 Components.
  │ To use Server Actions in a Client Component, you can either export them from a 
  separate file with "use server" at the top, or pass them down through props from a 
  Server Component.
*/
"use server";

import { signIn } from "@/auth";

const googleLoginAction = async () => {
  await signIn("google");
};

export default googleLoginAction;
