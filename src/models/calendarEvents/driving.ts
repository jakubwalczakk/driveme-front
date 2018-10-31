import { Car } from "../car";
import { DrivingCity } from "../drivingCity";
import { UserBasic } from "../user/userBasic";
import { DrivingRating } from "../../enums/drivingRating";

export class Driving {
    id: number;
    car: Car;
    drivingCity: DrivingCity;
    student: UserBasic;
    instructor: UserBasic;
    date: Date;
    duration: number;
    rating: DrivingRating;
}