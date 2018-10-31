import {UserBasic} from "../user/userBasic";
import {Car} from "../car";

export class PracticalExam{
    id: number;
    dateOfExam: Date;
    student: UserBasic;
    passed: boolean;
    active: boolean;
    instructor: UserBasic;
    car:Car;
}