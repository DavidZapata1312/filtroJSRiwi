import { get, post } from "../services/api.js";
import { navigate } from "../../main.js"; 

export async function setupRegister() {
  const form = document.getElementById("register-form");
  const msg = document.getElementById("register-msg");

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

    const users = await get("http://localhost:3000/users");

    const alreadyExists = users.find(user => user.email === email);

    if (alreadyExists) {
      msg.textContent = "There is already a user with that email.";
      return;
    };
    if (password != confirm){
        msg.textContent="your passwords don't match"
        return;
    }

    const newUser = {
 
      name,
      email,
      password,
      role:"customer"
    };

    await post("http://localhost:3000/users", newUser);

    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    navigate("/users");
  });
}