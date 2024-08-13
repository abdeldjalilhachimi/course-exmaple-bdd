export interface CourseRepository {
    getCourse(courseId: string): Promise<Course | null>;
    updateCourse(courseId: string, courseData: Course): Promise<void>;
    addCourse(courseName: string, minClassSize: number, maxClassSize: number): Promise<Course>;
}

export type Course = {
    courseId: string;
    courseName: string;
    minClassSize: number;
    maxClassSize: number;
    enrollmentList: string[];
};

