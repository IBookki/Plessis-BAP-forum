// On exécute ce code côté serveur pour le SEO
"use server";

import { readOne } from "@/actions/postController";
import { log } from "console";
import { useEffect } from "react";

export default async function findOneUser({
    // Récupération des paramètres d'URL
    params,
}: {
    // Typage des paramètres d'URL
    params: Promise<{ id: string }>;
}) {
    // Récupération de l'id parmi les paramètres d'URL
    const id = (await params).id;
    const data = await readOne(id);
    console.log(data);

    return (
        <>

        </>
    );
}