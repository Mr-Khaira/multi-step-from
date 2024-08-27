/*
To use the handlers in your API routes, you would typically create a file like 
[...nextauth]/route.js under the pages/api/auth/[...nextauth] directory.

 This pattern is used to handle all the different routes that NextAuth needs for its authentication flow.

  Instead of creating a separate file for each route, Next.js allows you to use a
  single dynamic catch-all route that can handle all these paths.
*/
import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

/*
Example :-
User Tries to Sign In with Google:
  The user clicks a "Sign in with Google" button.
  This triggers a POST request to /api/auth/signin/google.
  The POST handler in route.js calls the Google OAuth provider inside auth.js, which 
  handles the OAuth flow and redirects the user accordingly.
*/
