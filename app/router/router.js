import { routes } from "./routes.js";
import { canAccessRoute } from "./guards.js";
import { renderPrivateLayout } from "./layout.js";

export async function navigate(pathname) {
    let user;

    try {
        user = JSON.parse(localStorage.getItem("loggedUser"));
    } catch {
        localStorage.removeItem("loggedUser");
        user = null;
    }

    const route = routes[pathname] || routes["/"];

    if (!canAccessRoute(route, user)) {
        Swal.fire("Access denied", "You cannot access this route", "warning");
        return navigate(user ? "/public" : "/");
    }

    try {
        const res = await fetch(route.template);
        if (!res.ok) throw new Error("Template not found");
        const html = await res.text();

        if (route.publicOnly) {
            document.getElementById("app").style.display = "none";
            document.getElementById("login-content").innerHTML = html;
        } else {
            await renderPrivateLayout(html);
        }

        if (route.script) {
            await route.script();
        }

        history.pushState({}, "", pathname);
    } catch (err) {
        console.error(err);
        Swal.fire("Ups", "Error loading page", "error");
        navigate("/");
    }
}
