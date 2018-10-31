import { UserRole } from '../../enums/userRole';

export class UserBasic {
    id: number;
    name: string;
    surname: string;
    email: string;
    userRole: UserRole;
}