import { readPosts } from "../../api/post/read";

export async function allPosts() {
  try {
    const posts = await readPosts();
    console.log(posts);

    posts.sort((a, b) => new Date(b.updated) - new Date(a.updated));

    const display12Posts = document.getElementById("posts-container");
    display12Posts.innerHTML = "";

    const loggedInUser = localStorage.getItem('userName');
    console.log("Logged-in user:", loggedInUser);

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post-item");

      const link = document.createElement("a");
      link.href = `/post/?id=${post.id}`;

      const mediaContent =
        post.media && post.media.url
          ? `<img src="${post.media.url}" alt="${
              post.media.alt || post.title
            }">`
          : "";

      link.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <p>Author: ${post.author.name}</p> 
                ${mediaContent}
            `;
            console.log("Post author:", post.author.name);
            console.log(loggedInUser.name);


      if (post.author.name === loggedInUser) {
        const editButton = document.createElement("a");
        editButton.href = `/post/edit/?id=${post.id}`; 
        editButton.textContent = "Edit Post";
        editButton.classList.add("edit-btn"); 
        postElement.appendChild(editButton);
      }
      postElement.appendChild(link);
      display12Posts.appendChild(postElement);
    });
  } catch (error) {
    console.log(error.message);
  }
}
