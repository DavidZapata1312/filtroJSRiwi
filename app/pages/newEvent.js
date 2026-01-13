import { post } from "../services/api.js";

export function setupNewEvent() {
  const form = document.getElementById("user-form");
  const msg = document.getElementById("form-msg");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newEvent = {
      title: document.getElementById("title").value.trim(),
      description: document.getElementById("description").value.trim(),
      eventDate: document.getElementById("event-date").value.trim(),
      availability: Number(
          document.getElementById("availability").value
      ),
    };

    if (!newEvent.title || !newEvent.description || !newEvent.eventDate) {
      msg.textContent = "Please complete all required fields";
      msg.style.color = "red";
      return;
    }

    try {
      await post("http://localhost:3000/events", newEvent);

      msg.textContent = "✅ Event successfully added";
      msg.style.color = "green";
      form.reset();

    } catch (err) {
      console.error("Error POST:", err);
      msg.textContent = "❌ Error adding event";
      msg.style.color = "red";
    }
  });
}
