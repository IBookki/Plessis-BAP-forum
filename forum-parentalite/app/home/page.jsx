"use client";

import { read } from "../../actions/postController";
import { useEffect } from "react";

export default function Home() {
	async function fetch() {
		const posts = await read();
		console.log(posts);
	}

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div>
			<div className="flex justify-center items-center">
				<h1 className="">Posts</h1>
			</div>
		</div>
	);
}
