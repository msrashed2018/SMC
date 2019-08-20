import { Equipment } from './equipment.model';

export class Disability {
    public id: number;
    public name: string;
    public description: string;
    public equipment: Equipment;
    public accepted: string;
}
