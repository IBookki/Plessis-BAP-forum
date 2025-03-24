"use server";
import { ObjectId } from "mongodb";
import { getCollection } from "../lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Helper function to get the current user from JWT
async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("Forum-parentalite")?.value;
    
    if (!token) return null;
    
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const userId = decoded.userId;
    
    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export const create = async (prevState, formData) => {
	const errors = {};
  
  // Get current user
  const currentUser = await getCurrentUser();
  const username = currentUser ? currentUser.username : "Anonymous";

	const post = {
		content: formData.get("content"),
		likes: 0,
    username: username,  // Add username to post
    createdAt: new Date()
	};

	// Valide les données de l'utilisateur
	if (typeof post.content != "string") post.content = "";

	// Supprime les espaces inutiles
	post.content = post.content.trim();

	// Vérifie le contenu
	if (post.content == "") errors.content = "Content cannot be empty";

	// Si des erreurs sont trouvées, retourne les erreurs
	if (errors.content) {
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

export const read = async () => {
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

export const readTrending = async () => {
	// Lecture de tous les post par ordre décroissant de likes

	const query = {};
	const sort = { likes: -1 };

	try {
		const postsCollection = await getCollection("posts");
		const posts = await postsCollection.find(query).sort(sort).toArray();

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

export const readOne = async (id) => {
	// Lecture de un post sélectionné
	try {
		const query = { _id: new ObjectId(`${id}`) };

		const postsCollection = await getCollection("posts");
		const post = await postsCollection.findOne(query);

		post._id = post._id.toString();

		return post;
	} catch (error) {
		console.error("Database error:", error);
		return {
			errors: { general: "Failed to fetch post" },
			success: false,
		};
	}
};

export const remove = async (id) => {
	// Suppression de un post sélectionné
	try {
		const query = { _id: new ObjectId(`${id}`) };

		const postsCollection = await getCollection("posts");
		const post = await postsCollection.findOneAndDelete(query);

		post._id = post._id.toString();

		return post;
	} catch (error) {
		console.error("Database error:", error);
		return {
			errors: { general: "Failed to remove post" },
			success: false,
		};
	}
};

export const like = async (id) => {
	// Ajoute un like à un post

	const filter = { _id: new ObjectId(`${id}`) };
	const update = { $inc: { likes: 1 } };

	try {
		const postsCollection = await getCollection("posts");
		await postsCollection.updateOne(filter, update);
		return { success: true };
	} catch (error) {
		console.error("Database error:", error);
		return {
			errors: { general: "Failed to save like" },
			success: false,
		};
	}
};

export const comment = async (prevState, formData) => {
  const errors = {};
  
  const postId = formData.get("postId");
  const content = formData.get("content");

  const currentUser = await getCurrentUser();
  const username = currentUser ? currentUser.username : "Anonymous";

  if (typeof content !== "string" || content.trim() === "") {
    return { 
      errors: { content: "Comment cannot be empty" }, 
      success: false 
    };
  }

  const newComment = {
    content: content.trim(),
    username: username,
    createdAt: new Date()
  };

  try {
    const postsCollection = await getCollection("posts");
    
    await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: newComment } }
    );
    
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      errors: { general: "Failed to save comment" },
      success: false,
    };
  }
};

export const searchPosts = async (keyword) => {
  if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
    return [];
  }
  
  try {
    const postsCollection = await getCollection("posts");
    
    const searchRegex = new RegExp(keyword.trim(), 'i');
    
    const posts = await postsCollection.find({
      $or: [
        { content: { $regex: searchRegex } },
        { username: { $regex: searchRegex } }
      ]
    }).toArray();
    
    for (const post of posts) {
      post._id = post._id.toString();
    }
    
    return posts;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
