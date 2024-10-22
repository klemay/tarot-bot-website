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
            let yearDiv = document.querySelector(`.year[data-year="${year}"]`);
            if (!yearDiv) {
                yearDiv = document.createElement('div');
                yearDiv.classList.add('year');
                yearDiv.setAttribute('data-year', year);
                yearDiv.innerHTML = `<h3 class="yearName">${year}</h3>`;
                calendarContainer.appendChild(yearDiv);
            }

            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const monthDiv = document.createElement('div');
            monthDiv.classList.add('month');
            monthDiv.innerHTML = `<h4 class="monthName">${monthNames[month]}</h4>`;
            yearDiv.appendChild(monthDiv);

            const daysInMonth = getDaysInMonth(year, month);

            // Create a row container for the days
            const daysRow = document.createElement('div');
            daysRow.classList.add('row');
            monthDiv.appendChild(daysRow);

            for (let day = daysInMonth; day >= 1; day--) {
                if (year === 2021 && month === 2 && day < 15) {
                    continue;
                }
                if (year === currentYear && month === currentMonth && day > currentDay) {
                    continue;
                }

                // Create a day container with col-3 to have four columns per row
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('col-6', 'col-md-3', 'day');
                dayDiv.innerHTML = `<p>${day}</p>`;
                daysRow.appendChild(dayDiv);
            }

            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
        }
    }

    generateReverseCalendar();
});
