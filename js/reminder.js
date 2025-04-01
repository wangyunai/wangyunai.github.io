// Website Update Reminder Script
// Checks if today is the last Sunday of the month
// Only visible to admin (checks for admin cookie or local storage flag)

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin (you need to set this when you log in)
    const isAdmin = localStorage.getItem('isNexmiiAdmin') === 'true';
    
    if (isAdmin) {
        checkIfLastSundayOfMonth();
    }
});

// Function to check if today is the last Sunday of the month
function checkIfLastSundayOfMonth() {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Calculate the last Sunday
    const lastSunday = new Date(lastDayOfMonth);
    lastSunday.setDate(lastDayOfMonth.getDate() - lastDayOfMonth.getDay());
    
    // If today is the last Sunday of the month
    if (today.getDate() === lastSunday.getDate() && 
        today.getMonth() === lastSunday.getMonth() && 
        today.getFullYear() === lastSunday.getFullYear()) {
        
        showUpdateReminder();
    }
}

// Function to show reminder
function showUpdateReminder() {
    // Create reminder element
    const reminder = document.createElement('div');
    reminder.className = 'admin-reminder';
    reminder.innerHTML = `
        <div class="reminder-content">
            <h3>Reminder: Monthly Website Update</h3>
            <p>Today is the last Sunday of the month. Remember to update your website content!</p>
            <p>Suggested updates:</p>
            <ul>
                <li>Add new publications</li>
                <li>Update news items</li>
                <li>Check team information</li>
                <li>Review funding information</li>
            </ul>
            <button id="close-reminder">Got it!</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(reminder);
    
    // Add event listener for close button
    document.getElementById('close-reminder').addEventListener('click', function() {
        reminder.style.display = 'none';
    });
}

// Set admin flag (for testing - you would set this when logging in)
// Uncomment the line below to test the reminder
// localStorage.setItem('isNexmiiAdmin', 'true'); 