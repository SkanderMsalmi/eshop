import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public error!:string;

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
       ? null : {'mismatch': true};
 }

  public form:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
    confirmPassword: ['', [Validators.required]],
    number: ['', [Validators.required,Validators.pattern(/^[0-9]{8}/)]]
  }, { validators: this.passwordMatchValidator });


  
 
  public register(){
    const { confirmPassword, ...dataWithoutConfirmPassword } = this.form.getRawValue();
    
  
    if(this.form.valid){
      this.form.setErrors(null);
      this.error="";
      this.authService.inscription(dataWithoutConfirmPassword).subscribe(()=>{
        this.router.navigateByUrl("/auth/login");
      },
      
      (err)=>{
        this.error = err?.error || 'Une erreur est survenue.'
      })
    }
    
    
  }
}
