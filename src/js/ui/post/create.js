import { createPost } from '../../api/post/create';

/**
 * Handles the creation of a new post from a form submission.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - Redirects to the home page upon successful post creation.
 * @throws {Error} - Displays an alert if the post creation fails.
 */

export async function onCreatePost(event) {
    event.preventDefault();

    const createForm = event.target;
    const formData = new FormData(createForm);
    const data = Object.fromEntries(formData.entries());

    let media = null;

    if (data.mediaUrl) {
        media = {
            url: data.mediaUrl, 
            alt: data.mediaAlt || "",  
        };
    }
    delete data.mediaUrl;
    delete data.mediaAlt;

    data.tags = data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [];

    console.log("Request Body:", JSON.stringify({
        title: data.title,
        body: data.body,
        tags: data.tags,
        media: media  
    }));

    try {
         await createPost({
            title: data.title,
            body: data.body,
            tags: data.tags,
            media: media 
        });
        window.location.href = `/`;
    } catch (error) {
        alert("Error creating post: " + error.message);
    }
}