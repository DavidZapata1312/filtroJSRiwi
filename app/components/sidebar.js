import { getLoggedUser, isAdmin } from "../services/auth.js";

export function renderSidebar() {
  const aside = document.createElement("aside");
  aside.className = "sidebar";

  const user = getLoggedUser();
  if (!user) return aside;

  const menuHtml = isAdmin()
      ? `
      <h2>Events</h2>
      <nav>
        <a href="/admin" data-link>Admin Events</a>
        <a href="/newEvent" data-link>New Event</a>
        <button id="logout-btn">Logout</button>
      </nav>
    `
      : `
      <h2>Events</h2>
      <nav>
        <a href="/public" data-link>Public Events</a>
        <button id="logout-btn">Logout</button>
      </nav>
    `;

  aside.innerHTML = menuHtml;
  return aside;
}
