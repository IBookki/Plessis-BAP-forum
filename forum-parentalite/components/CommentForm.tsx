"use client";
import { useState } from "react";
import { comment } from "../actions/postController";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormEvent } from "react";

interface CommentProps {
    postId: string;
}

export default function CommentForm({ postId }: CommentProps) {
    const router = useRouter();
    const [content, setContent] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        setError("");

        try {
            await comment({ content });
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
                        name="comment"
                        autoComplete="off"
                        type="text"
                        placeholder="Commentaire"
                        required
                    />
                    <input type="hidden" name="postId" value={postId} />
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
