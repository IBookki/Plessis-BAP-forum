"use client";

import Header from "@/components/Header";
import { read, like, create } from "../../actions/postController";
import { useEffect, useState } from "react";
import Image from "next/image";
import Rightbar from "@/components/Rightbar";
import Leftbar from "@/components/Leftbar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function fetch() {
    const data = await read();
    console.log(data);
    setPosts(data);
  }

  useEffect(() => {
    fetch();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("content", content);

      const response = await create(null, formData); // Passing with correct signature

      if (response && response.success) {
        setContent("");
        fetch();
      } else if (response && response.errors) {
        setError(
          response.errors.content ||
            response.errors.general ||
            "Failed to create post"
        );
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function sendLike(postId) {
    console.log("like");
    await like(postId);

    const index = posts.findIndex((p) => p._id == postId);
    console.log(index);

    const updatedPost = [...posts];

    updatedPost[index].likes = (updatedPost[index].likes || 0) + 1;
    setPosts(updatedPost);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex">
        <Leftbar />
        <div className="flex-grow">
          <div className="flex flex-col justify-center items-center pt-7">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl border border-red-800">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src="/vercel.svg"
                      width={48}
                      height={48}
                      alt="Avatar utilisateur"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    name="content"
                    autoComplete="off"
                    type="text"
                    placeholder="À quoi penses-tu ?"
                    className="ml-4 flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <hr className="border-t-2 border-red-800 mb-4" />
                <div className="flex justify-around">
                  <button
                    type="button"
                    className="flex items-center space-x-2"
                    disabled={pending}
                  >
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                    <span>Photo/Vidéo</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2"
                    disabled={pending}
                  >
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                    <span>{pending ? "Envoi..." : "Envoyer"}</span>
                  </button>
                </div>
              </form>
            </div>
            <h1 className="">Posts</h1>

            <main className="flex flex-col gap-4 w-full max-w-2xl">
              {posts.map((item, index) => (
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
                        <h3 className="font-semibold">
                          {item.username || "Anonymous"}
                        </h3>
                        {item.createdAt && (
                          <p className="text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="p-6 pl-11 text-left">{item.content}</p>
                    <hr className="border-t-2 border-red-800 w-4/5 mx-auto" />

                    <ul className="pt-5 flex flex-row gap-6 justify-around items-center w-full">
                      <li>
                        <button
                          className="gap-2 flex items-center text-slate-600"
                          onClick={() => sendLike(`${item._id}`)}
                        >
                          <Image
                            alt=""
                            width={25}
                            height={25}
                            src="/icons/like-icons.png"
                            className="object-contain"
                          />
                          {item.likes || 0}
                        </button>
                      </li>
                      <li>
                        <button className="gap-2 flex items-center text-slate-600">
                          <Image
                            alt=""
                            width={25}
                            height={25}
                            src="/icons/comment-icons.png"
                            className="object-contain"
                          />
                          Comment
                        </button>
                      </li>
                    </ul>
                  </article>
                </div>
              ))}
            </main>
          </div>
        </div>
        <Rightbar />
      </div>
    </div>
  );
}
