const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of computer programming...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to markup languages...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more proficient with programming as they write, run, and test...',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with HTML and CSS to focus on JavaScript...',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the concepts of object-oriented programming using classes...',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility, compliance, and API usage...',
        completed: false
    }
];

const courseContainer = document.getElementById("course-container");
const creditsValue = document.getElementById("credits-value");

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = "";

    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `${course.subject} ${course.number}`;
        courseContainer.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsValue.textContent = totalCredits;
}

const btnAll = document.getElementById("filter-all");
const btnCse = document.getElementById("filter-cse");
const btnWdd = document.getElementById("filter-wdd");

function clearActiveStatus() {
    [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove("active"));
}

btnAll.addEventListener("click", () => {
    clearActiveStatus();
    btnAll.classList.add("active");
    displayCourses(courses);
});

btnCse.addEventListener("click", () => {
    clearActiveStatus();
    btnCse.classList.add("active");
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});

btnWdd.addEventListener("click", () => {
    clearActiveStatus();
    btnWdd.classList.add("active");
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

displayCourses(courses);