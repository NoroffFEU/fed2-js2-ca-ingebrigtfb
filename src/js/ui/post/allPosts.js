import { readPosts } from "../../api/post/read";

let currentPage = 1;
const postsPerPage = 12;

export async function allPosts() {
    try {
        const posts = await readPosts(postsPerPage, currentPage);
        console.log(posts);

        const ul = document.getElementById("posts-container");
        ul.innerHTML = "";

        const imagePosts = posts.filter(post => post.media && post.media.url);

        imagePosts.forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h2>${post.title}</h2>
                <img src="${post.media.url}" alt="${post.title}">
            `;
            ul.appendChild(li);
        });
    } catch (error) {
        console.log(error.message);
    }
}