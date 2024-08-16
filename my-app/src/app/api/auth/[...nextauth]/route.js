/*
To use the handlers in your API routes, you would typically create a file like 
[...nextauth]/route.js under the pages/api/auth/[...nextauth] directory.

 This pattern is used to handle all the different routes that NextAuth needs for its authentication flow.

  Instead of creating a separate file for each route, Next.js allows you to use a
  single dynamic catch-all route that can handle all these paths.
*/
import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
