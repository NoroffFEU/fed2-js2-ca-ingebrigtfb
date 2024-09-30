import { onLogout } from '../auth/logout';

/**
 * Sets up the logout button listener.
 * When the user clicks the button, they are asked for confirmation.
 * If confirmed, the user is logged out and redirected to the login page.
 */

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (window.confirm("Are you sure you want to log out?")) {
        onLogout();
        alert("You are now logged out");
        window.location.href = "/auth/login/";  
      }
    });
  } 
}