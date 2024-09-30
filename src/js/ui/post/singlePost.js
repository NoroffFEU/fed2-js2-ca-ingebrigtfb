import { readPost } from "../../api/post/read";

export async function singlePost() {
  try {
    const url = new URL(window.location.href);
    const postId = url.searchParams.get("id");

    const post = await readPost(postId);
    console.log(post);

    const postContainer = document.getElementById("idPostContainer");

    postContainer.innerHTML = "";

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
    postElement.classList.add("post-item");

    const mediaContent =
      post.media && post.media.url
        ? `<img src="${post.media.url}" alt="${post.media.alt || post.title}">`
        : "";

    postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            ${mediaContent}
            <p>Sjanger: ${post.tags}</p>
            <p>Artikkel oppdatert: ${formatDate(post.updated)}</p>
        <p>Artikkel laget: ${formatDate(post.created)}</p>
        `;

    postContainer.appendChild(postElement);
  } catch (error) {
    console.log(error.message);
  }
}
