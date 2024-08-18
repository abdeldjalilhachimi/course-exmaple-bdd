
export interface ClassSize {
    min: number;
    max: number;
}


export interface ProposeCourseResult {
    success: boolean;
    message: string;
    courseId?: string;
}
export interface CourseProposal {
    courseName: string;
    classSize: ClassSize;
    description: string;
    instructor: string;
}

export interface Course extends CourseProposal {
    courseId: string;
    enrollmentList: string[];
}

export interface CourseRepository {
    propose(proposal: CourseProposal): Promise<Course>;
    save(course: Course): Promise<Course>;
    findById(courseId: string): Promise<Course | null>;
}