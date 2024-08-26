import signoutAction from "@/app/actions/signoutAction";
import { auth } from "@/auth";

export default async function SignOutBtn() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      {user && (
        <form action={signoutAction}>
          <button className="underline p-1" type="submit">
            signOut
          </button>
        </form>
      )}
    </>
  );
}
