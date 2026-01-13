import { get, update, remove } from "../services/api.js";
import { getLoggedUser } from "../services/auth.js";

export async function setupDashboard() {
  const user = getLoggedUser();
  if (!user) return;

  let events = await get("http://localhost:3000/events");
  const eventsTable = document.getElementById("events-table");
  if (!eventsTable) return;

  eventsTable.innerHTML = "";

  events.forEach((event) => {
    eventsTable.innerHTML += `
      <tr>
        <td>${event.id}</td>
        <td>${event.title}</td>
        <td>${event.description}</td>
        <td>${event.eventDate}</td>
        <td>
          <button data-edit-id="${event.id}">✏️</button>
          <button data-delete-id="${event.id}">🗑️</button>
        </td>
      </tr>
    `;
  });

  eventsTable.addEventListener("click", async (e) => {
    const editBtn = e.target.closest("[data-edit-id]");
    const deleteBtn = e.target.closest("[data-delete-id]");

    if (editBtn) {
      const id = editBtn.dataset.editId;
      const event = events.find((e) => e.id == id);

      const { value, isConfirmed } = await Swal.fire({
        title: "Edit event",
        html: `
          <input id="title" class="swal2-input" value="${event.title}">
          <input id="description" class="swal2-input" value="${event.description}">
          <input id="date" class="swal2-input" value="${event.eventDate}">
        `,
        preConfirm: () => ({
          title: document.getElementById("title").value,
          description: document.getElementById("description").value,
          eventDate: document.getElementById("date").value,
        }),
        showCancelButton: true,
      });

      if (isConfirmed) {
        await update("http://localhost:3000/events", id, value);
        setupDashboard();
      }
    }

    if (deleteBtn) {
      const id = deleteBtn.dataset.deleteId;

      const result = await Swal.fire({
        title: "Delete event?",
        icon: "warning",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        await remove("http://localhost:3000/events", id);
        setupDashboard();
      }
    }
  });
}
