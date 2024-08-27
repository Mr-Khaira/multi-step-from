/*
This file is included here only for the sake of knowledge of the error,
that I faced during the build process, regarding the Edge Runtime restrictions
in Next.js, which does not allow dynamic code evaluation like eval, new Function, or 
WebAssembly.compile.

Explanation below:

middleware.js is a file where you define middleware functions that will be executed for
incoming requests before they reach the route handlers. Middleware functions can 
perform various tasks like modifying the request and response objects, handling 
authentication, logging, and more.

Accoding to nextAuth docs :-
Add optional Middleware to keep the session alive, this will update the session expiry 
every time its called.



//export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import { auth } from "./auth";
/*
In the middleware.js file, I imported auth from "./auth", which, based on the error trace, eventually imports mongoose. Since middleware.js is executed in the Edge Runtime, this causes the build to fail due to the usage of dynamic code evaluation within mongoose.


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

*/
