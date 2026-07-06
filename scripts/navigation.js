document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    menuButton.addEventListener("click", () => {
        navMenu.parentElement.classList.toggle("open");

        // Dynamically toggle looking like an 'X' close button versus 3 bars
        if (navMenu.parentElement.classList.contains("open")) {
            menuButton.innerHTML = "&times;";
        } else {
            menuButton.innerHTML = "&#9776;";
        }
    });
});