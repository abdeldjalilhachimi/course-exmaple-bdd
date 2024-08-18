import { Course, CourseProposal, CourseRepository } from '../interfaces/courseRepository';
import crypto from 'crypto';

export class InMemoryCourseRepository implements CourseRepository {
    private courses: Map<string, Course> = new Map();

    async propose(proposal: CourseProposal): Promise<Course> {
        const newCourse: Course = {
            ...proposal,
            courseId: crypto.randomUUID(),
            enrollmentList: []
        };
        this.courses.set(newCourse.courseId, newCourse);
        return newCourse;
    }

    async save(course: Course): Promise<Course> {
        this.courses.set(course.courseId, { ...course });
        return course;
    }

    async findById(courseId: string): Promise<Course | null> {
        return this.courses.get(courseId) || null;
    }
}