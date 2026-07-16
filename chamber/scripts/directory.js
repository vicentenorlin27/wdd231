const membersURL = "data/members.json";

const directoryContainer = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

function getMembershipName(level) {
    switch (level) {
        case 3:
            return "Gold Member";
        case 2:
            return "Silver Member";
        default:
            return "Member";
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} business logo`;
        image.width = 160;
        image.height = 120;
        image.loading = "lazy";

        const name = document.createElement("h2");
        name.textContent = member.name;

        const membership = document.createElement("p");
        membership.classList.add("membership-badge");
        membership.textContent = getMembershipName(member.membership);

        const description = document.createElement("p");
        description.classList.add("member-description");
        description.textContent = member.description;

        const address = document.createElement("p");
        address.classList.add("member-address");
        address.textContent = member.address;

        const phone = document.createElement("p");

        const phoneLink = document.createElement("a");
        phoneLink.href = `tel:${member.phone.replace(/[^\d+]/g, "")}`;
        phoneLink.textContent = member.phone;
        phone.appendChild(phoneLink);

        const website = document.createElement("p");

        const websiteLink = document.createElement("a");
        websiteLink.href = member.website;
        websiteLink.target = "_blank";
        websiteLink.rel = "noopener noreferrer";
        websiteLink.textContent = "Visit Website";
        website.appendChild(websiteLink);

        card.append(
            image,
            name,
            membership,
            description,
            address,
            phone,
            website
        );

        directoryContainer.appendChild(card);
    });
}

async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(
                `Unable to load member data. HTTP status: ${response.status}`
            );
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Directory error:", error);

        directoryContainer.innerHTML = `
            <p class="error-message">
                The business directory could not be loaded. Please try again later.
            </p>
        `;
    }
}

function showGridView() {
    directoryContainer.classList.add("grid-view");
    directoryContainer.classList.remove("list-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
}

function showListView() {
    directoryContainer.classList.add("list-view");
    directoryContainer.classList.remove("grid-view");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
}

gridButton.addEventListener("click", showGridView);
listButton.addEventListener("click", showListView);

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

getMembers();