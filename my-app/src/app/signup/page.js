"use client";
// Note - RFC validations donst work well with form actions.

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import singupAction from "../actions/singupAction";
import { passwordErrorCheck, emailErrorCheck } from "@/helpers/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleLoginAction from "../actions/googleLoginAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import verificationEmail from "@/helpers/verificationEmail";
// import { setTimeout } from "timers/promises";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (email != "") {
      setEmailError(emailErrorCheck(email));
    }
    if (password != "") {
      setPasswordError(passwordErrorCheck(password));
    }
  }, [email, password]);

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className=" flex flex-col items-center border-2 border-gray-900 p-4 rounded-md h-auto max-w-72">
        {/*
          When invoked in a form, the action automatically receives the FormData
          object. You don't need to use React useState to manage fields, instead, you can extract the data using the native FormData methods.

          It must be done on server and must be a async function.
          */}
        <form
          action={async (formData) => {
            const username = formData.get("username");
            const email = formData.get("email");
            const password = formData.get("password");

            try {
              if (!username || !email || !password) {
                return {
                  message: "Please proived username, email and password",
                };
                // throw new Error(
                //   "Please proived username, email and password, error in signupAction."
                // );
              }

              const result = await singupAction(username, email, password);
              // console.log("result.message", result);
              if (result.message) {
                toast.error(result.message, {
                  position: "top-center",
                  autoClose: 3000,
                });
              } else {
                toast.success(
                  "Verification mail has been sent, link expises in 10mins",
                  {
                    position: "top-center",
                    autoClose: 3000,
                  }
                );

                await verificationEmail(email);

                setTimeout(() => {
                  router.push("/login");
                }, 3000);
              }
              //reset();
            } catch (error) {
              //throw new Error(error);
            }
          }}
          className="flex flex-col items-center">
          <label className="text-4xl ml-4 self-start">Signup</label>

          <input
            className="border-gray-900 m-3 input"
            name="username"
            placeholder="Username"
            type="text"
            required
          />

          <input
            className="border-gray-900 m-3 input"
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {emailError != "" && (
            <p className="text-red-600 w-fit"> {emailError}</p>
          )}

          <input
            className="border-gray-900 m-3 input"
            name="password"
            placeholder="password"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passwordError != "" && (
            <p className="text-red-600 w-fit"> {passwordError}</p>
          )}
          {email == "" || password == "" ? (
            <button
              type="submit"
              className="bg-black text-white w-full m-2 p-1 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled>
              Sign up
            </button>
          ) : (
            <button
              type="submit"
              className="bg-black text-white w-full m-2 p-1 rounded-md">
              Sign up
            </button>
          )}
        </form>
        <div className="mb-2">or</div>
        <form
          className="bg-black text-white text-center  w-full p-1 rounded-md flex justify-center"
          action={googleLoginAction}>
          <Image
            className="mr-3 p-1"
            src={"/google.png"}
            width={30}
            height={30}></Image>
          <button type="submit">Signup with google</button>
        </form>
        <footer className="mt-3">
          <Link href="/login">Already have an account? Login</Link>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
}
