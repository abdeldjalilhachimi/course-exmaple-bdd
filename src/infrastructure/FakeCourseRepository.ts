
import { Course, CourseRepository } from '../interfaces/courseRepository';


export class FakeCourseRepository implements CourseRepository {
    private courses: Map<string, Course> = new Map();

    async getCourse(courseId: string): Promise<Course | null> {
        return this.courses.get(courseId) || null;
    }

    async updateCourse(courseId: string, courseData: Course): Promise<void> {
        this.courses.set(courseId, courseData);
    }

    async addCourse(courseName: string, minClassSize: number, maxClassSize: number): Promise<Course> {
        const courseId = crypto.randomUUID();
        const newCourse: Course = {
            courseId,
            courseName,
            minClassSize,
            maxClassSize,
            enrollmentList: []
        };
        this.courses.set(courseId, newCourse);
        return newCourse;
    }
}
