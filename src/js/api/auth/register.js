import { API_AUTH_REGISTER } from "../constants";

/**
 * Registers a new user by sending their details to the authentication API.
 *
 * @param {Object} userDetails - An object containing the user's registration details.
 * @param {string} userDetails.name - The user's desired username.
 * @param {string} userDetails.email - The user's email address.
 * @param {string} userDetails.password - The user's password.
 * @param {string} [userDetails.bio] - A brief bio about the user (optional).
 * @param {string} [userDetails.banner] - URL for the user's banner image (optional).
 * @param {string} [userDetails.avatar] - URL for the user's avatar image (optional).
 * @returns {Object} - The data returned from the server upon successful registration.
 * @throws {Error} - If the registration request fails.
 */

export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {
  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      bio,
      banner,
      avatar,
    }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new Error("Register failed");
}
