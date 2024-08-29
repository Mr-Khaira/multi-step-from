# multi-step-from

Excited to Share My Latest Project on OAuth with NextAuth.js! 🚀

Over the past few days, I've deepened my understanding of OAuth in NextAuth.js and built a project that showcases my learning. Here are the key features:-

1. Credential Signup & Login: I tackled one of the trickiest parts of
   OAuth—implementing secure credential-based signup and login.

2. Google Login Integration: This feature allowed me to explore Google Cloud Console, understanding how applications get verified to receive Google IDs for secure signups and logins.

3. Form Validation with Server Actions: Instead of the typical onSubmit approach, I utilized server actions for form processing, ensuring more secure and efficient handling of form data.

4. Email Verification: Upon signup, users receive a verification email. If the email isn’t verified, the user document is automatically removed from the MongoDB database using TTL and filter statements. The verification link also incorporates a JWT that expires with the link, preventing misuse.

5. Route Protection with Middleware: Implemented middleware to ensure that logged-in users can't access the login and signup pages.

I have added notes throughout the code base, in the form on comments.

Visit the live site: https://multi-step-from-snowy.vercel.app/

Note: Response times might be slightly delayed since it's hosted on Vercel's free plan.

I'd love to hear your thoughts and feedback! 🙏
