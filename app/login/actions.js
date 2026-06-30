"use server";

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  // TODO: Replace with real authentication logic (database lookup, password hashing, etc.)
  const validEmail = "user@example.com";
  const validPassword = "password123";

  if (email !== validEmail || password !== validPassword) {
    return { error: "Invalid email or password" };
  }

  return { success: true };
}
