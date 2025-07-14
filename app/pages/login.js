import { get } from "../services/api.js";
import { navigate } from "../../main.js";


export async function setupLogin() {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Empty fields",
        text: "Please complete all fields."
      });
      return;
    }

    try {
      const users = await get("http://localhost:3000/users");

      const found = users.find(
        user => user.email === email && user.password === password
      );

      if (found) {
        localStorage.setItem("loggedUser", JSON.stringify(found));

        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: `Hello, ${found.name}! Redirecting...`,
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => navigate("/users"), 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Access denied",
          text: "Incorrect email or password."
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "The database could not be accessed."
      });
    }
  });
}
