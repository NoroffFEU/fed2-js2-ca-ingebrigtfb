import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";


export async function deletePost(id) {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
        headers: headers(),
        method: "DELETE",
    });
    
    if (response.ok) {
        const { data } = await response.json();
        return data;
    }
    
    throw new Error("Delete post failed");
}
