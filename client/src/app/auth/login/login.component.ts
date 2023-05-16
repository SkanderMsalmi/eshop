import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 public form : FormGroup = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  });
  public error!: string;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
public submit(){
    if(this.form.valid){
      this.form.setErrors(null);
      this.error="";
      this.authService.connexion(this.form.getRawValue()).subscribe((res)=>{
        if(res.role == "ADMIN"){
       this.router.navigateByUrl('/admin')

        }else{
       this.router.navigateByUrl('/')

        }
        
      },
      
      (err)=>{
        this.error = err?.error || "Mauvais mot passe ou email";
      })
    } 
  }
}
