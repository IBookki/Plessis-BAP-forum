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

				<main>
					{posts.map((item, index) => (
						<a href={`post/${item._id}`} key={index}>
							<article>
								<h3 className="font-semibold">{item.title}</h3>
								<p>{item.content}</p>
							</article>
						</a>
					))}
				</main>
			</div>
		</div>
	);
}
