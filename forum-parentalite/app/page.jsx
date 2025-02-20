import Link from "next/link";

export default function Temporary() {
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <div>
            <h1 className="font-bold">Temporary</h1>
            </div>
            
            <div className="border-2 bg-slate-300"> 
                <a  className="" href="./login">Connect</a>
            </div>
        </div>
        
    )   

}