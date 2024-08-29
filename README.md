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

Password validation:-
<img width="959" alt="pasword validaton 8" src="https://github.com/user-attachments/assets/7fa352f6-a643-49c8-9675-5e791be34353">

Verified:-
<img width="824" alt="isVerifiedTrue" src="https://github.com/user-attachments/assets/0e49cf91-4457-4eaa-bd23-efd61a1dd0ef">

Email message:-
<img width="954" alt="email sent message" src="https://github.com/user-attachments/assets/8c34c2cb-95f4-40a2-b5fd-4f9fdad9ad4d">

Successful login :-
<img width="959" alt="successful login" src="https://github.com/user-attachments/assets/a679226a-3e25-4dc7-a821-df8f24c3e2d0">

Unverified email :-
<img width="958" alt="unverified email" src="https://github.com/user-attachments/assets/d0c87423-e92a-4e60-b827-ca5b20d6a7e0">

Scuuessful login with google :-
<img width="959" alt="successful login with G" src="https://github.com/user-attachments/assets/0d523f18-eccd-4491-afaf-f545b9d4990c">

Verification link :-
<img width="959" alt="verification link" src="https://github.com/user-attachments/assets/493b69f7-3d5e-48a4-bb30-30189cd5ad05">

Unverified email in the database :-
<img width="813" alt="UNVERIFIED EMIAL IN dB" src="https://github.com/user-attachments/assets/4a5e84cf-f81c-4ab4-a500-a07d5c031086">
