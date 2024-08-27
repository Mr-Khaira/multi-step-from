import connectToDb from "@/helpers/utils";
import { User } from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { permanentRedirect, redirect } from "next/navigation";

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
  //console.log("TOKENNNN", token);
  if (!token) {
    return Response.json({ error: "Invalid request" });
  }

  try {
    const verifiedPostReq = jwt.verify(token, process.env.EMAIL_ENCRYPT);

    if (!verifiedPostReq) {
      return Response.json({ error: "Invalid or expired token" });
    }

    const { email } = verifiedPostReq;

    await connectToDb();

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true } // returns updated query
    );
    // console.log(user);
    if (!user)
      throw Response.json({
        cause: "Invalid email or expired token",
      });

    //redirect("http://localhost:3000/login");
    /*
     The above will not work, because:-
     redirect internally throws an error so it should be called outside of try/
     catch blocks.
    redirect can be called in Client Components during the rendering process but 
    not in event handlers. You can use the useRouter hook instead.
    redirect also accepts absolute URLs and can be used to redirect to external 
    links.

    This is from Next js docs, hence redierct is to be moved out of try/catch.
     */
  } catch (error) {
    console.error("Internal Server Error in emailverification route:", error);
    return Response.json({
      error: "Internal Server Error in emailverification route.",
    });
  }
  redirect("http://localhost:3000/login");
};
