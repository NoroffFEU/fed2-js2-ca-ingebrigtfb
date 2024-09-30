import { deletePost } from '../../api/post/delete';

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