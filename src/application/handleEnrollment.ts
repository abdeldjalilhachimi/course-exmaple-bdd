// src/EnrollmentService.ts
import { TrainingCourse } from '../domain/TrainingCourse';
import { CourseRepository } from '../interfaces/courseRepository';

export async function handleEnrollment(
    courseId: string,
    participant: string,
    courseRepo: CourseRepository,
) {
    // Fetch course data from repository
    const courseData = await courseRepo.getCourse(courseId);

    // Check if courseData is null
    if (!courseData) {
        console.log(`Course with ID ${courseId} not found.`);
        return; // Exit early if course not found
    }

    // Initialize TrainingCourse instance with data
    const trainingCourse = new TrainingCourse(
        courseData.courseName,
        courseData.minClassSize,
        courseData.maxClassSize
    );
    trainingCourse.enrollmentList = courseData.enrollmentList;

    // Enroll participant
    const result = trainingCourse.enrollParticipant(participant);

    // Update course data in repository
    if (result.enrollmentSuccess) {
        await courseRepo.updateCourse(courseId, {
            courseId,
            courseName: trainingCourse.courseName,
            minClassSize: trainingCourse.minClassSize,
            maxClassSize: trainingCourse.maxClassSize,
            enrollmentList: trainingCourse.enrollmentList

        });
        console.log(`Participant ${participant} enrolled in course ${trainingCourse.courseName}.`);
        return { enrollmentSuccess: result.enrollmentSuccess }
    } else {
        return { enrollmentSuccess: result.enrollmentSuccess }
    }

}
