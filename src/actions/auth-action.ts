"use client";
import { createSession } from "@/lib/session";
import { FormState, LoginFormSchema } from "@/types/auth-types";
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
  const res = await fetch('/api/auth/login', {
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


// export async function logout() {
//   await deleteSession()
//   redirect('/login')
// }