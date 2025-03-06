"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { create } from "../actions/postController";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PostForm() {
	const router = useRouter();
	const initialState = {
		errors: {},
		success: false,
	};

	// Envoi du post
	const [formState, formAction] = useActionState(create, initialState);
	const { pending } = useFormStatus();

	// Redirige vers la home page si l'envoi est réussi
	useEffect(() => {
		if (formState?.success) {
			router.push("../home");
		}
	}, [formState?.success, router]);

	return (
		<div className="flex justify-center items-center min-h-[50vh]">
			<form action={formAction}>
				<div>
					<input name="title" autoComplete="off" type="text" placeholder="Title" required />
					{formState?.errors?.title && <p className="text-red-500 text-sm mt-1">{formState.errors.username}</p>}
				</div>
				<div className="mt-4">
					<input name="content" autoComplete="off" type="text" placeholder="Content" required />
					{formState?.errors?.content && <p className="text-red-500 text-sm mt-1">{formState.errors.password}</p>}
				</div>
				<button className="btn mt-4" disabled={pending}>
					{pending ? "Posting..." : "Post"}
				</button>
			</form>
		</div>
	);
}
