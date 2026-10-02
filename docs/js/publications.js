document.addEventListener("DOMContentLoaded", function () {

  // Wait until Quarto has finished rendering the listing
  setTimeout(function () {

    // Find the publication listing
    const listing = document.querySelector(".quarto-listing");

    if (!listing) {
      console.log("Publication listing not found.");
      return;
    }

    // Find all publication cards
    const cards = Array.from(
      listing.querySelectorAll(".quarto-grid-item")
    );

    if (cards.length === 0) {
      console.log("No publication cards found.");
      return;
    }

    // Store cards grouped by year
    const groups = {};

    cards.forEach(function (card) {

      // Find the date displayed in the card
      const dateElement = card.querySelector(
        ".listing-date, .listing-date-modified"
      );

      if (!dateElement) {
        return;
      }

      // Extract the year from the date
      const dateText = dateElement.textContent.trim();
      const yearMatch = dateText.match(/\b(19|20)\d{2}\b/);

      if (!yearMatch) {
        return;
      }

      const year = yearMatch[0];

      if (!groups[year]) {
        groups[year] = [];
      }

      groups[year].push(card);
    });

    // If no years were found, stop
    if (Object.keys(groups).length === 0) {
      console.log("No publication years found.");
      return;
    }

    // Create a container for the new grouped layout
    const groupedContainer = document.createElement("div");
    groupedContainer.className = "publications-by-year";

    // Sort years from newest to oldest
    const years = Object.keys(groups).sort(function (a, b) {
      return Number(b) - Number(a);
    });

    years.forEach(function (year) {

      // Create year heading
      const yearHeading = document.createElement("h2");
      yearHeading.className = "publication-year";
      yearHeading.textContent = year;

      // Create grid for this year
      const yearGrid = document.createElement("div");
      yearGrid.className = "quarto-listing-container-grid";

      // Add cards belonging to this year
      groups[year].forEach(function (card) {
        yearGrid.appendChild(card);
      });

      // Add year and grid to the page
      groupedContainer.appendChild(yearHeading);
      groupedContainer.appendChild(yearGrid);
    });

    // Replace the original listing with the grouped version
    listing.innerHTML = "";
    listing.appendChild(groupedContainer);

  }, 500);

});