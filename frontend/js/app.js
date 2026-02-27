const API = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", function () {

    // Attach Create Event button if exists
    const createBtn = document.getElementById("createBtn");
    if (createBtn) {
        createBtn.addEventListener("click", createEvent);
    }

    // Attach Register button if exists
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", registerUser);
    }

    // Attach Load Registrations button if exists
    const loadRegBtn = document.getElementById("loadRegBtn");
    if (loadRegBtn) {
        loadRegBtn.addEventListener("click", loadRegistrations);
    }

    // Load events automatically if container exists
    if (document.querySelector(".eventsContainer")) {
        loadEvents();
    }
});


// ================= LOAD EVENTS =================
function loadEvents() {
    fetch(API + "/events")
        .then(res => res.json())
        .then(data => {
            const containers = document.querySelectorAll(".eventsContainer");

            containers.forEach(container => {
                container.innerHTML = "";

                data.forEach(e => {
                    container.innerHTML += `
                        <div class="col-md-4 mb-3">
                            <div class="card shadow-sm p-3">
                                <h5>${e.title}</h5>
                                <p>${e.description}</p>
                                <small>Date: ${e.date}</small><br>
                                <small>ID: ${e.id}</small>
                            </div>
                        </div>
                    `;
                });
            });
        })
        .catch(err => console.error("Error loading events:", err));
}


// ================= CREATE EVENT =================
function createEvent() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    if (!title || !description || !date) {
        alert("Please fill all fields");
        return;
    }

    fetch(API + "/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, date })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);

            // Clear inputs
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("date").value = "";

            loadEvents();
        })
        .catch(err => console.error("Error creating event:", err));
}


// ================= REGISTER USER =================
function registerUser() {

    const eventId = document.getElementById("eventId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!eventId || !name || !email) {
        alert("Please fill all fields");
        return;
    }

    fetch(API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, name, email })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);

            document.getElementById("eventId").value = "";
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
        })
        .catch(err => console.error("Error registering:", err));
}


// ================= LOAD REGISTRATIONS =================
function loadRegistrations() {
    fetch(API + "/registrations")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("registrations");

            if (!list) return;

            list.innerHTML = "";

            data.forEach(r => {
                list.innerHTML += `
                    <li class="list-group-item">
                        Event ID: ${r.eventId} | ${r.name} | ${r.email}
                    </li>
                `;
            });
        })
        .catch(err => console.error("Error loading registrations:", err));
}