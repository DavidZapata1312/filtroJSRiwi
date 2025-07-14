import { get, update } from "../services/api.js";
import { getLoggedUser } from "../services/auth.js";

export async function setupDashboard() {
  const user = getLoggedUser();



  // Get events
  const events = await get("http://localhost:3000/events");
  const eventsTable = document.getElementById("events-table");

  if (eventsTable) {
    eventsTable.innerHTML = "";
    events.forEach((u) => {
      eventsTable.innerHTML += `
      
        <tr>
          <td>${u.id}</td>
          <td>${u.title}</td>
          <td>${u.description}</td>
          <td>${u.eventDate}</td>
          <td>
            <button data-edit-id="${u.id}" data-type="event">✏️</button>
            <button data-delete-id="${u.id}" data-type="event">🗑️</button>
          </td>
        </tr>
      `;
    });
  }



//management of actions to edit and delete
  eventsTable?.addEventListener("click", async (e) => {
    const editBtn = e.target.closest("button[data-edit-id]");
    const deleteBtn = e.target.closest("button[data-delete-id]");

    if (editBtn) {
      const id = editBtn.dataset.editId;
      const evento = events.find((u) => u.id == id);

      const { value: data, isConfirmed } = await Swal.fire({
        title: "Edit event",
        html: `
          <input id="swal-title" class="swal2-input" placeholder="Title" value="${evento.title}">
          <input id="swal-description" class="swal2-input" placeholder="Description" value="${evento.description}">
           <input id="swal-date" class="swal2-input" placeholder="event date" value="${evento.eventDate}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => ({
          title: document.getElementById("swal-title").value,
          description: document.getElementById("swal-description").value,
          eventDate: document.getElementById("swal-date").value,
        })
      });

      if (isConfirmed) {
        await update("http://localhost:3000/events", id, data);
        Swal.fire("Updated", "modified event", "success");
        setupDashboard();
      }
    }

    if (deleteBtn) {
      const id = deleteBtn.dataset.deleteId;
      if (confirm("Surely you want to delete this user?")) {
        await fetch(`http://localhost:3000/events/${id}`, { method: "DELETE" });
        setupDashboard();
      }
    }
  });


}