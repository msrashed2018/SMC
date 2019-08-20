import { Governate } from './governate.model';
import { Occupation } from './occupation.model';
import { Gender } from './gender.model';
import { City } from './city.model';

export class Citizen {
    public id : number;
    public name: string;
    public nationalId : number;
    public birthDate : string;
    public address : string;
    public mobileNumber: string;
    public gender: string;
    public city: City;
    public governate: Governate;
    public occupation: Occupation;
    public createdDate: string;
    public modifiedDate: String;
    public modifiedBy : string;
    public createdBy : string;
}
