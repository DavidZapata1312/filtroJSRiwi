import { get, post } from "../services/api.js";
import { navigate } from "../router/router.js";

export async function setupRegister() {
  const form = document.getElementById("register-form");
  const msg = document.getElementById("register-msg");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();

    if (!name || !email || !password || !confirm) {
      msg.textContent = "Please complete all fields.";
      return;
    }

    if (password !== confirm) {
      msg.textContent = "Passwords do not match.";
      return;
    }

    try {
      const users = await get("http://localhost:3000/users");
      const alreadyExists = users.find(u => u.email === email);

      if (alreadyExists) {
        msg.textContent = "There is already a user with that email.";
        return;
      }

      const newUser = {
        name,
        email,
        password,
        role: "customer"
      };

      const createdUser = await post(
          "http://localhost:3000/users",
          newUser
      );

      localStorage.setItem("loggedUser", JSON.stringify(createdUser));
      navigate("/public");

    } catch {
      msg.textContent = "Something went wrong. Try again.";
    }
  });
}
