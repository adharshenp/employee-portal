import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeeModel } from '../employee_model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  allemployee:employeeModel[]=[]
  searchKey:string=""
  p: number =1

constructor(private api:AdminapiService){}


ngOnInit(): void {

  this.allEmplopyee()
}

allEmplopyee(){
  this.api.getAllemployeeApi().subscribe({
    next:(res:any)=>{
      this.allemployee=res
      console.log(this.allemployee);
      
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}

removeEmployee(id:any){
this.api.deleteEmployeeApi(id).subscribe({
  next:(res:any)=>{
    console.log(res);
    this.allEmplopyee()
    
  },
  error:(err:any)=>{
    console.log(err);
    
  }
  
})
}

sortId(){
 this.allemployee.sort((a:any,b:any)=>a.id-b.id)
}
sortbyName(){
  this.allemployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
}

generatePdf(){
  //crerate an object for jsPDF
  const Pdf = new jsPDF()
  let  head =[['Id','Employee name','Email','Status']]
  let body:any =[]
  this.allemployee.filter((item)=>item.id!=='1').forEach((item:any)=>{
    body.push([item.id,item.name,item.email,item.status])
  })
  
  //font size
  Pdf.setFontSize(16)
  //title
  Pdf.text('Employee details',10,10)

  //table
  autoTable(Pdf,{head,body})

  //to open in new tab
  Pdf.output('dataurlnewwindow')

  

  Pdf.save('employee.pdf')

}


}
