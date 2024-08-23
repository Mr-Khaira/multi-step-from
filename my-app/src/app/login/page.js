"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { emailErrorCheck } from "@/helpers/utils";
import LoginHandler from "../actions/loginAction";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (email != "") {
      setEmailError(emailErrorCheck(email));
    }
  }, [email]);

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className=" flex flex-col items-center border-2 border-gray-900 p-4 rounded-md h-auto max-w-72">
        <form
          className="flex flex-col items-center"
          action={async (formData) => {
            const email = formData.get("email");
            const password = formData.get("password");

            if (!email || !password) {
              toast.info("Please provide all credencials", {
                position: "top-center",
              });
              // return { message: "Please provide all credencials" };
              //throw new Error("Please provide all credencials");
            }

            const error = await LoginHandler(email, password);
            if (error) {
              toast.error(error, {
                position: "top-center",
              });
            } else {
              toast.success("Login Successful!", { position: "top-center" });
            }
          }}>
          <label className="text-4xl ml-4 self-start">Login</label>

          <input
            className="border-gray-900 m-3 input"
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {email != "" && <p className="text-red-600 ">{emailError}</p>}

          <input
            className="border-gray-900 m-3 input"
            name="password"
            placeholder="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {password == "" || email == "" || emailError ? (
            <button
              type="submit"
              className="bg-black text-white w-full m-2 p-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled>
              Log in
            </button>
          ) : (
            <button
              type="submit"
              className="bg-black text-white w-full m-2 p-1 rounded-md ">
              Log in
            </button>
          )}
        </form>
        <div className="mb-2">or</div>
        <form className="bg-black text-white text-center  w-full p-1 rounded-md">
          <button type="submit">Login with google</button>
        </form>
        <footer className="mt-3">
          <Link href="/signup">Don't have a account? singup</Link>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
}
