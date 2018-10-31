import { Car } from "../car";
import { DrivingCity } from "../drivingCity";
import { UserBasic } from "../user/userBasic";

export class Reservation {
    id: number;
    car: Car;
    drivingCity: DrivingCity;
    student: UserBasic;
    instructor: UserBasic;
    date: Date;
    duration: number;
    status:boolean;
}