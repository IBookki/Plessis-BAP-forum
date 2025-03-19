"use client";

import Header from "@/components/Header";
import { read, like, create } from "../../actions/postController";
import { useEffect, useState } from "react";
import Image from "next/image";

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
      const response = await create({ content });
      if (response) {
        setContent("");
        fetch();
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function sendLike(postId) {
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
            <h1 className="">Posts</h1>

				<main className="flex flex-col gap-4">
					{posts.map((item, index) => (
						<a href={"#"} key={index}>
							<article>
								<h3 className="font-semibold">{item.title}</h3>
								<p>{item.content}</p>

								<ul className="flex flex-row gap-2">
									<li>
										<button className="p-2 bg-slate-400" onClick={() => sendLike(`${item._id}`)}>
											Like ({item.likes || 0})
										</button>
									</li>
									<li>
										<button>Comment</button>
									</li>
								</ul>
							</article>
						</a>
					))}
				</main>
			</div>
		</div>
    </div>
      </div>
      )}};
