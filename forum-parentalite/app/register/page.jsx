import Link from "next/link";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import { getUserFromCookie } from "../../lib/getUser";

export default async function Page() {
	const user = await getUserFromCookie();
	return (
		<>
			<p className="text-center">
				{" "}
				<a href="./login">Already have an account?</a>
			</p>
			<RegisterForm />
		</>
	);
}
