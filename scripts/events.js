document.addEventListener("DOMContentLoaded", () => {
  console.log("[INFO] Document loaded, initializing event listeners...");
  fetch("data/events.json")
    .then((response) => response.json())
    .then((events) => {
      const eventList = document.getElementById("eventList");
      events.forEach((event, index) => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
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
        eventList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error loading events:", error);
    });
});
