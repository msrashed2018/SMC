import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { DocumentType } from '../../model/document-type.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveDocumentTypesByCategory(category) {
    return this.http.get<DocumentType[]>(`${API_URL}/document-types/findByCategory?category=${category}`);
  }
  retrieveAllDocumentTypes(page,size) {
    return this.http.get<DocumentType[]>(`${API_URL}/document-types?page=${page}&size=${size}`);
  }

  deleteDocumentType(id){
    return this.http.delete(`${API_URL}/document-types/${id}`);
  }

  retrieveDocumentType(id){
    return this.http.get<DocumentType>(`${API_URL}/document-types/${id}`);
  }

  updateDocumentType(id, documentType){
    return this.http.put(
          `${API_URL}/document-types/${id}`
                , documentType);
  }

  createDocumentType(documentType){
    return this.http.post(
              `${API_URL}/document-types`
                , documentType);
  }
}