import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="h-auto w-full p-4 flex justify-between items-center bg-white z-20 relative border-b-2 border-red-800">
      <div className="pt-5 pb-5 hidden sm:block">
        <Link href={" /home"}><Image
          src="/logo.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
          alt="Logo"
        /></Link>
      </div>

      {/* Formulaire de recherche pour desktop */}
      <form
        onSubmit={handleSearch}
        className="flex-1 max-w-md mx-4 hidden sm:block"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Recherche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-300 bg-[rgba(241,241,241,1)] text-gray-800"
          />
        </div>
      </form>

      {/* Icône de recherche pour mobile */}
      <div className="sm:hidden">
        {showSearchInput ? (
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Recherche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1 rounded-full border-none focus:outline-none bg-[rgba(241,241,241,1)] text-gray-800 text-sm"
            />
            <button
              type="button"
              className="ml-2"
              onClick={() => setShowSearchInput(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowSearchInput(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Recherche"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        )}
      </div>

      {/* Compte utilisateur */}
      <div className="flex items-center">
        {/* Avatar rond pour mobile */}
        <div className="sm:hidden w-8 h-8 rounded-full overflow-hidden bg-gray-200">
          <Image
            src="/avatar-placeholder.png"
            width={32}
            height={32}
            alt="Avatar utilisateur"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texte pour desktop */}
        <span className="hidden sm:block">User Account</span>
      </div>

      {/* Bouton menu mobile */}
      <button
        className="sm:hidden p-2 rounded-lg hover:bg-gray-100 ml-4"
        onClick={onMenuClick}
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
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
      </button>
    </header>
  );
};

export default Header;
