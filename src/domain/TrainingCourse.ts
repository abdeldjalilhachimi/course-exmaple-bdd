
export class TrainingCourse {
    courseName: string;
    minClassSize: number;
    maxClassSize: number;
    enrollmentList: string[];

    constructor(courseName: string, minClassSize: number, maxClassSize: number) {
        this.courseName = courseName;
        this.minClassSize = minClassSize;
        this.maxClassSize = maxClassSize;
        this.enrollmentList = [];
    }

    // Method to check if the course is viable
    checkCourseViability(): boolean {
        return this.enrollmentList.length >= this.minClassSize;
    }

    // Method to check if a participant can be enrolled
    canEnrollParticipant(): boolean {
        return this.enrollmentList.length < this.maxClassSize;
    }

    // Method to enroll a participant
    enrollParticipant(participant: string): { enrollmentSuccess: boolean } {
        if (this.canEnrollParticipant()) {
            this.enrollmentList.push(participant);
            return {
                enrollmentSuccess: true
            };
        } else {
            console.log(`Enrollment failed: The class is full with a maximum size of ${this.maxClassSize}.`);
            return {
                enrollmentSuccess: false
            };
        }
    }
}



