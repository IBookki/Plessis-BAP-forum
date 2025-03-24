"use client";

import Header from "@/components/Header";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { read, like, create, comment } from "../../actions/postController";


export default function Account() {
  const [username, setUsername] = useState("Loading...");
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function sendLike(postId) {
    console.log("like");
    await like(postId);

    const index = posts.findIndex((p) => p._id == postId);
    console.log(index);

    const updatedPost = [...posts];

    updatedPost[index].likes = (updatedPost[index].likes || 0) + 1;
    setPosts(updatedPost);
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        console.log("Fetching user data...");

        const userResponse = await fetch("/api/user/me");
        console.log("User API response status:", userResponse.status);

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        console.log("User data:", userData);

        if (userData && userData.username) {
          setUsername(userData.username);

          console.log("Fetching posts...");
          const allPosts = await read();
          console.log("All posts:", allPosts);

          if (Array.isArray(allPosts)) {
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
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col justify-center items-center pt-7 pb-10">
            <div className="p-4 w-full max-w-2xl bordermb-6">
              <div className="flex items-center">
                <Image
                  src="/vercel.svg"
                  width={60}
                  height={60}
                  alt="Avatar utilisateur"
                  className="bg-slate-500 rounded-full"
                />
                <h1 className="pl-4 md:pl-6 text-xl font-inter">{username}</h1>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 text-center self-center m">
              Mes posts
            </h2>

            {error && (
              <div className="text-center text-red-500 mb-4 w-full max-w-2xl">
                {error}
              </div>
            )}

            {loading ? (
              <p className="text-center w-full max-w-2xl">
                Chargement de vos publications...
              </p>
            ) : userPosts.length > 0 ? (
              <div className="flex flex-col gap-4 w-full max-w-2xl">
                {userPosts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md w-full border border-red-800"
                  >
                    <article>
                      <div className="flex items-center mb-4 pl-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                          <Image
                            src="/vercel.svg"
                            width={48}
                            height={48}
                            alt="Avatar utilisateur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold font-inter">{post.username}</h3>
                          {post.createdAt && (
                            <p className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="p-6 pl-11 text-left">{post.content}</p>
                      <hr className="border-t-2 border-red-800 w-4/5 mx-auto" />

                      <div className="pt-5 flex flex-row gap-6 justify-around items-center w-full">
                        <div className="font-inter gap-2 flex items-center text-slate-600" onClick={() => sendLike(`${item._id}`)}>
                          <Image
                            alt=""
                            width={25}
                            height={25}
                            src="/icons/like-icons.png"
                            className="object-contain"
                          />
                          {post.likes || 0} likes
                        </div>
                        <div className="font-inter gap-2 flex items-center text-slate-600">
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
              <p className="text-center text-gray-500 w-full max-w-2xl">
                Vous n'avez pas encore publié de post.
              </p>
            )}
          </div>
        </div>
        <Rightbar />
      </div>
    </div>
  );
}
