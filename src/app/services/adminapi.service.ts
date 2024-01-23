import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from '../employee_model';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }
 
  serverUrl = "http://localhost:3000"
  

  authorization(){
   return this.http.get(`${this.serverUrl}/employee/1`)
  }

  addEmployeeApi(employee:employeeModel){

    return  this.http.post(`${this.serverUrl}/employee`,employee)


  }

  getAllemployeeApi(){
    return this.http.get(`${this.serverUrl}/employee`)
  }

  deleteEmployeeApi(id:any){
    return this.http.delete(`${this.serverUrl}/employee/${id}`)
  }

 viewEmployeeApi(id:any){
  return this.http.get(`${this.serverUrl}/employee/${id}`)
 }

 UpdateEmoloyeeApi(id:any,employee:any){
 return this.http.put(`${this.serverUrl}/employee/${id}`,employee)
 }

UpdateAdminApi(admin:any){
 return this.http.put(`${this.serverUrl}/employee/1`,admin)
}

}




