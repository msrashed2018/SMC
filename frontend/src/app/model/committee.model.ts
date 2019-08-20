import { CommitteeMember } from './committee-member.model';
import { Zone } from './zone.model';

export class Committee {
    public id : number;
    public description: string;
    public date: string;
    public type: string;
    public function: string;
    public zone: Zone;
    public memberOne : CommitteeMember;
    public memberTwo : CommitteeMember;
    public memberThree : CommitteeMember;
    public memberFour : CommitteeMember;
    public memberFive : CommitteeMember;
    public memberSix : CommitteeMember;
}