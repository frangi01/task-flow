"use server";
import { createSession, deleteSession } from "@/lib/session";
import { FormState, LoginFormSchema } from "@/types/auth-types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // Call the provider or db to create a user...

  const { email, password } = validatedFields.data;

  const host = (await headers()).get("host")!;
  const proto = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${proto}://${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

  const json_res = await res.json();

  // 4. Create user session
  await createSession(json_res._id)
  // 5. Redirect user
  redirect('/dashboard')
}


export async function logoutAction() {
  await deleteSession()
  //redirect('/login')
}