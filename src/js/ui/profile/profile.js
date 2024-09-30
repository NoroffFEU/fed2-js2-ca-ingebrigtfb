import { readProfile } from "../../api/profile/read";
import { activeUser } from "../../utilities/activeUser";

/**
 * Fetches and displays the active user's profile information.
 *
 * @returns {Promise<void>} - Displays the user's profile, including avatar, name, bio, and post count.
 * @throws {Error} - Logs an error if fetching or displaying the profile fails.
 */

export async function profile() {
  const user = activeUser();
  //console.log(user); 

  if (!user) {
    console.error("No active user found.");
    return;
  }
  try {
    const profile = await readProfile(user); 

    const profileContainer = document.getElementById("profile-container");

    const img = document.createElement("img");
    img.src = profile.avatar.url;

    const userNameElement = document.createElement("h2");
    userNameElement.textContent = profile.name;

    const bio = document.createElement("p");
    bio.textContent = profile.bio;

    const postCount = document.createElement("p");
    postCount.textContent = `Total posts: ${profile._count.posts}`;


    profileContainer.append(img, userNameElement, bio, postCount);

    return profileContainer;
  } catch (error) {
    console.error(error.message);
  }
}