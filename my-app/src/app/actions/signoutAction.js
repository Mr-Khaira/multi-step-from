"use server";

import { signOut } from "@/auth";

export default async function signoutAction() {
  await signOut();
}
