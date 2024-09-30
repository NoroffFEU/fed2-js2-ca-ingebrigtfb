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
    postElement.classList.add("post-item");

    const postLink = document.createElement("a");
    postLink.href = `/post/?id=${post.id}`;
    postLink.classList.add("post-link");

    postLink.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body || "No content available"}</p>
        ${
          post.media && post.media.url
            ? `<img src="${post.media.url}" alt="${
                post.media.alt || post.title
              }">`
            : ""
        }
      `;

    const editButton = document.createElement("a");
    editButton.href = `/post/edit/?id=${post.id}`;
    editButton.textContent = "Edit Post";
    editButton.classList.add("edit-btn");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Post";
    deleteButton.classList.add("delete-btn");

    deleteButton.setAttribute("data-post-id", post.id);

    deleteButton.addEventListener("click", onDeletePost);

    postLink.appendChild(editButton);
    postLink.appendChild(deleteButton);

    postElement.appendChild(postLink);
    postsContainer.appendChild(postElement);
  });
}
