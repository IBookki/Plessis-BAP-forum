"use client";
import { useState } from "react";
import { create } from "../actions/postController";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      await create({ content });
      setContent("");
      router.push("../home");
    } catch (err) {
      setError("Failed to post content");
    } finally {
      setPending(false);
    }
  };

  return (
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
            placeholder="À quoi penses-tu, Jean ?"
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
            <span>{pending ? "Envoi..." : "Envoyer"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
