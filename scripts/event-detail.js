document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const eventId = parseInt(params.get("id"));

  fetch("data/events.json")
    .then((res) => res.json())
    .then((events) => {
      const event = events[eventId];
      if (!event) return;

      document.getElementById("eventTitle").textContent = event.name;
      document.getElementById("eventDate").textContent = new Date(
        event.date
      ).toDateString();
      document.getElementById("eventDescription").textContent =
        event.description;
      document.getElementById("eventLocation").textContent =
        event.location || "Community Center, Main Street";

      const gallery = document.getElementById("eventGallery");
      if (event.photos && event.photos.length) {
        event.photos.forEach((photo) => {
          const col = document.createElement("div");
          col.className = "col-6 col-md-4";
          col.innerHTML = `<img src="${photo}" class="img-fluid rounded shadow-sm" alt="Event Photo">`;
          gallery.appendChild(col);
        });
      }
    })
    .catch((err) => console.error("Error loading event:", err));
});
