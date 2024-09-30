export function activeUser() {
    try {
      const userName = localStorage.getItem("userName"); 
      return userName || null; 
    } catch (error) {
      return null;
    }
  }