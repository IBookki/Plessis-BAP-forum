"use client";

import { read, like } from "../../actions/postController";
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

	async function sendLike(postId) {
		console.log("like");
		const response = await like(postId);

		const index = posts.findIndex((p) => p._id == postId);
		console.log(index);

		const updatedPost = [...posts];

		updatedPost[index].likes = (updatedPost[index].likes || 0) + 1;
		setPosts(updatedPost);
	}

	return (
		<div>
			<div className="flex flex-col justify-center items-center">
				<h1 className="">Posts</h1>

				<main className="flex flex-col gap-4">
					{posts.map((item, index) => (
						<a href={"#"} key={index}>
							<article>
								<h3 className="font-semibold">{item.title}</h3>
								<p>{item.content}</p>

								<ul className="flex flex-row gap-2">
									<li>
										<button className="p-2 bg-slate-400" onClick={() => sendLike(`${item._id}`)}>
											Like ({item.likes || 0})
										</button>
									</li>
									<li>
										<button>Comment</button>
									</li>
								</ul>
							</article>
						</a>
					))}
				</main>
			</div>
		</div>
	);
}
