import { Role } from './role.model';
import { Zone } from './zone.model';

export class User {
    public id : number;
    public username: string;
    public password: string;
    public roles: Role[]
    public createdDate: string;
    public zone: Zone;
}
