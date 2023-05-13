import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public user:User ;
  public error:String;
  userForm:FormGroup;
  public isEdit:Boolean = false;
  public passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
       ? null : {'mismatch': true};
 }
 validateAge(control: any) {
  const birthDate = new Date(control.value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    return { ageError: true };
  }
  return null;
}


  constructor( private router: Router,private authService:AuthService,private fb:FormBuilder) {
    this.user$.subscribe((response)=>this.user = response);
    
   }
 
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.initForm();
    });
  }
  initForm() {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      number:[this.user.number ? this.user.number : '',Validators.pattern(/^\d{8}$/)],
      gender:[this.user.gender ? this.user.gender : ''],
      dateOfBirth:[this.user.dateOfBirth ? this.user.dateOfBirth : '',[this.validateAge]],
      occupation:[this.user.occupation ? this.user.occupation : '']
    });
  }
  public cancelUpdate(){
    this.ToggleIsEdit();
    this.error="";
    this.userForm.setErrors(null);
    this.initForm();
  }
  public ToggleIsEdit(){
    
    this.isEdit = !this.isEdit;    
  }
  public editUser( ){
    const id = this.user._id;
    const userData = {id, ...this.userForm.getRawValue()};
    
  
    if(this.userForm.valid){
      this.userForm.setErrors(null);
      this.error="";
      this.authService.updateUser(userData).subscribe((response)=>{
        this.user = response;
        this.ToggleIsEdit();
        
      },
      
      (err)=>{
        this.error = err?.error || 'Une erreur est survenue.'
      })
    }
  }
}
