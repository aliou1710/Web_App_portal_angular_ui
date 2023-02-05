import { HttpClient } from '@angular/common/http';
import { NotExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {student} from '../models/api-models/studentmodel';
import {studentRequestmodel} from '../models/api-models/update-student-request.model';
import {addStudentRequest} from '../models/api-models/add-student-request.model'
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7284';
  constructor(private httpClient : HttpClient) { }

  getStudent() : Observable<student[]>{
    return this.httpClient.get<student[]>(this.baseApiUrl+"/Student");
  }
//this.baseApiUrl+"/Student":c'est le lien vers l'api
  getStudentById(studentId: string){

    return this.httpClient.get<student>(this.baseApiUrl+"/Student/"+studentId);
  }

  updateStudent_(studentId: string,studentRequest:student) :Observable<student>{
    const updateStudentRequest : studentRequestmodel = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth : studentRequest.dateOfBirth,
      email : studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }
    //updateStudentRequest is in the body
    return this.httpClient.put<student>(this.baseApiUrl+"/Student/"+studentId,updateStudentRequest);

  }




  addStudent_(studentRequest : student):Observable<student>{
    const addStudentRequest : addStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth : studentRequest.dateOfBirth,
      email : studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }
    return this.httpClient.post<student>(this.baseApiUrl+'/Student/Add',addStudentRequest);

  }

}
