import { fetchPost, updatePost } from "../../api/post/update";

/**
 * Handles the process of editing a post, including fetching and updating post data.
 *
 * @returns {Promise<void>} - Fetches the post data, populates the form, and updates the post on submission.
 * @throws {Error} - Logs an error if fetching or updating the post fails.
 */

export async function handleEditPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const editPostForm = document.forms['editPost']; 
    const titleInput = editPostForm['title'];
    const bodyInput = editPostForm['body'];
    const mediaUrlInput = editPostForm['mediaUrl'];
    const mediaAltInput = editPostForm['mediaAlt'];
    const tagsInput = editPostForm['tags'];

    try {
        const postData = await fetchPost(postId);
        titleInput.value = postData.title;
        bodyInput.value = postData.body;

        if (postData.media && postData.media.url) {
            mediaUrlInput.value = postData.media.url;
            mediaAltInput.value = postData.media.alt || "";
        }
        if (postData.tags && postData.tags.length > 0) {
            tagsInput.value = postData.tags.join(", ");
        }
    } catch (error) {
        console.error("Error fetching post data", error);
    }

    editPostForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const body = bodyInput.value;
        const media = {
            url: mediaUrlInput.value,
            alt: mediaAltInput.value,
        };
        const tags = tagsInput.value.split(',').map(tag => tag.trim());

        try {
            await updatePost(postId, { title, body, media, tags });
            window.alert("Post is updated successfully!");
            window.location.href = `/`; 
        } catch (error) {
            console.error("Error updating post:", error);
            window.alert("Error updating post");
        }
    });
}