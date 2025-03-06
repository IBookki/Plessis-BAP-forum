import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookie() {
  const Thecookie = cookies().get("Forum-parentalite")?.value;
  if (Thecookie) {
    try {
      const decoded = jwt.verify(Thecookie, process.env.JWTSECRET);
      return decoded;
    } catch (error) {
      console.error("Failed to decode JWT token", error);
      return null;
    }
  }
  return null; 
}
