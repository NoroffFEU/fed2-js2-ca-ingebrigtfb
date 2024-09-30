import { API_SOCIAL_POSTS } from "../constants";
import { headers as getHeaders } from "../headers";

/**
 * Creates a new post.
 *
 * @param {Object} postDetails - Post content details.
 * @param {string} postDetails.title - Title of the post.
 * @param {string} postDetails.body - Body of the post.
 * @param {Array<string>} postDetails.tags - Tags for the post.
 * @param {Object} [postDetails.media] - Media information (optional).
 * @param {string} postDetails.media.url - URL for the media.
 * @param {string} [postDetails.media.alt] - Alt text for the media (optional).
 * @returns {Object} - The server response data.
 * @throws {Error} - If post creation fails.
 */

export async function createPost({ title, body, tags, media }) {
    const token = localStorage.getItem("token");

    const requestHeaders = getHeaders(token);

    const response = await fetch(API_SOCIAL_POSTS, {
        headers: requestHeaders,
        method: "POST",
        body: JSON.stringify({
            title,
            body,
            tags,
            media: media ? { url: media.url, alt: media.alt || "" } : null, 
        }),
    });
    if (response.ok) {
        const { data } = await response.json();
        alert("Post created successfully!");
        return data;
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Could not create post");
}