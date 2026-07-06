const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 3, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.getElementById("course-list");
    const creditsCountSpan = document.getElementById("credits-count");

    const btnAll = document.getElementById("btn-all");
    const btnCse = document.getElementById("btn-cse");
    const btnWdd = document.getElementById("btn-wdd");

    // Primary loop function rendering dynamic cards
    function displayCourses(filteredCourses) {
        courseContainer.innerHTML = ""; // Empty container

        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            // Dynamic check injecting conditional styles for classes completed
            courseDiv.className = `course-item ${course.completed ? 'completed' : 'pending'}`;
            courseDiv.innerHTML = `<span>${course.subject} ${course.number}</span>`;
            courseContainer.appendChild(courseDiv);
        });

        // Dynamic use of reduce() to sum credit variables based on active selection
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditsCountSpan.textContent = totalCredits;
    }

    // Set interactive visual states among active filter items
    function setActiveButton(activeBtn) {
        [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    }

    // Add Event Listeners
    btnAll.addEventListener("click", () => {
        displayCourses(courses);
        setActiveButton(btnAll);
    });

    btnCse.addEventListener("click", () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
        setActiveButton(btnCse);
    });

    btnWdd.addEventListener("click", () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
        setActiveButton(btnWdd);
    });

    // Run Initial Load configuration
    displayCourses(courses);
});