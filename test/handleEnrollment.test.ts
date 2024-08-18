import { InMemoryCourseRepository } from '../src/infrastructure/inMemoryCourseRepository';
import { proposeCourse } from '../src/application/proposeCourse';

const courseRepo = new InMemoryCourseRepository();

describe('Course Management', () => {
    test('should propose a course successfully', async () => {
        const courseProposal = {
            courseName: 'BDD for beginners',
            classSize: {
                min: 3,
                max: 10,
            },
            description: 'a course for beginners',
            instructor: 'Abdeldjalil',
        };

        const result = await proposeCourse(courseProposal, courseRepo);

        expect(result.success).toBe(true);
        expect(result.courseId).toBeDefined();
        expect(result.message).toContain('has been proposed successfully');

        const savedCourse = await courseRepo.findById(result.courseId!);
        expect(savedCourse).toBeDefined();
        expect(savedCourse?.courseName).toBe('BDD for beginners');
        expect(savedCourse?.classSize.min).toBe(3);
        expect(savedCourse?.classSize.max).toBe(10);
        expect(savedCourse?.description).toBe('a course for beginners');
        expect(savedCourse?.instructor).toBe('Abdeldjalil');
    });

    test('should not propose a course with invalid class size', async () => {
        const invalidCourseProposal = {
            courseName: 'Invalid Course',
            classSize: {
                min: 10,
                max: 5,
            },
            description: 'This should fail',
            instructor: 'Test Instructor',
        };

        const result = await proposeCourse(invalidCourseProposal, courseRepo);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Maximum class size must be greater than minimum class size');
    });

    test('should not propose a course without required fields', async () => {
        const incompleteCourseProposal = {
            courseName: '',  // Empty name
            classSize: {
                min: 1,
                max: 10,
            },
            description: 'This should fail',
            instructor: '',  // Empty instructor
        };

        const result = await proposeCourse(incompleteCourseProposal, courseRepo);

        expect(result.success).toBe(false);
        expect(result.message).toContain('Course name and instructor are required');
    });
});