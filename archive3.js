document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendarContainer');
    const apiEndpoint = 'https://api.tarotbot.cards/archive';
    let offset = 0;
    const loadBatchSize = 100;
    let currentYear = null;
    let currentMonth = null;
    const imageMap = new Map();
    let isLoading = false; // Flag to prevent multiple API calls

    function loadCards(offset, limit) {
        if (isLoading) return; // If a call is already in progress, do nothing
        isLoading = true; // Set the flag to indicate a call is in progress

        fetch(`${apiEndpoint}?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                if (data.response && Array.isArray(data.response.readings)) {
                    data.response.readings.forEach(cardData => {
                        const cardDate = new Date(cardData.date);
                        createDayDiv(cardDate);
                        imageMap.set(cardDate.toISOString().split('T')[0], cardData);
                    });

                    offset += limit; // Update the offset for the next batch

                    // Set up a trigger to load more when reaching the last div
                    if (data.response.readings.length === limit) {
                        setupScrollListener();
                    }
                } else {
                    console.error('Unexpected API response format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching card data:', error);
            })
            .finally(() => {
                isLoading = false; // Reset the flag once the call is complete
            });
    }

    function createDayDiv(cardDate) {
        const year = cardDate.getFullYear();
        const month = cardDate.toLocaleString('default', { month: 'long' });

        if (currentYear !== year) {
            currentYear = year;
            const yearDiv = document.createElement('div');
            yearDiv.className = 'year';
            yearDiv.innerHTML = `<h2 id="${year}">${year}</h2>`;
            calendarContainer.appendChild(yearDiv);
        }

        if (currentMonth !== month) {
            currentMonth = month;
            const monthDiv = document.createElement('div');
            monthDiv.className = 'month';
            monthDiv.innerHTML = `<h3 id="${month}${year}">${month}</h3>`;
            calendarContainer.appendChild(monthDiv);

            const rowContainer = document.createElement('div');
            rowContainer.className = 'row g-2';
            monthDiv.appendChild(rowContainer);
        }

        const dayDiv = document.createElement('div');
        dayDiv.className = 'col-3';
        dayDiv.dataset.date = cardDate.toISOString().split('T')[0];

        const dayContainer = document.createElement('div');
        dayContainer.className = 'day';
        dayContainer.textContent = 'Loading...';

        dayDiv.appendChild(dayContainer);
        const lastRow = calendarContainer.querySelector('.month:last-child .row:last-child');
        lastRow.appendChild(dayDiv);

        observer.observe(dayDiv);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dayDiv = entry.target;
                const date = dayDiv.dataset.date;
                const cardData = imageMap.get(date);

                if (cardData) {
                    populateDayDiv(dayDiv, cardData);
                }
                observer.unobserve(dayDiv);
            }
        });
    }, { threshold: 0.1 });

    function populateDayDiv(dayDiv, cardData) {
        const dayContainer = dayDiv.querySelector('.day');
        dayContainer.innerHTML = '';

        const img = document.createElement('img');
        img.src = cardData.image;
        img.alt = `Card for ${cardData.date}`;
        img.className = 'img-fluid';

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

    function setupScrollListener() {
        const lastDiv = calendarContainer.querySelector('.col-3:last-child');
        if (lastDiv) {
            const lastDivObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    lastDivObserver.unobserve(lastDiv);
                    loadCards(offset, loadBatchSize);
                }
            });
            lastDivObserver.observe(lastDiv);
        }
    }

    // Initial load
    loadCards(offset, loadBatchSize);
});
