import { Citizen } from './citizen.model';
import { RequestType } from './request-type.model';
import { Committee } from './committee.model';
import { RequestStatus } from './request-status.model';
import { Custom } from './custom.model';
import { RequestDocument } from './request-document.model';
import { TrafficManagement } from './traffic-management.model';
import { EyeReveal } from './eye-reveal.model';
import { BonesReveal } from './bones-reveal.model';
import { RequestPayment } from './request-payment.model';

export class Request {
    public id : number;
    public citizen: Citizen;
    public requestDate: String;
    public requestType: RequestType;
    public eyeCommittee: Committee;
    public bonesCommittee: Committee;
    public custom: Custom;
    public createdBy: string;
    public modifiedBy: string;
    public modifiedDate: string;
    public requestStatus: RequestStatus;
    public trafficManagement: TrafficManagement;
    public documents: RequestDocument[];
    public state: string;
    public eyeRevealState: string;
    public bonesRevealState: string;
    public description: string;
    public hasPrevRequest: boolean;
}
