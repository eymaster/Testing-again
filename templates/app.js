// app.js

// Function to load shifts from localStorage
function loadShifts() {
    const storedShifts = localStorage.getItem('shifts');
    return storedShifts ? JSON.parse(storedShifts) : {};
}

// Function to save shifts to localStorage
function saveShifts(shifts) {
    localStorage.setItem('shifts', JSON.stringify(shifts));
}

// Calendar structure: Mon-Sun
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarBody = document.getElementById('calendar-body');

// Initialize shifts from localStorage
let shifts = loadShifts();

// Function to render calendar days
function renderCalendar() {
    // Clear previous calendar content
    calendarBody.innerHTML = "";

    days.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.id = day;
        dayDiv.innerHTML = `<strong>${day}</strong><br>`;

        // If shifts exist for this day, display them
        if (shifts[day]) {
            shifts[day].forEach(shift => {
                dayDiv.innerHTML += `${shift.name}: ${shift.time}<br>`;
            });
        }

        calendarBody.appendChild(dayDiv);
    });
}

// Handle shift assignment form submission
const assignShiftForm = document.getElementById('assign-shift-form');
assignShiftForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const employeeName = document.getElementById('employee-name').value;
    const shiftDay = document.getElementById('shift-day').value;
    const shiftTime = document.getElementById('shift-time').value;

    // Add the shift to the shifts object
    if (!shifts[shiftDay]) {
        shifts[shiftDay] = [];
    }

    shifts[shiftDay].push({ name: employeeName, time: shiftTime });

    // Save the updated shifts to localStorage
    saveShifts(shifts);

    // Clear the form inputs
    assignShiftForm.reset();

    // Re-render the calendar with updated shifts
    renderCalendar();
});

// Initial render of the calendar
renderCalendar();
