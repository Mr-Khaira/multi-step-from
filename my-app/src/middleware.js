/*
middleware.js is a file where you define middleware functions that will be executed for
incoming requests before they reach the route handlers. Middleware functions can 
perform various tasks like modifying the request and response objects, handling 
authentication, logging, and more.

Accoding to nextAuth docs :-
Add optional Middleware to keep the session alive, this will update the session expiry 
every time its called.


*/
//export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req) {
  const session = await auth();

  //console.log("in mdw", session);
  if (session?.user) {
    return NextResponse.redirect(new URL("/", req.url)); // ("to","the base url")
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};
