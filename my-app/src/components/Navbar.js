import Link from "next/link";
import signoutAction from "@/app/actions/signoutAction";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="bg-black text-white flex w-full">
      <Link href={"/"} className="p-1 self-start w-1/2">
        <button className="underline p-1">Complete oAuth</button>
      </Link>
      <Link href={"/login"}>
        <button className="underline p-1">Login</button>
      </Link>
      <Link href={"/signup"}>
        <button className="underline p-1">Signup</button>
      </Link>
      <div>
        {user && (
          <form action={signoutAction}>
            <button className="underline p-1" type="submit">
              signOut
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
