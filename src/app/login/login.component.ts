import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string=''
  password:string=''

  

  constructor(private api:AdminapiService ,private router:Router){}

  login(){
    if(!this.email || !this.password){
      alert('please fill the form completly')
    }
    else{
      this.api.authorization().subscribe({
        next:(res:any)=>{
          const {email,password}=res
          if(email==this.email&&password==this.password){
            Swal.fire({
              icon: "success",
              text: "Login successfull!",
              color:'Blue'
            });
            localStorage.setItem('name',res.name)
            localStorage.setItem('pswd',res.password)


            this.router.navigateByUrl("dashboard")
          }
          else{
            Swal.fire({
              icon: "error",
              text: "Invalid email or password!",
              color:'red'
              
            });
            

          }

        },

        error:(res:any)=>{
          console.log(res);
          
        }
      })
    

    }
  }
}
