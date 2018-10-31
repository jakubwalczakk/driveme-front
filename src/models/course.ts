import { UserBasic } from "./user/userBasic";
import { CourseStatus } from "../enums/courseStatus";
import { PracticalExam } from "./exam/practicalExam";
import { TheoreticalExam } from "./exam/theoreticalExam";
import { Payment } from "./payment";
import { Reservation } from "./calendarEvents/reservation";
import { Driving } from "./calendarEvents/driving";

export class Course {
    id: number;
    startDate: Date;
    takenDrivingHours: number;
    student: UserBasic;
    practicalExam: PracticalExam;
    theoreticalExams: Array<TheoreticalExam> = [];
    payments: Array<Payment> = [];
    currentPayment: number;
    reservations: Array<Reservation> = [];
    drivings: Array<Driving> = [];
    status: CourseStatus;
}