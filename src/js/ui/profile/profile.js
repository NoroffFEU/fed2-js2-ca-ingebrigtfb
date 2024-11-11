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
    profileContainer.innerHTML = ""; 

    const profileElement = document.createElement("div");
    profileElement.classList.add("profile-item", "bg-white", "p-6", "rounded-lg", "shadow-md", "overflow-hidden");

    const img = document.createElement("img");
    img.src = profile.avatar.url;
    img.alt = `${profile.name}'s avatar`;
    img.classList.add("w-32", "h-32", "rounded-full", "mx-auto", "mb-4");

    const userNameElement = document.createElement("h2");
    userNameElement.textContent = profile.name;
    userNameElement.classList.add("text-2xl", "font-bold", "text-gray-800", "mb-2", "text-center");

    const bio = document.createElement("p");
    bio.textContent = profile.bio;
    bio.classList.add("text-gray-600", "mb-4", "text-center");

    const postCount = document.createElement("p");
    postCount.textContent = `Total posts: ${profile._count.posts}`;
    postCount.classList.add("text-gray-500", "text-center");

    profileElement.append(img, userNameElement, bio, postCount);
    profileContainer.appendChild(profileElement);

    return profileContainer;
  } catch (error) {
    console.error(error.message);
  }
}