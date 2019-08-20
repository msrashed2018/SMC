import { Governate } from './governate.model';

export class Zone {
    public id : number;
    public name: string;
    public description: string;
    public governates: Governate[];
}
