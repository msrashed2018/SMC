import { Request } from './request.model';
import { DocumentType } from './document-type.model';

export class RequestDocument {
    public id: number;
    public name: string;
    public documentType: DocumentType;
    public path: string;
}
