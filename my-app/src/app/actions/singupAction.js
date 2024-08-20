"use server";

export default async function singupAction(formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!username || !email || !password) {
    throw new Error(
      "Please proived username, email and password, error in signupAction."
    );
  }

  // Connect to the DB here.
}
