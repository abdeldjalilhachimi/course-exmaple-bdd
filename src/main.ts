import { InMemoryCourseRepository } from "./infrastructure/inMemoryCourseRepository";
import { CourseProposal } from "./interfaces/courseRepository";

const repo = new InMemoryCourseRepository();

// Proposing a new course
const courseProposal: CourseProposal = {
    courseName: "Introduction to TypeScript",
    classSize: {
        max: 3,
        min: 2
    },
    description: 'Learn the basics of TypeScript',
    instructor: 'John Smith'
};


// Function to run the enrollment example
async function runEnrollmentInMemoryCourseRepository() {
    // Add a course to the repository
    const newCourse = await repo.propose(courseProposal);
    console.log('New Course:', newCourse);

    // Enroll a participant
    newCourse.enrollmentList.push("New Student");
    const updatedCourse = await repo.save(newCourse);
    console.log('Updated Course:', updatedCourse);


    // Finding a course
    const foundCourse = await repo.findById(newCourse.courseId);
    console.log('Found Course:', foundCourse);
}


runEnrollmentInMemoryCourseRepository().then(() => {
    console.log('Enrollment process completed.');
}).catch(error => {
    console.error('Error during enrollment process:', error);
});