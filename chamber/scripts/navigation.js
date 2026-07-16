document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const menuIsOpen = navMenu.classList.toggle("open");

        menuToggle.classList.toggle("active", menuIsOpen);
        menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navMenu.addEventListener("click", (event) => {
        if (event.target.matches("a") && navMenu.classList.contains("open")) {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
});