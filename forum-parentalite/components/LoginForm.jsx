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

	return (
		<>
		<div className="mt-7 flex justify-center items-center self-center">
			<form action={formAction}>
				<label htmlFor="username">Username : </label>
				<input type="text" name="username" id="username" />
				<br />
				<label htmlFor="password">Password : </label>
				<input type="password" name="password" id="password" />
				<br />
				<input className="border-2" type="submit" name="login" value="Login" />
			</form>
		</div>	
		</>
	);
}
