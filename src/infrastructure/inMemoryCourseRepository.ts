import { CourseRepository, Course } from '../interfaces/courseRepository';

export class InMemoryCourseRepository implements CourseRepository {
    private courses: Map<string, Course> = new Map();

    async addCourse(courseName: string, minClassSize: number, maxClassSize: number): Promise<Course> {
        const courseId = crypto.randomUUID();
        const course: Course = { courseId, courseName, minClassSize, maxClassSize, enrollmentList: [] };
        this.courses.set(courseId, course);
        return course;
    }

    async getCourse(courseId: string): Promise<Course | null> {
        return this.courses.get(courseId) || null;
    }

    async updateCourse(courseId: string, course: Course): Promise<void> {
        this.courses.set(courseId, course);
    }
}