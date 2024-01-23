import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api:AdminapiService){
     this.chartOptions={
      
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Football voting Charts'
  },
  tooltip: {
      valueSuffix: '%'
  },
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  credits:{
    enabled:false
  },
  series: [
      {
          name: 'Percentage',
          colorByPoint: true,
          data: [
              {
                  name: 'Cristiano',
                  y: 55.02
              },
              {
                  name: 'Messi',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'Neymar',
                  y: 1.09
              },
              {
                  name: 'Mbappe',
                  y: 15.5
              },
              {
                  name: 'Bellingam',
                  y: 1.68
              }
          ]
      }
  ]

     }
     HC_exporting(Highcharts);
  }

  ngOnInit(): void {
    this.employeeCount()
    if(localStorage.getItem('name')){
      this.adminName =localStorage.getItem('name')
    }

    //fetch all admin details

    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.profileImage=res.picture
      }
      
    })
  }
  showSidebar:boolean=true
  empcount:number=0
  selected: Date | null =new Date()
  Highcharts: typeof Highcharts = Highcharts;
  EditAdminStatus:boolean=false
  adminName:any =""
  adminDetails:any={}
  profileImage:string='https://i.pinimg.com/originals/5c/37/14/5c3714cba608140b1d6c15ce3f699068.gif'
  chartOptions = {};

  menuBar(){
    this.showSidebar=!this.showSidebar
  }

  employeeCount(){
    this.api.getAllemployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.empcount=res.length
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  editEmployee(){
    this.EditAdminStatus=true
  }

  getFile(event:any){
     let FileDetails= event.target.files[0]
     console.log(FileDetails);
     
     //file reader--- creating url to image

     //create an object for fileReader()class
     let fr = new FileReader()

     fr.readAsDataURL(FileDetails)
     //convert
     fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profileImage=event.target.result

      this.adminDetails.picture=this.profileImage 
      
     }
  }

  UpdateAdmin(){
    this.api.UpdateAdminApi(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          text: "Updated Successfully",
          color:'blue'
          
        });

        localStorage.setItem("name",res.name)
        localStorage.setItem("pswd",res.password)
        this.adminName=localStorage.getItem("name")
      },
      error:(err:any)=>{
        console.log(err);

        Swal.fire({
          icon: "error",
          text: "An error occured",
          color:'red'
        });
        
      }
    })
  }
}
