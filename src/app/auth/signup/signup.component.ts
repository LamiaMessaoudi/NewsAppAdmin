import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Admin } from '../../Models/Admin';
import { AuthService } from '../../services/auth.service';
import { first } from '../../../../node_modules/rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  valid = false;
  file:File;
  constructor(private router: Router,
             private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  get f() { return this.signupForm.controls; }
  redirect() {
    this.router.navigate(['auth/signin']);
  }
  initForm() {
    this.signupForm = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      file:[]
      
    });
  }

  selectFile(event)
  {
     let reader=new FileReader();
     if(event.target.files && event.target.files.length>0)
     {
        this.file=event.target.files[0];
        console.log(this.file);
     }
  }
  onSubmit() {
    const FirstName = this.signupForm.get('FirstName').value;
    const LastName = this.signupForm.get('LastName').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    
    const donn:FormData=new FormData();
  
  donn.append('image',this.file);

  donn.append("admin",new Blob([JSON.stringify(new Admin(LastName,FirstName,username,password))], {
       type: "application/json"
  })
);
   

  
    this.authService.register(donn)
      .pipe(first())
      .subscribe(
        data => {
              console.log('succes accueil');
              this.router.navigate(['accueil']);
               
        },
        error => {
          console.log('echec accueil');
              this.loading = false;
              this.valid = true;
           
        }
      );
    }

}
