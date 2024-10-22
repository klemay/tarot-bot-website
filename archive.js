document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendarContainer');

    // Get the current date
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-based (0 = January, 11 = December)
    const currentDay = new Date().getDate();

    // Function to get the number of days in a given month and year
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate(); // Month + 1 to get the last day of the current month
    }

    // Function to generate the calendar from the current month back to March 2021 in reverse chronological order
    function generateReverseCalendar() {
        let year = currentYear;
        let month = currentMonth;

        // Loop until we reach March 2021
        while (year > 2021 || (year === 2021 && month >= 2)) {
            // Create a year container if the first month of the year is reached
            let yearDiv = document.querySelector(`.year[data-year="${year}"]`);
            if (!yearDiv) {
                yearDiv = document.createElement('div');
                yearDiv.classList.add('year');
                yearDiv.setAttribute('data-year', year);
                yearDiv.innerHTML = `<h3>${year}</h3>`;
                calendarContainer.appendChild(yearDiv);
            }

            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            // Create a month container
            const monthDiv = document.createElement('div');
            monthDiv.classList.add('month');
            monthDiv.innerHTML = `<h4>${monthNames[month]}</h4>`;
            yearDiv.appendChild(monthDiv);

            // Get the number of days in the current month
            const daysInMonth = getDaysInMonth(year, month);

            // Loop through the days of the month
            for (let day = daysInMonth; day >= 1; day--) {
                    // If it's March 2021 and before March 15, skip the day
    if (year === 2021 && month === 2 && day < 15) {
        continue;
    }
                // If it's the current month and year, only show up to the current day
                if (year === currentYear && month === currentMonth && day > currentDay) {
                    continue;
                }

                // Create a day container
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('day');
                dayDiv.innerHTML = `<p>${day}</p>`;
                monthDiv.appendChild(dayDiv);
            }

            // Move to the previous month
            month--;
            if (month < 0) {
                month = 11; // December
                year--;     // Move to the previous year
            }
        }
    }

    // Generate the reverse calendar on page load
    generateReverseCalendar();
});
