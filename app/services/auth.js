const USER_KEY = "loggedUser";

// Save session
export function setLoggedUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get session
export function getLoggedUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

// Sign out
export function logoutUser() {
  localStorage.removeItem(USER_KEY);
}

// Check if there is an active user
export function isLoggedIn() {
  return !!localStorage.getItem(USER_KEY);
}

// Check if it is admin
export function isAdmin() {
  const user = getLoggedUser();
  return user?.role === "admin";
}


export function useAuthGuard(route, navigate) {
  const user = getLoggedUser();

  if (!user) {
    // NThere is no session → return to login
    navigate("/");
    return;
  }

  if (route === "/admin" && user.role !== "admin") {
    // It's not admin → we send it to public view
    navigate("/public");
    return;
  }

  // If everything is fine, it does nothing and lets the page load
}