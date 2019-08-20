import { EyeMeasure } from './eye-measure.model';

export class EyeRevealSetting {
    public id : number;
    public rightMeasure: EyeMeasure;
    public leftMeasure: EyeMeasure
    public useGlasses: string
    public distinguishColor: string
    public squint: string
    public result: string
    public description: string
}
