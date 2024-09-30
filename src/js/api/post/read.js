import { API_SOCIAL_POSTS, API_SOCIAL_POSTS_AUTHOR, API_SOCIAL_PROFILES } from "../constants";
import { headers as getHeaders } from "../headers";

/**
 * Fetches a single post by ID.
 *
 * @param {number} id - The ID of the post to fetch.
 * @returns {Object} - The post data.
 * @throws {Error} - If the post is not found.
 */

export async function readPost(id) {
  const url = `${API_SOCIAL_POSTS}/${id}`;

  const token = localStorage.getItem("token");
  const requestHeaders = getHeaders(token);

  const response = await fetch(url, {
    headers: requestHeaders,
  });
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }
  throw new Error("Post not found");
}

/**
 * Fetches multiple posts with pagination.
 *
 * @param {number} [limit=12] - The number of posts to fetch per page.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [tag] - The tag to filter posts (optional).
 * @returns {Object[]} - An array of post data.
 * @throws {Error} - If posts are not found.
 */

export async function readPosts(limit = 12, page = 1, tag) {
  const url = new URL(API_SOCIAL_POSTS_AUTHOR);

  const token = localStorage.getItem("token");

  const requestHeaders = getHeaders(token);

  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);

  const response = await fetch(url, {
    headers: requestHeaders,
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }
  throw new Error("Posts not found");
}

/**
 * Fetches all posts by a specific user.
 *
 * @param {string} username - The username to fetch posts for.
 * @returns {Object[]} - An array of post data.
 * @throws {Error} - If fetching posts for the user fails.
 */

export async function readPostsByUser(username) {
  const url = new URL(`${API_SOCIAL_PROFILES}/${username}/posts`);
  const token = localStorage.getItem("token");
  const requestHeaders = getHeaders(token);

  try {
    const response = await fetch(url, {
      headers: requestHeaders,
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    }

    throw new Error(`Failed to fetch posts for profile: ${username}`);
  } catch (error) {
    console.error("Error fetching profile posts:", error);
    throw error;
  }
}

