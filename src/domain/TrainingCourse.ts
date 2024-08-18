

class EnrollmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnrollmentError';
    }
}

class ClassFullError extends EnrollmentError {
    constructor(maxSize: number) {
        super(`Enrollment failed: The class is full with a maximum size of ${maxSize}.`);
        this.name = 'ClassFullError';
    }
}

export class ClassSize {
    constructor(
        private _min: number,
        private _max: number
    ) {
        this.validate();
    }

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    private validate(): void {
        if (this._min <= 0) {
            throw new Error("Minimum class size must be greater than 0");
        }
        if (this._max <= this._min) {
            throw new Error("Maximum class size must be greater than minimum class size");
        }
    }

    public canAccommodate(size: number): boolean {
        return size >= this._min && size <= this._max;
    }
}


export class TrainingCourse {

    constructor(public courseName: string,
        public classSize: ClassSize,
        public enrollmentList: string[] = []) { }

    // Method to check if the course is viable
    checkCourseViability(): boolean {
        return this.enrollmentList.length >= this.classSize.max;
    }

    enrollParticipant(participant: string): void {
        if (!this.canEnrollParticipant()) {
            throw new ClassFullError(this.classSize.max);
        }

        if (this.enrollmentList.includes(participant)) {
            throw new EnrollmentError(`Participant ${participant} is already enrolled.`);
        }

        this.enrollmentList.push(participant);
    }

    private canEnrollParticipant(): boolean {
        return this.enrollmentList.length < this.classSize.max;
    }
}



