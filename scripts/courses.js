const courses = [
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 121b, title: 'Introduction to Programming', credits: 3, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 330, title: 'Web Frontend Development III', credits: 3, completed: false }
];

const container = document.querySelector('#course-container');
const totalCreditsEl = document.querySelector('#total-credits');

function displayCourses(filteredCourses) {
    container.innerHTML = '';
    filteredCourses.forEach(course => {
        const div = document.createElement('div');
        div.classList.add('course-item');
        if (course.completed) div.classList.add('completed');
        div.textContent = `${course.subject} ${course.number}`;
        container.appendChild(div);
    });

    const credits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = credits;
}

document.querySelector('#btn-all').addEventListener('click', (e) => {
    setActive(e.target);
    displayCourses(courses);
});

document.querySelector('#btn-wdd').addEventListener('click', (e) => {
    setActive(e.target);
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

document.querySelector('#btn-cse').addEventListener('click', (e) => {
    setActive(e.target);
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});

function setActive(button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Initial initialization
displayCourses(courses);