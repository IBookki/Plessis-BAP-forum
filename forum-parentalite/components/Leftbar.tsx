import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Side: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen bg-white overflow-y-auto shadow-md text-left border-r-2 border-pink-800 transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[22%]"
      }`}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="rounded-full p-2"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <Image
            alt={collapsed ? "Expand" : "Collapse"}
            width={20}
            height={20}
            src={collapsed ? "/icons/arrow-right.png" : "/icons/arrow-left.png"}
            className="object-contain"
            onError={() =>
              console.log("Image not found - please add arrow icons")
            }
          />
        </button>
      </div>

      <div
        className={`flex pl-4 pt-6 ${collapsed ? "justify-center pl-0" : ""}`}
      >
        <Image
          alt=""
          width={30}
          height={30}
          src="/icons/home-icons.png"
          className="object-contain"
        />
        {!collapsed && (
          <div className="text-pink-800 h-[10vh] pl-6 flex items-center font-bold">
            Accueil
          </div>
        )}
      </div>

      <div className={`flex pl-4 ${collapsed ? "justify-center pl-0" : ""}`}>
        <Image
          alt=""
          width={30}
          height={30}
          src="/icons/trending-icons.png"
          className="object-contain"
        />
        {!collapsed && (
          <div className="text-pink-800 h-[10vh] pl-6 flex items-center font-bold">
            Populaire
          </div>
        )}
      </div>

      <div className={`flex pl-4 ${collapsed ? "justify-center pl-0" : ""}`}>
        <Image
          alt=""
          width={30}
          height={30}
          src="/icons/guid-icons.png"
          className="object-contain"
        />
        {!collapsed && (
          <div className="text-pink-800 h-[10vh] pl-6 flex items-center font-bold">
            Guide Parental
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="pl-1 pt-4">
          <hr className="border-t-2 border-red-800 w-4/5 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default Side;
