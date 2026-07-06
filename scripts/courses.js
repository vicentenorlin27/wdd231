const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

const container = document.getElementById('courses-container');
const totalCreditsDisplay = document.getElementById('total-credits');
const buttons = document.querySelectorAll('.filter-btn');

function displayCourses(filteredCourses) {
    // Clear old container details
    container.innerHTML = '';

    // Generate card block DOM structures
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    // Compute credit updates dynamically via reduce logic
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = totalCredits;
}

// Attach filtering event structural handlers
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        buttons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filterId = e.target.id;
        if (filterId === 'btn-cse') {
            displayCourses(courses.filter(c => c.subject === 'CSE'));
        } else if (filterId === 'btn-wdd') {
            displayCourses(courses.filter(c => c.subject === 'WDD'));
        } else {
            displayCourses(courses);
        }
    });
});

// Run initial payload execution loop
displayCourses(courses);