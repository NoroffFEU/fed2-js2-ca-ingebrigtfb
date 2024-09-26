import { onLogout } from '../auth/logout';

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