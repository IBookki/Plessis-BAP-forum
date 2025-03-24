import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getCollection } from "../../../../lib/db";

export async function GET() {
  try {
    console.log("API: /api/user/me called");

    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("Forum-parentalite")?.value;

    if (!token) {
      console.log("API: No token found in cookies");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("API: Token found, verifying...");

    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWTSECRET);
    } catch (jwtError) {
      console.error("API: JWT verification failed:", jwtError);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;
    console.log("API: User ID from token:", userId);

    // Get user data from database
    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      console.log("API: User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("API: User found:", user.username);

    // Return user data (excluding password)
    const { password, ...userData } = user;
    userData._id = userData._id.toString();

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error in /api/user/me:", error);
    return NextResponse.json(
      { error: "Authentication failed", details: error.message },
      { status: 500 }
    );
  }
}
