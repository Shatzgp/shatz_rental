'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});
// Fetch car data from cardata.json
fetch('cardata.json')
  .then(response => {
    // Check if response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse JSON data from response
    return response.json();
  })
  .then(data => {
    // Data has been successfully fetched
    // Now you can filter the car data based on the query parameters

    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const carModel = queryParams.get('car-model');
    const monthlyPay = parseFloat(queryParams.get('monthly-pay'));
    const minYear = parseInt(queryParams.get('year'));

    // Filter cars based on query parameters
    const filteredCars = data.cars.filter(car => {
      return car.model.toLowerCase().includes(carModel.toLowerCase()) &&
             (monthlyPay === null || car.price <= monthlyPay) &&
             (!isNaN(minYear) || car.year >= minYear);
    });

    // Display the filtered car list
    displayCarList(filteredCars);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem fetching the data:', error);
  });


  