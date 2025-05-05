export const getUsernameFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub || payload.username;
    } catch (e) {
      return null;
    }
  };
  