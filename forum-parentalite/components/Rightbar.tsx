import Image from "next/image";
import Link from "next/link";

export const Side: React.FC = () => {
  return (
    <div className="hidden md:block min-h-screen h-full sticky top-0 w-[20%] bg-red overflow-y-auto shadow-md text-left border-l-2 border-pink-800 ml-auto bg-white">
      <div className="flex pl-4">
        <Image
          alt=""
          width={30}
          height={30}
          src="/icons/profil-icons.png"
          className="object-contain"
        />
        <Link href="/account" className="text-lime-600 font-inter h-[10vh] pl-4 flex items-center font-bold">
          Profil
        </Link>
      </div>
      <hr className="border-t-2 border-red-800 w-full mx-auto" />
      <div className="flex pl-4">
        <Image
          alt=""
          width={30}
          height={30}
          src="/icons/messages-icons.png"
          className="object-contain"
        />
        <div className="text-orange-400 font-inter h-[10vh] pl-4  flex items-center font-bold">
          Messages
        </div>
      </div>

      <hr className="border-t-2 border-red-800 w-full mx-auto" />

      <div className="flex pl-4">
        <Image
          alt=""
          width={30}
          height={30}
          src="/icons/notifications-icons.png"
          className="object-contain"
        />
        <div className="text-purple-500 font-inter h-[10vh] pl-4 flex items-center font-bold">
          Notifications
        </div>
      </div>
      <hr className="border-t-2 border-red-800 w-full mx-auto" />
    </div>
  );
};

export default Side;
