"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchPosts } from "../../actions/postController";
import Header from "@/components/Header";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import Image from "next/image";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const posts = await searchPosts(query);
      setResults(posts);
      setLoading(false);
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => {}} />
      <div className="flex flex-grow min-h-[calc(100vh-64px)]">
        <Leftbar />
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col justify-center items-center pt-7 pb-10">
            <h1 className="text-2xl font-bold mb-6">
              {query ? `Résultats pour "${query}"` : "Recherche"}
            </h1>

            {loading ? (
              <p>Chargement...</p>
            ) : results.length > 0 ? (
              <main className="flex flex-col gap-4 w-full max-w-2xl">
                {results.map((item, index) => (
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
                          <h3 className="font-semibold font-montserrat">
                            {item.username || "Anonymous"}
                          </h3>
                          {item.createdAt && (
                            <p className="text-xs text-gray-500">
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="p-6 pl-11 text-left font-montserrat">
                        {item.content}
                      </p>
                      <hr className="border-t-2 border-red-800 w-4/5 mx-auto" />
                    </article>
                  </div>
                ))}
              </main>
            ) : (
              <p className="text-gray-600">
                Aucun résultat trouvé pour "{query}"
              </p>
            )}
          </div>
        </div>
        <Rightbar />
      </div>
    </div>
  );
}
