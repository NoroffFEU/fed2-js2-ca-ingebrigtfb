import { API_AUTH_LOGIN } from "../constants";

/**
 * Logs in a user by sending their email and password to the authentication API.
 *
 * @param {Object} credentials - An object containing the user's credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Object} - The user data returned from the server.
 * @throws {Error} - If the login request fails or the server returns an error.
 */

export async function login({ email, password }) {
  const response = await fetch(API_AUTH_LOGIN, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const { data } = await response.json(); 
    const { accessToken: token, ...user } = data; 
    const userName = user.name;
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName); 
    return data;
  }
  throw new Error("Login failed");
}
