"use client";
import { read } from "../../actions/postController";

export default function Home() {
	async function fetch() {
		const posts = await read();
		console.log(posts);
	}

    fetch();

	return (
		<div>
			<div className="flex justify-center items-center">
				<h1 className="">Posts</h1>
			</div>
		</div>
	);
}
