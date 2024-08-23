import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <Link href={"/login"} className="underline p-1">
        Login
      </Link>
      <Link href={"/signup"} className="underline p-1">
        Signup
      </Link>
    </>
  );
}
