import { useState, useEffect } from "react";

export function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in to the localStorage when loading the page.
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    // Successful authentication logic
    setIsLoggedIn(true);

  };

  const logout = () => {
    // Logout logic
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return { isLoggedIn, login, logout };
}