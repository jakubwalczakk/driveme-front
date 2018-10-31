import { UserBasic } from "./user/userBasic";

export class Payment {
    id: number;
    student: UserBasic;
    date: Date;
    amount: number;
}