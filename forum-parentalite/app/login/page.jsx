import Link from "next/link";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Page() {
	return (
		<>
			<p className="text-center">
				{" "}
				Don&rsquo;t have an account ? <strong>Create one</strong>
			</p>
			<RegisterForm />
			<LoginForm />
		</>
	);
}
