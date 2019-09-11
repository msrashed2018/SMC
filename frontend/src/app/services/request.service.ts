import { Injectable } from '@angular/core';
import { HttpClient , HttpEvent, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Request } from '../model/request.model';
import { API_URL } from '../app.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { text } from '@angular/core/src/render3';
import { RequestDocument } from '../model/request-document.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http:HttpClient
  ) { }
  retrieveAllRequests(page,size) {
    return this.http.get<Request[]>
      (`${API_URL}/requests?page=${page}&size=${size}`).pipe( map(
        data => {
        return data;
      }));
  }
  retrieveCitizenRequests(citizenId, page,size) {
    return this.http.get<Request[]>
      (`${API_URL}/citizens/${citizenId}/requests?page=${page}&size=${size}`).pipe( map(
        data => {
        return data;
      }));
  }
  retrieveRequestResults(requestStatusId,startDate,endDate, page,size) {
    return this.http.get<Request[]>
      (`${API_URL}/requests/retrieveRequestResults?requestStatusId=${requestStatusId}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`).pipe( map(
        data => {
        return data;
      }));
  }
  retrieveRequestsBySearchKey(searchKey, page,size) {
    return this.http.get<Request[]>
      (`${API_URL}/requests/search/findAllRequestsBySearchKey?searchKey=${searchKey}&page=${page}&size=${size}`).pipe( map(
        data => {
        return data;
      }));
  }

searchByStatesAndSearchKey(state,bonesRevealState, eyeRevealState,searchKey,page,size) {
    return this.http.get<Request[]>
      (`${API_URL}/requests/search/findByStatesAndSearchKey?state=${state}&bonesRevealState=${bonesRevealState}&eyeRevealState=${eyeRevealState}&searchKey=${searchKey}&page=${page}&size=${size}`).pipe( map(
        data => {
        return data;
      }));
  }
  retrieveByRequestStates(state,bonesRevealState, eyeRevealState,page,size) {
    return this.http.get<Request[]>
      (`${API_URL}/requests/retreiveByRequestStates?state=${state}&bonesRevealState=${bonesRevealState}&eyeRevealState=${eyeRevealState}&page=${page}&size=${size}`).pipe( map(
        data => {
        return data;
      }));
  }

  deleteRequest(citizenId, requestId){
    return this.http.delete(`${API_URL}/citizens/${citizenId}/requests/${requestId}`);
  }

  retrieveRequest(id){
    return this.http.get<Request>(`${API_URL}/requests/${id}`);
  }

  approveRequest(requestId,request){
    return this.http.put(
          `${API_URL}/requests/${requestId}/approve`
                , request);
  }
  reviewRequest(requestId,request){
    return this.http.put(
          `${API_URL}/requests/${requestId}/review`
                , request);
  }

  editRequest(requestId, request){
    return this.http.put(
          `${API_URL}/requests/${requestId}`
                , request);
  }
  continueRegisteringRequest(citizenId, requestId, request){
    return this.http.put(
          `${API_URL}/citizens/${citizenId}/requests/${requestId}`
                , request);
  }
  updateRequestStatus(citizenId, requestId, requestStatus){
    return this.http.put(
          `${API_URL}/citizens/${citizenId}/requests/${requestId}/updateStatus`
                , requestStatus);
  }

  createRequest(citizenId,request){
    return this.http.post(
              `${API_URL}/citizens/${citizenId}/requests`
                , request);
  }

  // saveRequestEyeCommitte(id,eyeReveal){
  //   return this.http.post(
  //             `${API_URL}/requests/${id}/eye-reveal`
  //               , eyeReveal);
  // }
  saveRequestPayment(id,payment){
    return this.http.post(
              `${API_URL}/requests/${id}/payment`
                , payment);
  }

  retreiveRequestPayment(id){
    return this.http.get(
              `${API_URL}/requests/${id}/payment`);
  }
  saveRequestEyeReveal(id,eyeReveal){
    return this.http.post(
              `${API_URL}/requests/${id}/eye-reveal`
                , eyeReveal);
  }
  updateRequestEyeReveal(requestId,eyeRevealId,eyeReveal){
    return this.http.put(
              `${API_URL}/requests/${requestId}/eye-reveal/${eyeRevealId}`
                , eyeReveal);
  }
  retreiveRequestEyeReveal(id){
    return this.http.get(
              `${API_URL}/requests/${id}/eye-reveal`);
  }
  saveRequestBonesReveal(id,eyeReveal){
    return this.http.post(
              `${API_URL}/requests/${id}/bones-reveal`
                , eyeReveal);
  }
  updateRequestBonesReveal(requestId,bonesRevealId,bonesReveal){
    return this.http.put(
              `${API_URL}/requests/${requestId}/bones-reveal/${bonesRevealId}`
                , bonesReveal);
  }
  retreiveRequestBonesReveal(id){
    return this.http.get(
              `${API_URL}/requests/${id}/bones-reveal`);
  }
  uploadRequestDocument(id, documentTypeId,fileList: FileList): Observable<HttpEvent<{}>> {
    
    let formdata: FormData = new FormData();
    for (var i=0; i< fileList.length; i++){
      formdata.append('file', fileList.item(i));
    }
    const req = new HttpRequest('POST', `${API_URL}/requests/${id}/documents?documentTypeId=${documentTypeId}`, formdata, {
      reportProgress: true,
      responseType: "text"
    });
 
    return this.http.request(req);
  }
 
  getRequestDocumentsByCategory(id,category) {
    return this.http.get<RequestDocument[]>(`${API_URL}/requests/${id}/documents/findByCategory?category=${category}`)
  }
//https://stackoverflow.com/questions/51682514/how-download-a-file-from-httpclient
  getRequestDocument(id, fileName:string){
    this.http.get(`${API_URL}/requests/${id}/documents/${fileName}`,{responseType: 'arraybuffer'} )
      .subscribe(response => {
        if(fileName.endsWith(".png")){
          this.downLoadFile(response, "image/png")
        }else{
          this.downLoadFile(response, "application/pdf")
        }
      });
  }

  deleteRequestDocument(id, fileName){
    return this.http.delete(`${API_URL}/requests/${id}/documents/${fileName}`);
  }

      /**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
  downLoadFile(data: any, type: string) {

    var blob = new Blob([data], { type: type});
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }


  getImage(id,fileName){
    return this.http.get(`${API_URL}/requests/${id}/documents/${fileName}`,{responseType: 'arraybuffer'} );
  }
}
