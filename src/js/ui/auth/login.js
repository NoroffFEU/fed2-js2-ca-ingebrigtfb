import { login } from '../../api/auth/login.js';

/**
 * Handles the login form submission.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - Redirects the user to the home page on successful login.
 * @throws {Error} - Displays an alert if the login fails.
 */

export async function onLogin(event) {
    event.preventDefault();
    const loginForm = event.target;
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        await login(data);
        alert("You are now logged in");
        window.location.href = "/";
    } catch (error) {
        alert(error);
    }
}
