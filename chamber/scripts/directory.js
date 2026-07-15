const jsonURL = "data/members.json";
const container = document.getElementById("directory-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

// Handle Footer Year and Modification Metadata
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch(jsonURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Failed to load members directory:", error);
        container.innerHTML = `<p class="error">Unable to load directory information at this time.</p>`;
    }
}

function displayMembers(members) {
    container.innerHTML = ""; // Clear loader container placeholder

    members.forEach(member => {
        const card = document.createElement("section");
        card.className = "member-card";

        // Map Membership level tier string representation
        let memTier = "Bronze/Member";
        if (member.membership === 3) memTier = "Gold Partner";
        if (member.membership === 2) memTier = "Silver Partner";

        card.innerHTML = `
      <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
      <h3>${member.name}</h3>
      <p class="membership-badge">${memTier}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
      <p class="member-other">${member.other}</p>
    `;
        container.appendChild(card);
    });
}

// Toggle View Event Listeners
gridBtn.addEventListener("click", () => {
    container.className = "grid-view";
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    container.className = "list-view";
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

// Execute Fetch on Page Mount
getMembers();