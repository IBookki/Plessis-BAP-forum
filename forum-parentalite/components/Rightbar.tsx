import Image from "next/image";
import Link from "next/link";

export const Side: React.FC = () => {
  return (
    <div className="h-screen w-[15%] bg-red overflow-y-auto shadow-md text-left border-l-2 border-pink-800 ml-auto">
      <div className="text-lime-400 font-inter h-[10vh] pl-4 flex items-center font-bold">
        Profil
      </div>
      <div className="text-orange-400 font-inter border-t-2 h-[10vh] pl-4 border-pink-800 flex items-center font-bold">
        Messages
      </div>
      <div className="text-purple-500 font-inter border-t-2 h-[10vh] pl-4 border-pink-800 flex items-center font-bold">
        Notifications
      </div>
    </div>
  );
};

export default Side;
