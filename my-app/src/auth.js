/*
handlers: These are the API route handlers that NextAuth sets up for handling 
authentication requests.
signIn: A function that can be used to programmatically sign a user in.
signOut: A function that can be used to programmatically sign a user out.
auth: The main authentication object that includes configuration and methods related to 
authentication, this contains the user.

Auth.js has a set of supported actions defined in the AuthAction type. These include:
"callback", "csrf", "error", "providers", "session", "signin", "signout", "verify-request", and "webauthn-options".

providers: Is an array where you specify the authentication providers you want to use (e.g., Google, GitHub, Facebook).
*/
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models/UserModel";
import { compare } from "bcryptjs";
import connectToDb from "./helpers/utils";
// CredentialsProvider for users who do not want to use social media.

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: {
        //   label: "Username",
        //   type: "text",
        // },
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
        // No placeholders as we are using our own custom form.
      },
      // Since this is a login authorization, hence theres no username.
      authorize: async (credentials) => {
        /*The function should return a user object if the credentials are valid or 
      null if they are not.*/
        // console.log("The email in credentials of auth.js, ", credentials.email);
        // console.log(
        //   "The password in credentials of auth.js, ",
        //   credentials.password
        // );

        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide email and password");
          //throw new CredentialsSignin({ cause: "Email not valid" });
          //This approach passes an object with additional context or metadata about
          //the error, specifically with a cause property.
          // This error typically indicates that the authentication attempt with the
          // provided credentials has failed.
        }

        await connectToDb();
        const user = await User.findOne({ email }).select("+password"); // password exclided by default, check src/models/UserModel.js

        if (!user)
          throw new CredentialsSignin({ cause: "Invalid email or password." });

        if (!user.password) {
          throw new CredentialsSignin({ cause: "Invalid email or password." });
          // This is the case for the user must have signed-up using google, hence, no password
          // So we give a error message and not tell the user they had used google, for security.
        }

        const passwordMatched = await compare(password, user.password); // vompare returns bool
        console.log("passwordMatched", passwordMatched);
        if (!passwordMatched) {
          throw new CredentialsSignin({ cause: "Invalid email or password." });
        }

        // if (!user.isVerified) {
        //   throw new CredentialsSignin("Please verify your email before login.");
        // }
        // return user; Not this because it includes the password also.

        return { username: user.username, email: user.email, id: user._id };
        /*
        The user object was only returning the email because :-
        By default, NextAuth only includes minimal user information in the session, 
        typically the user's email. Other fields, like username or id, are not 
        automatically included unless you explicitly configure the session callback to 
        include them.

        Hence we configer the callbacks below :-
        */
      },
      /*
      The authorize function is passed to the Credentials Provider configuration in 
      NextAuth.js. When a user attempts to sign in using the credentials form, 
      NextAuth.js calls the authorize function with the credentials provided by the 
      user.

      Basically, verify the user and authenticate them.
      */
      // keep credentials empty if you are only using username and password.
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.id = user.id;
      }
      //console.log(token);
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.username = token.username;
        session.user.id = token.id;
      }

      return session;
    },
    async signIn({ user, account, profile, email }) {
      if (account?.provider === "google") {
        try {
          //console.log("User in google singin", user);
          const { email, name, id } = user;

          await connectToDb();

          const alredyExist = await User.findOne({ email });
          if (!alredyExist) {
            await User.create({ email, username: name, googleId: id });
          } else {
            return true;
          }
        } catch (error) {
          console.error("Detailed AuthError:", error);
          throw new AuthError(
            "Error while creating user in Google Signin callback",
            error.message
          );
        }
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    /*
When using JSON Web Tokens the jwt() callback is invoked before the session() callback,
so anything you add to the JSON Web Token will be immediately available in the session
callback, like for example an access_token or id from a provider.
But that dosnt necesserly mean the session will include it, if you want specific data
you have to define the session callback.
*/
  },
  pages: {
    signIn: "/login",
  },
});
