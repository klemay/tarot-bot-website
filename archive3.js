document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendarContainer');
    const apiEndpoint = 'https://api.tarotbot.cards/archive';
    let offset = 0;
    const loadBatchSize = 100;
    let currentYear = null;
    let currentMonth = null;
    const imageMap = new Map(); // Stores image data for each date

    // Create the year, month, and day structure for all cards initially
    function loadCards(offset, limit) {
        fetch(`${apiEndpoint}?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                if (data.response && Array.isArray(data.response.readings)) {
                    data.response.readings.forEach(cardData => {
                        const cardDate = new Date(cardData.date);
                        createDayDiv(cardDate);
                        // Store image data for lazy loading later
                        imageMap.set(cardDate.toISOString().split('T')[0], cardData);
                    });
                    offset += limit;
                    // Continue loading until all cards are created
                    if (data.response.readings.length === limit) {
                        loadCards(offset, limit);
                    }
                } else {
                    console.error('Unexpected API response format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching card data:', error);
            });
    }

    // Create a day div for a given date, organized by year and month
    function createDayDiv(cardDate) {
        const year = cardDate.getFullYear();
        const month = cardDate.toLocaleString('default', { month: 'long' });

        // Create a new year section if necessary
        if (currentYear !== year) {
            currentYear = year;
            const yearDiv = document.createElement('div');
            yearDiv.className = 'year';
            yearDiv.innerHTML = `<h2 id="${year}">${year}</h2>`;
            calendarContainer.appendChild(yearDiv);
        }

        // Create a new month section if necessary
        if (currentMonth !== month) {
            currentMonth = month;
            const monthDiv = document.createElement('div');
            monthDiv.className = 'month';
            monthDiv.innerHTML = `<h3 id="${month}${year}">${month}</h3>`;
            calendarContainer.appendChild(monthDiv);

            // Create a row container for day cards
            const rowContainer = document.createElement('div');
            rowContainer.className = 'row g-2';
            monthDiv.appendChild(rowContainer);
        }

        // Add the day card to the current row container
        const dayDiv = document.createElement('div');
        dayDiv.className = 'col-3'; // 4 items per row
        dayDiv.dataset.date = cardDate.toISOString().split('T')[0]; // Store date for later use

        const dayContainer = document.createElement('div');
        dayContainer.className = 'day';
        dayContainer.textContent = 'Loading...'; // Placeholder content

        dayDiv.appendChild(dayContainer);

        // Add the dayDiv to the latest row container
        const lastRow = calendarContainer.querySelector('.month:last-child .row:last-child');
        lastRow.appendChild(dayDiv);

        // Observe this dayDiv for lazy loading
        observer.observe(dayDiv);
    }

    // Lazy load images when a dayDiv is in the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dayDiv = entry.target;
                const date = dayDiv.dataset.date;
                const cardData = imageMap.get(date);

                if (cardData) {
                    populateDayDiv(dayDiv, cardData);
                }

                // Stop observing this element once it has been loaded
                observer.unobserve(dayDiv);
            }
        });
    }, { threshold: 0.1 });

    // Populate a day div with the actual image and link
    function populateDayDiv(dayDiv, cardData) {
        const dayContainer = dayDiv.querySelector('.day');
        dayContainer.innerHTML = ''; // Clear placeholder content

        const img = document.createElement('img');
        img.src = cardData.image;
        img.alt = `Card for ${cardData.date}`;
        img.className = 'img-fluid';

        // Format the date as "Month Day, Year" for the title attribute
        const cardDate = new Date(cardData.date);
        const formattedDate = cardDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        img.title = formattedDate;

        const link = document.createElement('a');
        link.href = cardData.more;
        link.target = '_blank';
        link.appendChild(img);

        dayContainer.appendChild(link);
    }

    // Initial load
    loadCards(offset, loadBatchSize);
});
