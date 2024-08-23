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
import NextAuth, { CredentialsSignin } from "next-auth";
import google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { User } from "./models/UserModel";
import { compare, compareSync } from "bcryptjs";
// CredentialsProvider for people who do not want to use social media.

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
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
        console.log("The email in credentials of auth.js, ", credentials.email);
        console.log(
          "The password in credentials of auth.js, ",
          credentials.password
        );

        const email = credentials.email;
        const password = credentials.password;

        if (typeof email !== "string" && password != "passcode") {
          throw new CredentialsSignin("Invalid email or password type.");
          //throw new CredentialsSignin({ cause: "Email not valid" });
          //This approach passes an object with additional context or metadata about
          //the error, specifically with a cause property.
          // This error typically indicates that the authentication attempt with the
          // provided credentials has failed.
        } else {
        }

        const user = await User.findOne({ email }).select("+password"); // password exclided by default, check src/models/UserModel.js

        if (!user)
          throw new CredentialsSignin("Invalid email or password type.");

        if (!user.password) {
          throw new CredentialsSignin("Invalid email or password type.");
          // This is the case for the user must have signed-up using google, hence, no password
          // So we give a error message and not tell the user they had used google, for security.
        }

        const passwordMatched = compare(password, user.password); //bool

        if (!passwordMatched) {
          throw new CredentialsSignin("Invalid email or password type.");
        }

        if (!user.isVerified) {
          throw new CredentialsSignin("Please verify your email before login.");
        }
        // return user; Not this because it includes the password also.
        return { username: user.name, email: user.email, id: user._id };
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
  pages: {
    singIn: "/login",
  },
});
