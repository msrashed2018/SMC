import { City } from './city.model';
import { Zone } from './zone.model';

export class Governate {
    public id: number;
    public name: string;
    // public code: number;
    public cities: City[];
    public zone: Zone;
}

