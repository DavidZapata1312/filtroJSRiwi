import { navigate } from "./app/router/router.js";
import { logoutUser } from "./app/services/auth.js";

// Handle SPA navigation
document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");

  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
    return;
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
        logoutUser();
        navigate("/");
      }
    });
  }
});

// Browser navigation (back / forward)
window.addEventListener("popstate", () => {
  navigate(location.pathname, { replace: true });
});

// Initial load
navigate(location.pathname, { replace: true });
