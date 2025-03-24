import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Side: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed z-50 top-20 left-2 bg-white rounded-full p-2 shadow-md border border-pink-800 hover:bg-pink-50"
        aria-label="Toggle sidebar"
      >
        <Image
          alt="Expand"
          width={20}
          height={20}
          src={mobileOpen ? "/icons/arrow-left.png" : "/icons/arrow-right.png"}
          className="object-contain"
        />
      </button>

      <div
        className={`fixed md:sticky top-0 min-h-screen h-full bg-white overflow-y-auto shadow-md text-left border-r-2 border-pink-800 transition-all duration-300 z-40 
          ${mobileOpen ? "left-0" : "-left-full"} md:left-0
          ${collapsed ? "md:w-[60px]" : "md:w-[22%]"}
          w-[70%] md:block`}
      >
        <div className="flex justify-end p-2">
          <button
            onClick={toggleSidebar}
            className="rounded-full p-2 hidden md:block hover:bg-pink-50"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Image
              alt={collapsed ? "Expand" : "Collapse"}
              width={20}
              height={20}
              src={
                collapsed ? "/icons/arrow-right.png" : "/icons/arrow-left.png"
              }
              className="object-contain"
              onError={() =>
                console.log("Image not found - please add arrow icons")
              }
            />
          </button>
          <button
            onClick={toggleMobileSidebar}
            className="rounded-full p-2 md:hidden hover:bg-pink-50"
            aria-label="Close sidebar"
          >
            <Image
              alt="Close"
              width={20}
              height={20}
              src="/icons/arrow-left.png"
              className="object-contain"
              onError={() =>
                console.log("Image not found - please add arrow icons")
              }
            />
          </button>
        </div>

        <Link href={"/home"}>
          <div
            className={`flex pl-4 ${
              collapsed ? "md:justify-center md:pl-0" : ""
            } hover:bg-pink-100 transition-colors duration-200 rounded-l-md`}
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
        </Link>

        <Link href="/trending">
          <div
            className={`flex pl-4 ${
              collapsed ? "md:justify-center md:pl-0" : ""
            } hover:bg-pink-100 transition-colors duration-200 rounded-l-md`}
          >
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
        </Link>
        <div
          className={`flex pl-4 ${
            collapsed ? "md:justify-center md:pl-0" : ""
          } hover:bg-pink-100 transition-colors duration-200 rounded-l-md cursor-pointer`}
        >
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
    </>
  );
};

export default Side;
