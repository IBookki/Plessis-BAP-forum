import Link from "next/link";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import { getUserFromCookie } from "../../lib/getUser";

export default async function Page() {
	const user = await getUserFromCookie();
	return (
		<>
			<RegisterForm />
		</>
	);
}
