import { get, post, update } from "../services/api.js";
import { getLoggedUser } from "../services/auth.js";
import { navigate } from "../../main.js";

export async function setupPublic() {
  const user = getLoggedUser();

  if (!user) {
    navigate("/");
    return;
  }

  // get events and enrollments
  const [events, enrollments] = await Promise.all([
    get("http://localhost:3000/events"),
    get("http://localhost:3000/enrollments"),
  ]);

  const userEnrollments = enrollments.filter((e) => e.userId === user.id);
  const enrolledEventIds = userEnrollments.map((e) => e.eventoId);

  const eventsContainer = document.getElementById("events-list");
  eventsContainer.innerHTML = "";

  events.forEach((evento) => {
    const isEnrolled = enrolledEventIds.includes(evento.id);

    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");
    eventCard.innerHTML = `
      <h3>${evento.title}</h3>
      <p>${evento.description}</p>
      <p><strong>Event date:</strong> ${evento.eventDate}</p>
      <p><strong>availability:</strong> ${evento.availability}</p>
        
      <button ${isEnrolled ? "disabled" : ""} data-evento-id="${evento.id}">
        ${isEnrolled ? "Already registered" : "Sign up"}
      </button>

    `;

    eventsContainer.appendChild(eventCard);
  });

  // Events for inscription in events

  eventsContainer.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON" && e.target.dataset.eventoId) {
      const eventoId = e.target.dataset.eventoId;
      const already = enrolledEventIds.includes(eventoId);
      const selectEvent = events.find((evento) => evento.id === eventoId);

      if (!already && selectEvent.availability > 0) {
        await post("http://localhost:3000/enrollments", {
          userId: user.id,
          eventoId,
        });
        const newDispo = {
          ...selectEvent,
          availability: selectEvent.availability - 1,
        };
        await update(
          `http://localhost:3000/events`,
        eventoId,
        newDispo
        
        );

        Swal.fire(
          "¡Successful registration!",
          "You are now registered for the event.",
          "success"
        );

        setupPublic(); // Reload the current view
      }
    }
  });
}
