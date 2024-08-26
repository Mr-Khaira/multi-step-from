"use client";

import Link from "next/link";
import SignOutBtn from "./signOutBtn";

export default function Navbar() {
  return (
    <div className="bg-black text-white flex w-full">
      <div className="p-1 self-start w-1/2">
        <Link href={"/"}>
          <button className="underline p-1">Complete oAuth</button>
        </Link>
      </div>
      <div>
        <Link href={"/login"}>
          <button className="underline p-1">Login</button>
        </Link>
      </div>
      <div>
        <Link href={"/signup"}>
          <button className="underline p-1">Signup</button>
        </Link>
      </div>
      <SignOutBtn />
    </div>
  );
}
