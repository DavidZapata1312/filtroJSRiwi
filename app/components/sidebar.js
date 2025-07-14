export function renderSidebar() {
  const aside = document.createElement("aside");
  aside.className = "sidebar";
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const isAdmin = user?.role === "admin";
  const actionsHtml = isAdmin
    ? `
           <h2>Events</h2>
           <img src="" alt="">
    <nav>
      
      <a href="/admin" data-link>Events</a>
      <button id="logout-btn">Logout</button>
    </nav>
        
      `
    : `   <h2>Events</h2>
    <img src="" alt="">
    <nav>
      <a href="/public" data-link>Public</a>

      <button id="logout-btn">Logout</button>
    </nav>`;

  aside.innerHTML = `
      <span class="actions">
        ${actionsHtml}
      </span>
  `;

  const logoutBtn = aside.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

      navigate("/");
    });
  }

  return aside;
}
