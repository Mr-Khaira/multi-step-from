"use client";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import singupAction from "../actions/singupAction";
import { passwordErrorCheck, emailErrorCheck } from "@/helpers/utils";

export default function Page() {
  const [formState, setFormAction] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
    reset,
  } = useForm();

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.email && value.password) {
        setEmailError(emailErrorCheck(value.email));
        setPasswordError(passwordErrorCheck(value.password));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  async function onSubmit(event) {
    try {
      if (!event.username || !event.email || !event.password) {
        return {
          message:
            "Please proived username, email and password, error in signupAction.",
        };
        // throw new Error(
        //   "Please proived username, email and password, error in signupAction."
        // );
      }

      const result = await singupAction(event);
      if (result.message) {
        setFormAction(result.message);
      } else {
        setFormAction("Registration successfull!");
      }
      //reset();
    } catch (error) {
      setFormAction(error.message);
      throw new Error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className=" flex flex-col items-center border-2 border-gray-900 p-4 rounded-md h-auto max-w-72">
        {/*
          When invoked in a form, the action automatically receives the FormData
          object. You don't need to use React useState to manage fields, instead, you can
          extract the data using the native FormData methods.

          It must be done on server and must be a async function.
          */}
        <form
          action={handleSubmit(onSubmit)}
          className="flex flex-col items-center">
          <label className="text-4xl ml-4 self-start">Signup</label>

          <input
            className="border-gray-900 m-3 input"
            name="username"
            placeholder="Username"
            type="text"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-red-600 w-fit"> {errors.username.message}</p>
          )}

          <input
            className="border-gray-900 m-3 input"
            name="email"
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email ? (
            <p className="text-red-600 w-fit"> {errors.email.message}</p>
          ) : (
            touchedFields.email &&
            emailError != "" && (
              <p className="text-red-600 w-fit"> {emailError}</p>
            )
          )}

          <input
            className="border-gray-900 m-3 input"
            name="password"
            placeholder="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password ? (
            <p className="text-red-600 ">{errors.password.message}</p>
          ) : (
            touchedFields.password &&
            passwordError != "" && (
              <p className="text-red-600 w-fit"> {passwordError}</p>
            )
          )}
          {passwordError || emailError ? (
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
          <p aria-live="polite" className="text-red-600 w-fit">
            {formState}
          </p>
        </form>
        <div className="mb-2">or</div>
        <form className="bg-black text-white text-center  w-full p-1 rounded-md">
          <button type="submit">Signup with google</button>
        </form>
        <footer className="mt-3">
          <Link href="/login">Already have an account? Login</Link>
        </footer>
      </div>
    </div>
  );
}
