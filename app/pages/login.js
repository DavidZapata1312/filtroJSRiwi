import { get } from "../services/api.js";
import { navigate } from "../router/router.js";
import { setLoggedUser } from "../services/auth.js";

export async function setupLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Empty fields",
        text: "Please complete all fields.",
      });
      return;
    }

    try {
      const users = await get("http://localhost:3000/users");

      const found = users.find(
          (user) => user.email === email && user.password === password
      );

      if (!found) {
        Swal.fire({
          icon: "error",
          title: "Access denied",
          text: "Incorrect email or password.",
        });
        return;
      }

      setLoggedUser(found);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `Hello, ${found.name}! Redirecting...`,
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate(found.role === "admin" ? "/admin" : "/public");
      }, 1500);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "The database could not be accessed.",
      });
    }
  });
}
