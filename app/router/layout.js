export async function renderPrivateLayout(html) {
    const app = document.getElementById("app");
    const loginContent = document.getElementById("login-content");

    loginContent.innerHTML = "";
    app.style.display = "flex";
    app.innerHTML = "";

    const { renderSidebar } = await import("../components/sidebar.js");
    const sidebar = renderSidebar();

    const main = document.createElement("main");
    main.id = "content";
    main.innerHTML = html;

    app.appendChild(sidebar);
    app.appendChild(main);
}
