import Link from "next/link";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import { getUserFromCookie } from "../../lib/getUser";

export default async function Page() {
    const user = await getUserFromCookie();
    return (
        <>
        {user && (<p>Welcome</p>)}
        <p className="text-center">
            {" "}
            <a href="./register">Don&rsquo;t have an account ?</a>
        </p>
        <LoginForm />
        </>
    );
}
