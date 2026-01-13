const USER_KEY = "loggedUser";

// Save session
export function setLoggedUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get session
export function getLoggedUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    logoutUser();
    return null;
  }
}

// Sign out
export function logoutUser() {
  localStorage.removeItem(USER_KEY);
}

// Check if there is an active user
export function isLoggedIn() {
  return !!getLoggedUser();
}

// Check if it is admin
export function isAdmin() {
  const user = getLoggedUser();
  return user?.role === "admin";
}

// Simple route guard
export function useAuthGuard(route) {
  const user = getLoggedUser();

  if (!user) return false;
  if (route === "/admin" && user.role !== "admin") return false;

  return true;
}
