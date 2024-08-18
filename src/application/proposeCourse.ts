import { CourseProposal, CourseRepository, ProposeCourseResult } from '../interfaces/courseRepository';
import { ClassSize } from '../domain/TrainingCourse';

export async function proposeCourse(
    proposal: CourseProposal,
    courseRepo: CourseRepository
): Promise<ProposeCourseResult> {
    try {
        // Validate proposal
        if (!proposal.courseName || !proposal.instructor) {
            return {
                success: false,
                message: "Course name and instructor are required."
            };
        }

        let classSize: ClassSize;
        try {
            classSize = new ClassSize(proposal.classSize.min, proposal.classSize.max);
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Invalid class size"
            };
        }

        // Create a validated proposal
        const validatedProposal: CourseProposal = {
            courseName: proposal.courseName,
            classSize: classSize,
            description: proposal.description,
            instructor: proposal.instructor
        };

        // Use the repository's propose method
        const newCourse = await courseRepo.propose(validatedProposal);

        return {
            success: true,
            message: `Course "${newCourse.courseName}" has been proposed successfully.`,
            courseId: newCourse.courseId
        };

    } catch (error) {
        return {
            success: false,
            message: `Failed to propose course: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}