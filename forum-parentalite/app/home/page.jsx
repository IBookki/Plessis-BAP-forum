"use client";

import { read } from "../../actions/postController";
import { useEffect, useState } from "react";

export default function Home() {
	const [posts, setPosts] = useState([]);

	async function fetch() {
		const data = await read();
		console.log(data);
		setPosts(data);
	}

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div>
			<div className="flex flex-col justify-center items-center">
				<h1 className="">Posts</h1>

				<ul>
					{posts.map((item, index) => (
						<li key={index}>{item.title} {item.content}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
