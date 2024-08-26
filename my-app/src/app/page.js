import { auth } from "@/auth";
//import { decode, encode } from "next-auth/jwt";
//import { cookies } from "next/headers";
// encode is the method used to create the session token.
// hence, decode is the method to be used to decode it.

/*
Hence if we were to decode the toke for verification on a backend 
such as node.js, then we would use this decode method to verify the user.

For that purpose, the page to be installed would be '@auth/core'.
These is discussed here only for the sake of knowledge.
*/

export default async function Home() {
  const session = await auth();
  // This is how it would be done on the backend.
  // const cookiees = cookies().get("authjs.session-token"); // Getting the cookie.
  // // Once we have the cookie we will decode it's value.
  // console.log(
  //   await decode({
  //     token: cookiees?.value,
  //     salt: cookiees.name, // !! The salt is the cookie name.
  //     secret: process.env.AUTH_SECRET,
  //   })
  // );

  return (
    <>
      <h1>Home page</h1>
    </>
  );
}
