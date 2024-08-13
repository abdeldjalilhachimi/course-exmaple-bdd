import { handleEnrollment } from "./application/handleEnrollment";
import { InMemoryCourseRepository } from "./infrastructure/inMemoryCourseRepository";

// Create an instance of the in-memory course repository
const courseRepo = new InMemoryCourseRepository();

// Function to run the enrollment example
async function runEnrollmentInMemoryCourseRepository() {
    // Add a course to the repository
    const course = await courseRepo.addCourse('BDD for Beginners', 2, 3);
    console.log('Added course:', course);

    // Enroll a participant
    const result = await handleEnrollment(
        course.courseId,
        'inmemorycourserepository@example.com',
        courseRepo
    );

    // Log the result
    console.log('Enrollment result:', result);
}

// Execute the example InMemoryCourseRepository
runEnrollmentInMemoryCourseRepository().then(() => {

    console.log('Enrollment process completed.');
}).catch(error => {
    console.error('Error during enrollment process:', error);
});

// Function to run the enrollment example
async function runEnrollmentFakeCourseRepository() {
    // Add a course to the repository
    const course = await courseRepo.addCourse('BDD for Beginners', 2, 3);
    console.log('Added course:', course);

    // Enroll a participant
    const result = await handleEnrollment(
        course.courseId,
        'fakecourserepository@example.com',
        courseRepo
    );

    // Log the result
    console.log('Enrollment result:', result);
}

// Execute the example with FakeCourseRepository
runEnrollmentFakeCourseRepository().then(() => {

    console.log('Enrollment process completed.');
}).catch(error => {
    console.error('Error during enrollment process:', error);
});