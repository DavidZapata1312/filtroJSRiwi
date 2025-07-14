
const routes = {
  "/": "app/templates/login.html",
  "/register": "app/templates/register.html",
  "/admin": "app/templates/admin.html",
  "/newEvent":"app/templates/newEvent.html",
  "/public": "app/templates/public.html",
};

// Link SPA with data link and logout
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }

  if (e.target.id === "logout-btn") {
    e.preventDefault();
    Swal.fire({
      title: "Sign out?",
      text: "Your current session will be closed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, close",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedUser");
        navigate("/");
      }
    });
  }
});

//  SPA browser with session and role validation
export async function navigate(pathname) {
  let user;
  try {
    user = JSON.parse(localStorage.getItem("loggedUser"));
  } catch (err) {
    localStorage.removeItem("loggedUser");
    user = null;
  }

  //  already logged in and want to log back in
  if (pathname === "/" && user) {
    return navigate(user.role === "admin" ? "/admin" : "/public");
  }

  // 🔐 Not logged in and want to access a protected route
  const isProtected = ["/admin", "/public"];
  if (!user && isProtected.includes(pathname)) {
    Swal.fire("Ups", "Sign in first", "warning");
    return navigate("/");
  }

  //  Role protection: only admin can enter /admin
  if (pathname === "/admin" && user?.role !== "admin") {
    Swal.fire(
      "Access denied",
      "You do not have permits to enter here",
      "error"
    );
    return navigate("/public");
  }
   if (pathname === "/newEvent" && user?.role !== "admin") {
    Swal.fire(
      "Access denied",
      "You do not have permits to enter here",
      "error"
    );
    return navigate("/public");
  }


  const route = routes[pathname];
  if (!route) return navigate("/");

  try {
    const html = await fetch(route).then((res) => res.text());

    const loginContent = document.getElementById("login-content");
    const app = document.getElementById("app");

    if (pathname === "/" || pathname === "/register") {
      app.style.display = "none";
      app.innerHTML = "";
      loginContent.innerHTML = html;

      if (pathname === "/") {
        const { setupLogin } = await import("./app/pages/login.js");
        setupLogin();
      } else {
        const { setupRegister } = await import("./app/pages/register.js");
        setupRegister();
      }
    } else {
      loginContent.innerHTML = "";
      app.style.display = "flex";
      app.innerHTML = "";

      const { renderSidebar } = await import("./app/components/sidebar.js");
     

      const sidebar = renderSidebar();
      

      const main = document.createElement("main");
      main.id = "content";
      main.innerHTML = html;

      const mainContent = document.createElement("div");
      mainContent.className = "main-content";
    
      mainContent.appendChild(main);

      app.appendChild(sidebar);
      app.appendChild(mainContent);

      if (pathname === "/admin") {
        const { setupDashboard } = await import("./app/pages/admin.js");
        setupDashboard();
      } 
      if (pathname === "/public") {
        const { setupPublic } = await import("./app/pages/public.js");
        setupPublic();
      }
      if (pathname ==="/newEvent"){
         const { setupNewEvent } = await import("./app/pages/newEvent.js");
        setupNewEvent();       
      }
    }

    history.pushState({}, "", pathname);
  } catch (err) {
    console.error("Browsing error:", err);
    Swal.fire("Ups", "Something went wrong when loading the route", "error");
    if (pathname !== "/") navigate("/");
  }
}

//  Browser back/forward
window.addEventListener("popstate", () => navigate(location.pathname));

//  Load current route when starting the app
navigate(location.pathname);
