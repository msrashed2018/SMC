import { Disability } from './disability.model';
import { Equipment } from './equipment.model';
import { Committee } from './committee.model';

export class BonesReveal {
    public id: number;
    // public committee: Committee;
    public disability: Disability;
    // public equipment: Equipment;
    public result: string;
    public description: string;
    public revealDone: string;
}
