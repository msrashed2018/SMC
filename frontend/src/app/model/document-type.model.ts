import { DocumentCategory } from './document-category.enum';

export class DocumentType {
    public id : number;
    public name: string;
    public category: DocumentCategory;
    public description: string;
}
