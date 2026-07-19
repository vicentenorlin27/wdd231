const membersURL = "data/members.json";

const weatherApiKey =
    "YOUR_OPENWEATHERMAP_API_KEY";

const latitude = 37.5407;
const longitude = -77.4360;

const currentWeather =
    document.querySelector("#current-weather");

const forecastContainer =
    document.querySelector("#forecast");

const spotlightsContainer =
    document.querySelector("#spotlights");

function membershipName(level) {
    if (level === 3) {
        return "Gold Member";
    }

    return "Silver Member";
}

function shuffle(items) {
    const shuffled = [...items];

    for (
        let index = shuffled.length - 1;
        index > 0;
        index -= 1
    ) {
        const randomIndex = Math.floor(
            Math.random() * (index + 1)
        );

        [
            shuffled[index],
            shuffled[randomIndex]
        ] = [
                shuffled[randomIndex],
                shuffled[index]
            ];
    }

    return shuffled;
}

function displaySpotlights(members) {
    const eligibleMembers = members.filter(
        (member) => {
            return (
                member.membership === 2 ||
                member.membership === 3
            );
        }
    );

    const selectedMembers =
        shuffle(eligibleMembers).slice(0, 3);

    spotlightsContainer.innerHTML = "";

    selectedMembers.forEach((member) => {
        const card =
            document.createElement("article");

        card.className = "spotlight-card";

        const image =
            document.createElement("img");

        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.width = 160;
        image.height = 120;
        image.loading = "lazy";

        const details =
            document.createElement("div");

        const name =
            document.createElement("h3");

        name.textContent = member.name;

        const level =
            document.createElement("p");

        level.className = "membership-badge";

        level.textContent =
            membershipName(member.membership);

        const address =
            document.createElement("p");

        address.textContent = member.address;

        const phone =
            document.createElement("p");

        const phoneLink =
            document.createElement("a");

        phoneLink.href =
            `tel:${member.phone.replace(/[^\d+]/g, "")}`;

        phoneLink.textContent = member.phone;

        phone.appendChild(phoneLink);

        const website =
            document.createElement("p");

        const websiteLink =
            document.createElement("a");

        websiteLink.href = member.website;
        websiteLink.target = "_blank";
        websiteLink.rel = "noopener noreferrer";
        websiteLink.textContent = "Visit Website";

        website.appendChild(websiteLink);

        details.append(
            name,
            level,
            address,
            phone,
            website
        );

        card.append(image, details);

        spotlightsContainer.appendChild(card);
    });
}

async function getSpotlights() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(
                `Member request failed: ${response.status}`
            );
        }

        const members = await response.json();

        displaySpotlights(members);
    } catch (error) {
        console.error("Spotlight error:", error);

        spotlightsContainer.innerHTML = `
            <p class="error-message">
                Member spotlights are unavailable right now.
            </p>
        `;
    }
}

function displayCurrentWeather(data) {
    const temperature =
        Math.round(data.main.temp);

    const description =
        data.weather[0].description;

    const icon =
        data.weather[0].icon;

    currentWeather.innerHTML = `
        <div class="current-weather-layout">

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt=""
                width="80"
                height="80">

            <div>

                <p class="current-temperature">
                    ${temperature}&deg;F
                </p>

                <p class="weather-description">
                    ${description}
                </p>

            </div>

        </div>
    `;
}

function displayForecast(data) {
    const dailyForecasts = data.list
        .filter((item) => {
            return item.dt_txt.includes("12:00:00");
        })
        .slice(0, 3);

    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "short"
            }
        );

    forecastContainer.innerHTML =
        dailyForecasts
            .map((day) => {
                const dayName =
                    formatter.format(
                        new Date(day.dt * 1000)
                    );

                const temperature =
                    Math.round(day.main.temp);

                return `
                    <div class="forecast-day">

                        <strong>
                            ${dayName}
                        </strong>

                        <span>
                            ${temperature}&deg;F
                        </span>

                    </div>
                `;
            })
            .join("");
}

async function getWeather() {
    if (
        weatherApiKey ===
        "YOUR_OPENWEATHERMAP_API_KEY"
    ) {
        currentWeather.innerHTML = `
            <p class="weather-notice">
                Add your OpenWeatherMap API key
                in home.js to display live weather.
            </p>
        `;

        forecastContainer.innerHTML = "";

        return;
    }

    const currentURL =
        `https://api.openweathermap.org/data/2.5/weather` +
        `?lat=${latitude}` +
        `&lon=${longitude}` +
        `&units=imperial` +
        `&appid=${weatherApiKey}`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast` +
        `?lat=${latitude}` +
        `&lon=${longitude}` +
        `&units=imperial` +
        `&appid=${weatherApiKey}`;

    try {
        const [
            currentResponse,
            forecastResponse
        ] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (
            !currentResponse.ok ||
            !forecastResponse.ok
        ) {
            throw new Error(
                "The weather request failed."
            );
        }

        const currentData =
            await currentResponse.json();

        const forecastData =
            await forecastResponse.json();

        displayCurrentWeather(currentData);

        displayForecast(forecastData);
    } catch (error) {
        console.error("Weather error:", error);

        currentWeather.innerHTML = `
            <p class="error-message">
                Weather data is unavailable right now.
            </p>
        `;

        forecastContainer.innerHTML = "";
    }
}

const currentYear =
    document.querySelector("#current-year");

const lastModified =
    document.querySelector("#last-modified");

currentYear.textContent =
    new Date().getFullYear();

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;

getSpotlights();
getWeather();