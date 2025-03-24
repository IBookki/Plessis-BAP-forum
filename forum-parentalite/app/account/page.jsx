"use client";

import Header from "@/components/Header";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { read } from "../../actions/postController";

export default function Account() {
  const [username, setUsername] = useState("Loading...");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch current user and their posts
    async function fetchUserData() {
      try {
        console.log("Fetching user data...");

        // Get user info from API
        const userResponse = await fetch("/api/user/me");
        console.log("User API response status:", userResponse.status);

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        console.log("User data:", userData);

        if (userData && userData.username) {
          setUsername(userData.username);

          // Fetch all posts
          console.log("Fetching posts...");
          const allPosts = await read();
          console.log("All posts:", allPosts);

          if (Array.isArray(allPosts)) {
            // Filter posts by username
            const filteredPosts = allPosts.filter(
              (post) => post.username === userData.username
            );
            console.log("Filtered posts:", filteredPosts);
            setUserPosts(filteredPosts);
          } else {
            console.error("Posts data is not an array:", allPosts);
            setError("Impossible de récupérer vos publications");
          }
        } else {
          console.error("Invalid user data:", userData);
          setError("Impossible de récupérer vos informations");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(`Erreur: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow min-h-[calc(100vh-64px)]">
        <Leftbar />
        <main className="flex-grow p-4 overflow-y-auto max-w-full">
          <div className="flex flex-row justify-start items-center font-inter py-4 px-4 md:px-8">
            <Image
              src="/vercel.svg"
              width={60}
              height={60}
              alt="Avatar utilisateur"
              className="bg-slate-500 rounded-full"
            />
            <h1 className="pl-4 md:pl-6 text-xl">{username}</h1>
          </div>

          <div className="pt-2 pb-4">
            <hr className="border-t-2 border-red-800 w-11/12 md:w-5/6 mx-auto" />
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4 px-4 md:px-8">
              Mes publications
            </h2>

            {error && (
              <div className="text-center text-red-500 mb-4">{error}</div>
            )}

            {loading ? (
              <p className="text-center">Chargement de vos publications...</p>
            ) : userPosts.length > 0 ? (
              <div className="flex flex-col gap-4 items-center">
                {userPosts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-md w-11/12 sm:w-10/12 md:w-4/5 border border-red-800"
                  >
                    <article>
                      <div className="flex items-center mb-3 pl-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                          <Image
                            src="/vercel.svg"
                            width={48}
                            height={48}
                            alt="Avatar utilisateur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{post.username}</h3>
                          {post.createdAt && (
                            <p className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <hr className="border-t-2 border-red-800 w-4/5 mx-auto" />

                      <div className="pt-5 flex flex-row gap-6 justify-around items-center w-full">
                        <div className="gap-2 flex items-center text-slate-600">
                          <Image
                            alt=""
                            width={25}
                            height={25}
                            src="/icons/like-icons.png"
                            className="object-contain"
                          />
                          {post.likes || 0} likes
                        </div>
                        <div className="gap-2 flex items-center text-slate-600">
                          <Image
                            alt=""
                            width={25}
                            height={25}
                            src="/icons/comment-icons.png"
                            className="object-contain"
                          />
                          {post.comments?.length || 0} commentaires
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Vous n'avez pas encore publié de post.
              </p>
            )}
          </div>
        </main>
        <Rightbar />
      </div>
    </div>
  );
}
