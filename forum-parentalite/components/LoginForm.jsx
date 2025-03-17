"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../actions/userController";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginForm() {
	const router = useRouter();
	const initialState = {
		errors: {},
		success: false,
	};

	// Login de l'user
	const [formState, formAction] = useActionState(login, initialState);
	const { pending } = useFormStatus();

	// Redirige vers la home page si le login est réussi
	useEffect(() => {
		if (formState?.success) {
			router.push("../home");
		}
	}, [formState?.success, router]);

	return (
		<>
		<div className="mt-7 flex flex-col justify-center items-center self-center">
			<form action={formAction} className="flex flex-col gap-4 w-full max-w-xs">
				<div>
					<label htmlFor="username" className="block mb-1">Username : </label>
					<input 
						type="text" 
						name="username" 
						id="username"
						className="w-full p-2 border rounded" 
					/>
				</div>
				
				<div>
					<label htmlFor="password" className="block mb-1">Password : </label>
					<input 
						type="password" 
						name="password" 
						id="password" 
						className="w-full p-2 border rounded"
					/>
				</div>
				
				{formState?.errors?.general && (
					<p className="text-red-500 text-sm">
						{formState.errors.general}
					</p>
				)}
				
				<button 
					type="submit" 
					disabled={pending}>
					{pending ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>	
		</>
	);
}
