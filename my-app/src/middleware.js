// export { default } from "next-auth/middleware";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  //console.log("Akdbambakdam", request);

  const session = cookies().get("authjs.session-token");

  //   console.log(session);
  if (session) {
    return NextResponse.redirect(new URL("/", request.url)); // ("to","the base url")
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};
