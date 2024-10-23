document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendarContainer');
    const apiBaseUrl = 'https://tarot-bot-api.vercel.app/daily';

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    async function fetchCardForDate(date) {
        try {
            const response = await fetch(`${apiBaseUrl}?date=${date}`);
            if (!response.ok) {
                console.error('Failed to fetch card for date:', date);
                return null;
            }
            const data = await response.json();
            console.log('Card data for', date, ':', data); // Debug log
            return data.response.card; // Accessing card inside response
        } catch (error) {
            console.error('Error fetching card for date:', date, error);
            return null;
        }
    }

    function formatDateForApi(day, month, year) {
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return `${monthStr}${dayStr}${year}`;
    }

    async function generateReverseCalendar() {
        let year = currentYear;
        let month = currentMonth;

        while (year > 2021 || (year === 2021 && month >= 2)) {
            let yearDiv = document.querySelector(`.year[data-year="${year}"]`);
            if (!yearDiv) {
                yearDiv = document.createElement('div');
                yearDiv.classList.add('year');
                yearDiv.setAttribute('data-year', year);
                yearDiv.innerHTML = `<h3 class="yearName" id="${year}">${year}</h3>`;
                calendarContainer.appendChild(yearDiv);
            }

            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const monthDiv = document.createElement('div');
            monthDiv.classList.add('month');
            monthDiv.innerHTML = `<h4 class="monthName" id="${monthNames[month]}${year}">${monthNames[month]} ${year}</h4>`;
            yearDiv.appendChild(monthDiv);

            const daysInMonth = getDaysInMonth(year, month);
            const daysRow = document.createElement('div');
            daysRow.classList.add('row', 'daysRow');
            monthDiv.appendChild(daysRow);

            for (let day = daysInMonth; day >= 1; day--) {
                if (year === 2021 && month === 2 && day < 15) continue;
                if (year === currentYear && month === currentMonth && day > currentDay) continue;

                const formattedDate = formatDateForApi(day, month, year);
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('col-6', 'col-md-3', 'day');
                dayDiv.innerHTML = `<p>Loading...</p>`; // Temporary content while loading

                // Fetch card data for the specific date
                const cardData = await fetchCardForDate(formattedDate);
                if (cardData && cardData.image) {
                    dayDiv.innerHTML = `<a href="${cardData.more}"><img src="${cardData.image}" alt="${cardData.description}" class="img-fluid dailyCard" /></a><br/><p class="dateName text-center">${monthNames[month]} ${day}</p>`;
                    dayDiv.setAttribute('title', `${monthNames[month]} ${day}, ${year}`);
                } else {
                    dayDiv.innerHTML = `<p>${day}</p>`; // Fallback content
                }

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
