import { readPosts } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";

/**
 * Fetches and displays all posts, sorted by the latest updates.
 * If the post belongs to the logged-in user, "Edit" and "Delete" buttons are shown.
 *
 * @returns {Promise<void>} - Displays posts and handles the user's ability to edit or delete their own posts.
 * @throws {Error} - Logs an error if fetching or displaying posts fails.
 */

export async function allPosts() {
  try {
    const posts = await readPosts();
    //console.log(posts);

    posts.sort((a, b) => new Date(b.updated) - new Date(a.updated));

    const display12Posts = document.getElementById("posts-container");
    display12Posts.innerHTML = "";

    const loggedInUser = localStorage.getItem("userName");
    //console.log("Logged-in user:", loggedInUser);

    posts.forEach((post) => {
      const postElement = document.createElement("a");
      postElement.href = `/post/?id=${post.id}`;
      postElement.classList.add("post-item", "bg-white", "p-6", "rounded-lg", "shadow-md", "overflow-hidden", "block", "hover:shadow-lg", "transition-shadow", "duration-300");

      const mediaContent =
        post.media && post.media.url
          ? `<img src="${post.media.url}" alt="${
              post.media.alt || post.title
            }" class="w-full h-64 object-cover mb-4 rounded-md">`
          : "";

      postElement.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800 mb-2 truncate">${post.title}</h2>
        <p class="text-gray-600 mb-2">${post.body}</p>
        <p class="text-gray-500 mb-2">Author: ${post.author.name}</p>
        ${mediaContent}
      `;

      if (post.author.name === loggedInUser) {
        const editButton = document.createElement("a");
        editButton.href = `/post/edit/?id=${post.id}`;
        editButton.textContent = "Edit Post";
        editButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-blue-600", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "mr-2", "inline-block");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Post";
        deleteButton.classList.add("bg-red-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-red-600", "focus:outline-none", "focus:ring-2", "focus:ring-red-500");
        deleteButton.onclick = (event) => {
          event.stopPropagation();
          event.preventDefault();
          onDeletePost(post.id);
        };

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("mt-4");
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        postElement.appendChild(buttonContainer);
      }

      display12Posts.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching or displaying posts:", error);
  }
}

document.getElementById('menu-toggle').addEventListener('click', function () {
  document.getElementById('menu').classList.toggle('hidden');
});

