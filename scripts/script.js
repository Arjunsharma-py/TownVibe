document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks for reaching out! We’ll get back to you soon.");
  });

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/events.json")
    .then((response) => response.json())
    .then((events) => {
      const featuredContainer = document.getElementById("featuredEvents");

      // Show only 3 events on homepage
      if (featuredContainer) {
        events.slice(0, 3).forEach((event, index) => {
          featuredContainer.appendChild(createEventCard(event, index));
        });
      }
    })
    .catch((error) => console.error("Error loading events:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/events.json")
    .then((response) => response.json())
    .then((events) => {
      const highlightsContainer = document.getElementById("eventHighlights");

      // Show event highlights from past events
      if (highlightsContainer) {
        const today = new Date();
        events
          .filter(
            (event) =>
              new Date(event.date) < today && Array.isArray(event.photos)
          )
          .flatMap((event) => event.photos)
          .slice(0, 8) // Limit to 8 photos
          .forEach((photoUrl) => {
            const col = document.createElement("div");
            col.className = "col-6 col-md-3";
            col.innerHTML = `<img src="${photoUrl}" class="img-fluid rounded shadow-sm" alt="Event Highlight">`;
            highlightsContainer.appendChild(col);
          });
      }
    })
    .catch((error) => console.error("Error loading events:", error));
});

function createEventCard(event, index) {
  const col = document.createElement("div");
  col.className = "col-md-4";
  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${event.image}" class="card-img-top" alt="${event.name}">
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p class="text-muted"><i class="fa-solid fa-calendar-days me-2"></i>${new Date(
          event.date
        ).toDateString()}</p>
        <a href="event-detail.html?id=${index}" class="btn btn-outline-primary btn-sm">Learn More</a>
      </div>
    </div>
  `;
  return col;
}
