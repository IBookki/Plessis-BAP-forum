"use server";
import { getCollection } from "../lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // Fix: remove curly braces

export const register = async (prevState, formData) => {
  const errors = {};

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // Valide les données de l'utilisateur
  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";

  // Supprime les espaces inutiles
  ourUser.username = ourUser.username.trim();
  ourUser.username = ourUser.username.trim();

  // Exigences pour le nom d'utilisateur
  if (ourUser.username.length < 3)
    errors.username = "Username must be at least 3 characters";
  if (ourUser.username.length > 30)
    errors.username = "Username cannot be more than 30 characters";
  if (ourUser.username == "") errors.username = "Username cannot be empty";

const userCollection = await getCollection("users");
const usernameInQuestion = await userCollection.findOne({ username: ourUser.username });

if (usernameInQuestion) {
  errors.username = "Username already exists";
}

  // Exigences pour le mot de passe
  if (ourUser.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  if (ourUser.password.length > 30)
    errors.password = "Password cannot be more than 30 characters";
  if (ourUser.password == "") errors.password = "Password cannot be empty";

  // Si des erreurs sont trouvées, retourne les erreurs
  if (errors.username || errors.password) {
    return { errors: errors, success: false };
  }

  // Hash le mdp
  const salt = bcrypt.genSaltSync(10);
  ourUser.password = bcrypt.hashSync(ourUser.password, salt);

  // Sauvegarde l'utilisateur dans la base de données
  try {
    const usersCollection = await getCollection("users");
    const result = await usersCollection.insertOne(ourUser);

    // Get the user ID after successful insertion
    const userId = result.insertedId.toString();

    // Crée un JWT token pour l'utilisateur
    const ourTokenValue = jwt.sign(
      { userId: userId }, // payload
      process.env.JWTSECRET, // secret - match the variable name in .env.local
      { expiresIn: "30d" } // options
    );

    // Crée un cookie pour l'utilisateur
    cookies().set("Forum-parentalite", ourTokenValue, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      secure: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      errors: { general: "Failed to create account" },
      success: false,
    };
  }
};

export const login = async (prevState, formData) => {
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // Supprime les espaces inutiles
  ourUser.username = ourUser.username.trim();

  // Rechercher l'utilisateur dans la base de données
  try {
    const usersCollection = await getCollection("users");
    const dbUser = await usersCollection.findOne({ username: ourUser.username });

    if (!dbUser) {
      return {
        errors: { general: "Invalid username or password" },
        success: false,
      };
    }

    // Verifie le mdp
    const passwordMatch = await bcrypt.compare(ourUser.password, dbUser.password);
    
    if (!passwordMatch) {
      return {
        errors: { general: "Invalid username or password" },
        success: false,
      };
    }

    // Crée le JWT token
    const userId = dbUser._id.toString();
    const ourTokenValue = jwt.sign(
      { userId: userId },
      process.env.JWTSECRET,
      { expiresIn: "30d" }
    );

    // Donne le cookie
    cookies().set("Forum-parentalite", ourTokenValue, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      secure: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    return {
      errors: { general: "Login failed" },
      success: false,
    };
  }
};
