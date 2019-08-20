import { EyeMeasure } from './eye-measure.model';
import { Committee } from './committee.model';

export class EyeReveal {
    public id: number;
    // public committee: Committee;
    public rightEye: EyeMeasure;
    public leftEye: EyeMeasure;
    public useGlasses: string;
    public distinguishColor: string;
    public fieldOfSight: string;
    public squint: string;
    public result: string;
    public description: string;
    public revealDone: string;
}
