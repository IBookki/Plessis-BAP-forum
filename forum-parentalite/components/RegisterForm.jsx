"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "../actions/userController";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left column with centered banner image */}
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

      {/* Right column with the registration form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-xl text-center text-pink-800">Créer un compte</h1>

          <p className="text-arial pt-4 pb-5 w-full text-xs text-center">
            Rejoignez la communauté des parents ! Échangez, partagez et trouvez des conseils pour accompagner vos enfants au quotidien.
          </p>

          <form action={formAction} className="flex flex-col gap-4 w-full pt-4 pb-6">
            <div>
              <input
                name="username"
                autoComplete="off"
                type="text"
                placeholder="Email"
                className="w-full p-2 border rounded border-pink-800" 
              />
              {formState?.errors?.username && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.username}
                </p>
              )}
            </div>
            <div>
              <input
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Mot de passe"
                className="w-full p-2 border rounded border-pink-800"
              />
              {formState?.errors?.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.password}
                </p>
              )}
            </div>
            <button 
              className="align-center h-10 text-white bg-pink-800 rounded"
              disabled={pending}>
              {pending ? "Création..." : "Créer un compte"}
            </button>
          </form>
          
          <div className="flex justify-center">
            <a href="./login" className="text-pink-800 justify-center text-center h-7 rounded bg-pink-200 px-4 py-1">
              Se connecter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
