import { API_SOCIAL_POSTS } from "../constants";
import { headers as getHeaders } from "../headers";

/**
 * Deletes a post by its ID.
 *
 * @param {number} id - The ID of the post to delete.
 * @returns {Object} - The server response data.
 * @throws {Error} - If the deletion fails.
 */

export async function deletePost(id) {
    const token = localStorage.getItem("token"); 
  
    const requestHeaders = getHeaders(token); 
  
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      headers: requestHeaders,
      method: "DELETE",
    });
  
    if (response.ok) {
      const { data } = await response.json();
      return data;
    }
  
    throw new Error("Delete post failed");
  }