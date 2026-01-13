export async function get(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
}

export async function post(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Error sending data");
  }

  return response.json();
}

export async function update(url, id, body) {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Error updating data");
  }

  return response.json();
}

export async function remove(url, id) {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting data");
  }

  return true;
}
