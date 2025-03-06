"use server";
import { getCollection } from "../lib/db";

export const create = async (prevState, formData) => {
	const errors = {};

	const post = {
		title: formData.get("title"),
		content: formData.get("content"),
	};

	// Valide les données de l'utilisateur
	if (typeof post.title != "string") post.title = "";
	if (typeof post.title != "string") post.title = "";

	// Supprime les espaces inutiles
	post.title = post.title.trim();
	post.content = post.content.trim();

	// Vérifie le contenu
	if (post.title == "") errors.title = "Title cannot be empty";
	if (post.content == "") errors.content = "Content cannot be empty";

	// Si des erreurs sont trouvées, retourne les erreurs
	if (errors.title || errors.content) {
		return { errors: errors, success: false };
	}

	// Sauvegarde le post dans la base de données
	try {
		const postsCollection = await getCollection("posts");
		await postsCollection.insertOne(post);
		return { success: true };
	} catch (error) {
		console.error("Database error:", error);
		return {
			errors: { general: "Failed to save post" },
			success: false,
		};
	}
};

export const read = async (prevState) => {
	// Lecture de tous les post sauvegardés
	try {
		const postsCollection = await getCollection("posts");
		const posts = await postsCollection.find();

		let output = {};

		for await (const doc of posts) {
			// console.log(doc);

			const copiedDoc = structuredClone(doc);
			output[copiedDoc._id] = copiedDoc;
		}

		// console.log(posts);
		return output;
	} catch (error) {
		console.error("Database error:", error);
		return {
			errors: { general: "Failed to save post" },
			success: false,
		};
	}
};
