import { Component } from '@angular/core';
import { employeeModel } from '../employee_model';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  constructor(private api:AdminapiService,private router:Router){}

  employee:employeeModel={}

  cancelemployee(){
    this.employee={}
  }

  

  addemployee(){
    console.log(this.employee);
    if(!this.employee.name|| !this.employee.id || !this.employee.email ||!this.employee.status){

      Swal.fire({
        icon:"warning",
        title:"Incomplete Form",
        text:"Please fill the form Completly"
      })
      this.router.navigateByUrl('emplist')

    }
  else{
     this.api.addEmployeeApi(this.employee).subscribe({
      next:(res:employeeModel)=>{
        console.log(res);
        Swal.fire({
          icon:"success",
          title:"Uploaded Successfully",
          text:`${res.name} added successfully`
        })
        this.employee={}
        
      },
      error:(err:any)=>{
        console.log(err);
        Swal.fire({
          icon:"error",
          title:"Ooops",
          text:"Something went Wrong"
        })
        
      }
     })
  }
    
    
  }

}
