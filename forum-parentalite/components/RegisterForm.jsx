"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "../actions/userController";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const initialState = {
    errors: {},
    success: false,
  };

  // Enregistre l'user
  const [formState, formAction] = useActionState(register, initialState);
  const { pending } = useFormStatus();

  // Redirige vers la home page si l'inscription est réussie
  useEffect(() => {
    if (formState?.success) {
      router.push("../home");
    }
  }, [formState?.success, router]);

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <form action={formAction}>
        <div>
          <input
            name="username"
            autoComplete="off"
            type="text"
            placeholder="Username"
          />
          {formState?.errors?.username && (
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.username}
            </p>
          )}
        </div>
        <div className="mt-4">
          <input
            name="password"
            autoComplete="off"
            type="password"
            placeholder="Password"
          />
          {formState?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.password}
            </p>
          )}
        </div>
        <button className="btn mt-4" disabled={pending}>
          {pending ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
