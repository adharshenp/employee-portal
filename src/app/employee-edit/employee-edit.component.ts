import { Component, OnInit } from '@angular/core';
import { employeeModel } from '../employee_model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
employee:employeeModel ={}
sampleEmployee:any

constructor(private route:ActivatedRoute,private api:AdminapiService,private router:Router){}
ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    const {id} =res
    this.viewEmployee(id)
  })
}

viewEmployee(id:any){
  this.api.viewEmployeeApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.employee=res
      this.sampleEmployee=res.id
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

editEmployee(id:any){
  this.api.UpdateEmoloyeeApi(id,this.employee).subscribe({
    next:(res)=>{
      console.log(res);
      Swal.fire({
        icon:"success",
        title:"Wow",
        text:"Employee Details updated Successfully"
      });
      this.router.navigateByUrl('/employees')

      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}

Cancelbutton(){
  this.viewEmployee(this.sampleEmployee)
}

}

