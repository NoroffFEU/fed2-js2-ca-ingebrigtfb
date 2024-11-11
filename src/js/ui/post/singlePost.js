import { readPost } from "../../api/post/read";

/**
 * Fetches and displays a single post based on the post ID in the URL.
 *
 * @returns {Promise<void>} - Displays the post details in the DOM.
 * @throws {Error} - Logs an error if fetching or displaying the post fails.
 */

export async function singlePost() {
  try {
    const url = new URL(window.location.href);
    const postId = url.searchParams.get("id");

    const post = await readPost(postId);
    //console.log(post);

    const postContainer = document.getElementById("idPostContainer");

    postContainer.innerHTML = "";

    /**
     * Formats the date and time from an ISO string.
     *
     * @param {string} isoString - The ISO date string to format.
     * @returns {string} - The formatted date and time (DD/MM/YYYY HH:MM).
     */

    function formatDate(isoString) { 
      const date = new Date(isoString);

      const formattedDate = date.toLocaleDateString("en-GB");

      const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${formattedDate} ${formattedTime}`;
    }

    const postElement = document.createElement("div");
    postElement.classList.add("post-item", "bg-white", "p-6", "rounded-lg", "shadow-md", "overflow-hidden");

    const mediaContent =
      post.media && post.media.url
        ? `<div class="flex justify-center mb-4">
             <img src="${post.media.url}" alt="${post.media.alt || post.title}" class="w-6/12 h-auto rounded-md">
           </div>`
        : "";

        postElement.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800 mb-2">${post.title}</h2>
        <p class="text-gray-600 mb-2">${post.body}</p>
        ${mediaContent}
        <p class="text-gray-500 mb-2">Tags: ${post.tags.join(", ")}</p>
        <p class="text-gray-500 mb-2">Updated: ${formatDate(post.updated)}</p>
        <p class="text-gray-500 mb-2">Created: ${formatDate(post.created)}</p>
      `;

    postContainer.appendChild(postElement);
  } catch (error) {
    console.log(error.message);
  }
}
