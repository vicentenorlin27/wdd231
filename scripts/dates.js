document.addEventListener("DOMContentLoaded", () => {
    // Dynamically display the current year
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Capture precise file system manipulation stamp
    const lastModifiedParagraph = document.getElementById("last-modified");
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    }
});