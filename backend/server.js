const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Use environment variable (REQUIRED for Docker)
const PORT = process.env.PORT || 5000;

// File paths
const EVENTS_FILE = path.join(__dirname, 'events.json');
const REG_FILE = path.join(__dirname, 'registrations.json');


// ================= HELPER FUNCTIONS =================

// Ensure file exists
function ensureFile(file) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([]));
    }
}

// Load data
function loadData(file) {
    ensureFile(file);
    return JSON.parse(fs.readFileSync(file));
}

// Save data
function saveData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}


// ================= ROUTES =================

// Get all events
app.get('/api/events', (req, res) => {
    const events = loadData(EVENTS_FILE);
    res.json(events);
});


// Create event
app.post('/api/events', (req, res) => {

    const { title, description, date } = req.body;

    if (!title || !description || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const events = loadData(EVENTS_FILE);

    const newEvent = {
        id: events.length > 0 ? events[events.length - 1].id + 1 : 1,
        title,
        description,
        date
    };

    events.push(newEvent);
    saveData(EVENTS_FILE, events);

    res.json({ message: "Event created successfully", event: newEvent });
});


// Register user
app.post('/api/register', (req, res) => {

    const { eventId, name, email } = req.body;

    if (!eventId || !name || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const registrations = loadData(REG_FILE);

    const newRegistration = {
        id: registrations.length > 0 ? registrations.length + 1 : 1,
        eventId,
        name,
        email
    };

    registrations.push(newRegistration);
    saveData(REG_FILE, registrations);

    res.json({ message: "Registration successful", registration: newRegistration });
});


// View registrations
app.get('/api/registrations', (req, res) => {
    const registrations = loadData(REG_FILE);
    res.json(registrations);
});


// ================= START SERVER =================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});