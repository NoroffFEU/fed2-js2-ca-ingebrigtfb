import { register } from '../../api/auth/register';

/**
 * Handles the registration form submission.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - Redirects the user to the login page on successful registration.
 * @throws {Error} - Displays an alert if the registration fails.
 */

export async function onRegister(event) {
    event.preventDefault();
    const registerForm = event.target;
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
        await register(data);
        alert("You are now registered");
        window.location.href = "/auth/login/";
    } catch (error) {
        alert(error);
    }
}
