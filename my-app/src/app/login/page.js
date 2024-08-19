"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(email, password) {
    reset();
  }

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className=" flex flex-col items-center border-2 border-gray-900 p-4 rounded-md h-auto max-w-72">
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}>
          <label className="text-4xl ml-4 self-start">Login</label>
          <input
            className="border-gray-900 m-3 input"
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Must be a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 w-fit"> {errors.email.message}</p>
          )}
          <input
            className="border-gray-900 m-3 input"
            placeholder="password"
            type="text"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                message:
                  "Password must contain atlease a special character and a capital letter",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 ">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="bg-black text-white w-full m-2 p-1 rounded-md">
            Log in
          </button>
        </form>
        <div className="mb-2">or</div>
        <form className="bg-black text-white text-center  w-full p-1 rounded-md">
          <button type="submit">Login with google</button>
        </form>
        <footer className="mt-3">
          <Link href="/signup">Don't have a account? singup</Link>
        </footer>
      </div>
    </div>
  );
}

// Add start validation as soon as the field is touched.
