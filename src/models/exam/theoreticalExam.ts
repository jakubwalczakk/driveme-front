import { UserBasic } from "../user/userBasic";

export class TheoreticalExam {
    id: number;
    dateOfExam: Date;
    student: UserBasic;
    scoredPoints: number;
    result: number;
    passed: boolean;
    active: boolean;
}