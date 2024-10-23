document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-based (0 = January, 11 = December)

    const yearDropdown = document.getElementById('yearDropdown');
    const monthDropdown = document.getElementById('monthDropdown');
    const   
 goButton = document.getElementById('goButton');

    function populateYearDropdown() {
        for (let year = 2021; year <= currentYear; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearDropdown.appendChild(option);
        }
    }

    function   
 populateMonthDropdown(selectedYear) {
        monthDropdown.innerHTML = '<option selected disabled>Select a month</option>';

        const monthsToShow = (selectedYear == currentYear) ? currentMonth : 11;
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        for (let month = 0; month <= monthsToShow;   
 month++) {
            const option = document.createElement('option');
            option.value = monthNames[month]; // Assign the month name as the value
            option.textContent = monthNames[month];

            // Disable January and February if the year is 2021
            if (selectedYear === 2021 && month < 2) {
                option.disabled = true;
            }

            monthDropdown.appendChild(option);
        }
    }

    yearDropdown.addEventListener('change', function () {
        const selectedYear = parseInt(this.value);
        monthDropdown.disabled = false;
        goButton.classList.remove("disabled");
        goButton.classList.add("btn-primary");

        populateMonthDropdown(selectedYear);
    });

    monthDropdown.addEventListener('change', function () {
        goButton.classList.remove("disabled");
        goButton.classList.add("btn-primary");
    });

    goButton.addEventListener('click', function () {
        const selectedYear = parseInt(yearDropdown.value);
        const selectedMonthName = monthDropdown.value; // Get the selected month name

        // Determine the div ID based on the selected year and month name
        const divId = selectedMonthName + selectedYear;

        // Find the corresponding div element
        const targetDiv = document.getElementById(divId);

        // If the div exists, navigate to it; otherwise, navigate to the top of the year div
        if (targetDiv) {
            console.log(`Scrolling to div: ${divId}`); // Log the div name
            window.scrollTo(0, targetDiv.offsetTop);
        } else {
            const yearDiv = document.getElementById(`${selectedYear}`);
            if (yearDiv) {
                console.log(`Scrolling to year div: ${yearDiv.id}`); // Log the year div name
                window.scrollTo(0, yearDiv.offsetTop);
            }
        }
    });

    populateYearDropdown();
});