import { API_SOCIAL_POSTS } from "../constants";
import { headers as getHeaders } from "../headers";

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