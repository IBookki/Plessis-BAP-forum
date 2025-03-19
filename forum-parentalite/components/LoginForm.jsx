"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../actions/userController";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

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
		<div className="flex flex-col md:flex-row min-h-screen">
			<div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
				<div className="relative w-full max-w-lg aspect-auto">
					<Image
						src="/banniere.png"
						alt="Bannière"
						width={600}
						height={400}
						className="object-contain"
						priority
					/>
				</div>
			</div>

			<div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
				<div className="w-full max-w-md">
					<h1 className="text-xl text-center text-pink-800">Se connecter</h1>

					<p className="text-arial pt-4 pb-5 w-full text-xs text-center">
						Rejoignez la communauté des parents ! Échangez, partagez et trouvez des conseils pour accompagner vos enfants au quotidien.
					</p>

					<form action={formAction} className="flex flex-col gap-4 w-full pt-4 pb-6">
						<div>
							<input 
								type="text" 
								name="username" 
								id="username"
								placeholder="Email"
								className="w-full p-2 border rounded border-pink-800" 
							/>
						</div>
						
						<div>
							<input 
								type="password" 
								name="password" 
								id="password"
								placeholder="Mot de passe" 
								className="w-full p-2 border rounded border-pink-800"
							/>
						</div>
						
						{formState?.errors?.general && (
							<p className="text-red-500 text-sm">
								{formState.errors.general}
							</p>
						)}
						
						<button 
							type="submit" 
							disabled={pending} 
							className="align-center h-10 text-white bg-pink-800 rounded">
							{pending ? "Connexion..." : "Se connecter"}
						</button>
					</form>
					
					<div className="flex justify-center">
						<a href="./register" className="text-pink-800 justify-center text-center h-7 rounded bg-pink-200 px-4 py-1">
							Créer un compte
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
