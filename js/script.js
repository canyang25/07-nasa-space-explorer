// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');


// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Get the button and gallery elements
const getImagesButton = document.querySelector('.filters button');
const gallery = document.getElementById('gallery');

// Fun Space Facts
const spaceFacts = [
  "Did you know? A day on Venus is longer than a year on Venus!",
  "Did you know? Neutron stars can spin at a rate of 600 rotations per second!",
  "Did you know? There are more trees on Earth than stars in the Milky Way.",
  "Did you know? The footprints on the Moon will be there for millions of years.",
  "Did you know? Jupiter is so big that all the other planets in the solar system could fit inside it.",
  "Did you know? One million Earths could fit inside the Sun.",
  "Did you know? Space is completely silent—there is no air to carry sound.",
  "Did you know? The hottest planet in our solar system is Venus.",
  "Did you know? The International Space Station travels at 28,000 km/h (17,500 mph).",
  "Did you know? A spoonful of a neutron star weighs about a billion tons!"
];

// Pick a random fact
const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

// Create and display the fact section above the gallery
const factSection = document.createElement('div');
factSection.className = 'space-fact';
factSection.textContent = randomFact;
const filtersDiv = document.querySelector('.filters');
filtersDiv.insertAdjacentElement('afterend', factSection);

// When the button is clicked, fetch images from NASA
getImagesButton.addEventListener('click', function () {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate) {
    alert('Please pick a start and end date.');
    return;
  }

  // Beginner tip: NASA's API only returns up to 100 results at once!
  // Let's check if the date range is 100 days or less.
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end
  if (diffDays > 100) {
    alert('Please select a date range of 100 days or less. NASA only allows up to 100 results at a time.');
    return;
  }

  const url = `/api/nasa-images?start_date=${startDate}&end_date=${endDate}`;

  // Use async/await to fetch data from NASA API
  async function fetchImages() {
    try {
      // Fetch data from the API
      const response = await fetch(url);
      // Convert the response to JSON
      const data = await response.json();

      // Clear the gallery before adding new images
      gallery.innerHTML = '';

      // Loop through each item in the data
      data.forEach(item => {
        // Only show images (not videos)
        if (item.media_type === 'image') {
          // Create a container for each image and its info
          const box = document.createElement('div');
          box.className = 'apod-item gallery-item';

          // Create the image element
          const img = document.createElement('img');
          img.src = item.url;
          img.alt = item.title;
          img.className = 'apod-image';

          // Create the title element
          const title = document.createElement('h3');
          title.textContent = item.title;

          // Create the date element
          const date = document.createElement('p');
          date.textContent = `Date: ${item.date}`;

          // Add all elements to the box (no explanation here)
          box.appendChild(img);
          box.appendChild(title);
          box.appendChild(date);

          // Add click event to open modal with this image's info
          box.addEventListener('click', function() {
            // Fill modal content (no enlargement)
            document.getElementById('modalImage').src = item.url;
            document.getElementById('modalImage').alt = item.title;
            document.getElementById('modalTitle').textContent = item.title;
            document.getElementById('modalDate').textContent = `Date: ${item.date}`;
            document.getElementById('modalExplanation').textContent = item.explanation;
            document.getElementById('modal').style.display = 'flex'; // Show the modal
          });

          // Add the box to the gallery
          gallery.appendChild(box);
        }
      });
    } catch (error) {
      // Show an error message if something goes wrong
      gallery.innerHTML = '<p>Could not load images. Please try again.</p>';
      console.error(error);
    }
  }

  // Call the async function to fetch images
  fetchImages();
}); // Close the event listener function

// BEGINNER TIP: Let users press Enter to load images too!
// This function triggers the same action as clicking the button
function handleEnterKey(event) {
  // Check if the key pressed is Enter (key code 13 or 'Enter')
  if (event.key === 'Enter') {
    getImagesButton.click(); // Simulate a button click
  }
}
// Listen for Enter key on both date inputs
startInput.addEventListener('keydown', handleEnterKey);
endInput.addEventListener('keydown', handleEnterKey);

// Modal close logic for HTML modal
const closeModalBtn = document.getElementById('closeModal');
const modalDiv = document.getElementById('modal');
closeModalBtn.addEventListener('click', function() {
  modalDiv.style.display = 'none';
  // No need to remove 'active' class anymore
});
window.addEventListener('click', function(event) {
  if (event.target === modalDiv) {
    modalDiv.style.display = 'none';
    // No need to remove 'active' class anymore
  }
});