import Image from "next/image";
import Link from "next/link";

export const Side: React.FC = () => {
  return (
    <div className=" h-screen w-[22%] bg-white overflow-y-auto shadow-md text-left border-r-2 border-pink-800">
            <div className="flex pl-4 pt-6">
                <Image
                    alt=""
                    width={30}
                    height={30}
                    src="/icons/home-icons.png"
                    className="object-contain"
                />
                <div className="text-pink-800 h-[10vh] pl-6 flex items-center font-bold">
                    Accueil
                </div>
            </div>
            <div className="flex pl-4">
                <Image
                alt=""
                width={30}
                height={30}
                src="/icons/trending-icons.png"
                className="object-contain"
                />
                <div className="text-pink-800 h-[10vh] pl-6 flex items-center font-bold">
                Populaire
                </div>
            </div>
            <div className="flex pl-4">
                <Image
                alt=""
                width={30}
                height={30}
                src="/icons/guid-icons.png"
                className="object-contain"
                />
                <div className="text-pink-800 h-[10vh] pl-6 flex items-center font-bold">
                Guide Parental
                </div>
            </div>
            <div className="pl-1 pt-4">
                <hr className="border-t-2 border-red-800 w-4/5 mx-auto" />
            </div>
        /</div>
  );
};

export default Side;
