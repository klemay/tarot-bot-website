document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-based (0 = January, 11 = December)

    const yearDropdown = document.getElementById('yearDropdown');
    const monthDropdown = document.getElementById('monthDropdown');

    function populateYearDropdown() {
        for (let year = 2021; year <= currentYear; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearDropdown.appendChild(option);
        }
    }

    function populateMonthDropdown(selectedYear) {
        monthDropdown.innerHTML = '<option selected disabled>Select a month</option>';

        const monthsToShow = (selectedYear == currentYear) ? currentMonth : 11;
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        for (let month = 0; month <= monthsToShow; month++) {
            const option = document.createElement('option');
            option.value = month;
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
        populateMonthDropdown(selectedYear);
    });

    populateYearDropdown();
});