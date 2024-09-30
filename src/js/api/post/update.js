import { API_SOCIAL_POSTS } from "../constants";
import { headers as getHeaders } from "../headers";

/**
 * Fetches a post by its ID.
 *
 * @param {number} postId - The ID of the post to fetch.
 * @returns {Object} - The post data.
 * @throws {Error} - If fetching the post data fails.
 */

// Fetch the existing post data
export async function fetchPost(postId) {
    const token = localStorage.getItem("token");

    const requestHeaders = getHeaders(token);

    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
        headers: requestHeaders,
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }
    throw new Error("Failed to fetch post data");
}

/**
 * Updates an existing post by its ID.
 *
 * @param {number} postId - The ID of the post to update.
 * @param {Object} postDetails - The post details to update.
 * @param {string} postDetails.title - The title of the post.
 * @param {string} postDetails.body - The body of the post.
 * @param {Object} postDetails.media - Media information (optional).
 * @param {string} postDetails.media.url - URL of the media.
 * @param {string} [postDetails.media.alt] - Alt text for the media (optional).
 * @returns {Object} - The updated post data.
 * @throws {Error} - If updating the post fails.
 */


export async function updatePost(postId, { title, body, media }) {
    const token = localStorage.getItem("token");
    const requestHeaders = getHeaders(token);

    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify({
            title,
            body,
            media: media.url ? { url: media.url, alt: media.alt || "" } : null,
        }),
    });

    if (response.ok) {
        const { data } = await response.json();
        return data;
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Could not update post");
}