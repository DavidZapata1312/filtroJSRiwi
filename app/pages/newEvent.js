import { post } from "../services/api.js";

export function setupNewEvent() {
  const form = document.getElementById("user-form");
  const msg = document.getElementById("form-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newEvent = {
        
      title: document.getElementById("title").value.trim(),
      description: document.getElementById("description").value.trim(),
      eventDate: document.getElementById("event-date").value.trim(),
      availability: document.getElementById("availability").value.trim(),

    };

    try {
      const res = await post("http://localhost:3000/events", newEvent);
      console.log("Respuesta del POST:", res);
      msg.textContent = "✅ event successfully added";
      msg.style.color = "green";
      form.reset();
    } catch (err) {
      console.error("Error POST:", err); // 👈 esto te muestra si falló
      msg.textContent = "❌ Error adding event";
      msg.style.color = "red";
    }
  });
}