"use client";

import Header from "@/components/Header";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { readTrending, like } from "../../actions/postController";

export default function Trending() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function sendLike(postId) {
    await like(postId);
    const index = posts.findIndex((p) => p._id == postId);
    const updatedPost = [...posts];
    updatedPost[index].likes = (updatedPost[index].likes || 0) + 1;
    setPosts(updatedPost);
  }

  useEffect(() => {
    async function fetchTrendingPosts() {
      try {
        const trendingPosts = await readTrending();

        if (Array.isArray(trendingPosts)) {
          setPosts(trendingPosts);
        } else {
          setError("Failed to fetch trending posts");
        }
      } catch (err) {
        console.error("Error fetching trending posts:", err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow min-h-[calc(100vh-64px)]">
        <Leftbar />
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col justify-center items-center pt-7 pb-10">

            {error && (
              <div className="text-center text-red-500 mb-4 w-full max-w-2xl">
                {error}
              </div>
            )}

            {loading ? (
              <p className="text-center w-full max-w-2xl">
                Loading trending posts...
              </p>
            ) : posts.length > 0 ? (
              <div className="flex flex-col gap-4 w-full max-w-2xl">
                {posts.map((post, index) => (
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
                          <h3 className="font-semibold">{post.username}</h3>
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
                        <div
                          className="gap-2 flex items-center text-slate-600"
                          onClick={() => sendLike(post._id)}
                        >
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
              <p className="text-center text-gray-500 w-full max-w-2xl">
                No trending posts found.
              </p>
            )}
          </div>
        </div>
        <Rightbar />
      </div>
    </div>
  );
}
