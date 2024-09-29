import { API_SOCIAL_POSTS } from "../constants";
import { headers as getHeaders } from "../headers";

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