import { deletePost } from '../../api/post/delete';

/**
 * Handles the deletion of a post when the delete button is clicked.
 *
 * @param {Event} event - The click event from the delete button.
 * @returns {Promise<void>} - Reloads the page upon successful deletion.
 * @throws {Error} - Displays an alert if the post deletion fails.
 */

export async function onDeletePost(event) {
    event.preventDefault();
  
    const postId = event.target.dataset.postId;
  
    try {
      const userConfirm = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (userConfirm) {
        deletePost(postId);
        alert(`Post was deleted!`);
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  }