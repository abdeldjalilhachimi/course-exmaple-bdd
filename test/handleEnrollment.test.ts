import { InMemoryCourseRepository } from '../src/infrastructure/inMemoryCourseRepository';
import { handleEnrollment } from '../src/application/handleEnrollment';

const courseRepo = new InMemoryCourseRepository();

test('should enroll participant successfully', async () => {
    // Setup initial course
    const course = await courseRepo.addCourse('BDD for Beginners', 2, 3);

    // Handle enrollment
    await handleEnrollment(course.courseId, 'Alice', courseRepo);

    // Verify the enrollment
    const updatedCourse = await courseRepo.getCourse(course.courseId);
    expect(updatedCourse?.enrollmentList).toContain('Alice');
});

test('should not enroll participant when course is full', async () => {
    // Setup initial course
    const course = await courseRepo.addCourse('BDD for Beginners', 2, 3);

    // Enroll participants
    await handleEnrollment(course.courseId, 'Alice', courseRepo);
    await handleEnrollment(course.courseId, 'Bob', courseRepo);
    await handleEnrollment(course.courseId, 'Cherif', courseRepo);
    const result = await handleEnrollment(course.courseId, 'Charlie', courseRepo);

    expect(result?.enrollmentSuccess).toBe(false);
});
