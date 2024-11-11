import { readPostsByUser } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";

/**
 * Fetches and displays posts created by the logged-in user.
 *
 * @returns {Promise<void>} - Displays the user's posts in the DOM.
 * @throws {Error} - Logs an error if fetching or displaying posts fails.
 */

export async function postByUser() {
  try {
    const loggedInUser = localStorage.getItem("userName");

    const posts = await readPostsByUser(loggedInUser);
    //console.log("Posts fetched for user:", posts);

    displayUserPosts(posts);
  } catch (error) {
    console.error("Error fetching or displaying user posts:", error.message);
  }
}

/**
 * Displays the user's posts on the page.
 *
 * @param {Object[]} posts - An array of post objects to display.
 * @returns {void}
 */

function displayUserPosts(posts) {
  const postsContainer = document.getElementById("user-posts-container");
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post-item", "bg-white", "p-6", "rounded-lg", "shadow-md", "overflow-hidden", "block", "hover:shadow-lg", "transition-shadow", "duration-300");

    const postLink = document.createElement("a");
    postLink.href = `/post/?id=${post.id}`;
    postLink.classList.add("post-link", "block", "mb-4");

    const mediaContent =
      post.media && post.media.url
        ? `<img src="${post.media.url}" alt="${post.media.alt || post.title}" class="w-full h-64 object-cover mb-4 rounded-md">`
        : "";

    postLink.innerHTML = `
      <h3 class="text-2xl font-bold text-gray-800 mb-2 truncate">${post.title}</h3>
      <p class="text-gray-600 mb-2">${post.body || "No content available"}</p>
      ${mediaContent}
    `;

    const editButton = document.createElement("a");
    editButton.href = `/post/edit/?id=${post.id}`;
    editButton.textContent = "Edit Post";
    editButton.classList.add("edit-btn", "bg-blue-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-blue-600", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "mr-2",  "inline-block");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Post";
    deleteButton.classList.add("delete-btn", "bg-red-500", "text-white", "px-4", "py-2", "rounded-md", "hover:bg-red-600", "focus:outline-none", "focus:ring-2", "focus:ring-red-500");

    deleteButton.setAttribute("data-post-id", post.id);
    deleteButton.addEventListener("click", onDeletePost);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("mt-4");
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    postElement.appendChild(postLink);
    postElement.appendChild(buttonContainer);
    postsContainer.appendChild(postElement);
  });
}
