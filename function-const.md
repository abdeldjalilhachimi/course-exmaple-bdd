import { MAX_CLASS_SIZE, MIN_CLASS_SIZE } from "./config";

function TrainingCourse(courseName, minClassSize, maxClassSize) {
this.courseName = courseName;
this.minClassSize = minClassSize;
this.maxClassSize = maxClassSize;
this.enrollmentList = [];
}

// Method to check if the course is viable
TrainingCourse.prototype.checkCourseViability = function () {
return this.enrollmentList.length >= this.minClassSize;
};

// Method to check if a participant can be enrolled
TrainingCourse.prototype.canEnrollParticipant = function () {
return this.enrollmentList.length < this.maxClassSize;
};

// Method to enroll a participant
TrainingCourse.prototype.enrollParticipant = function (participant) {
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
};

export const course = new TrainingCourse("BDD for Beginners", MIN_CLASS_SIZE, MAX_CLASS_SIZE);
