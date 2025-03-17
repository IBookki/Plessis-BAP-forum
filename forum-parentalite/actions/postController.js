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
	if (typeof post.content != "string") post.content = "";

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
		const posts = await postsCollection.find().toArray();

		for await (const doc of posts) {
			doc._id = doc._id.toString();
		}

		return posts;
	} catch (error) {
		console.error("Database error:", error);
		return {
			errors: { general: "Failed to fetch posts" },
			success: false,
		};
	}
};

export const readOne = async (prevState, id) => {
	// Lecture de un post sélectionné
	try {
		const options = {
			projection: { _id: id },
		};

		const postsCollection = await getCollection("posts");
		const posts = await postsCollection.findOne({}, options).toArray();

		for await (const doc of posts) {
			doc._id = doc._id.toString();
		}

		return posts;
	} catch (error) {
		console.error("Database error:", error);
		return {
			errors: { general: "Failed to fetch posts" },
			success: false,
		};
	}
};

export const remove = async (prevState) => {};

export const like = async (prevState) => {};

export const upvote = async (prevState) => {};

export const downvote = async (prevState) => {};
