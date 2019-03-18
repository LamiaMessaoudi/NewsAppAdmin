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
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    const FirstName = this.signupForm.get('FirstName').value;
    const LastName = this.signupForm.get('LastName').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;
    console.log(username);
    console.log(password);
    console.log(FirstName);
    console.log(LastName);
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    let admin:Admin=new Admin();
    admin.nomAdmin=LastName;
    admin.prenomAdmin=FirstName;
    admin.emailAdmin=username;
    admin.passwordAdmin=password;
  
   

  
    this.authService.register(admin)
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
