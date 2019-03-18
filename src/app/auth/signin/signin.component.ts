import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../services/auth.service';
import { Admin } from '../../Models/Admin';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loading = false;
  submitted = false;
  valid = false;
 
  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  get f() { return this.signinForm.controls; }


  initForm() {
        this.signinForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]]
        });
     }

     onSubmit() {
      const username = this.signinForm.get('username').value;
      const password = this.signinForm.get('password').value;
      console.log(username);
      console.log(password);
      this.submitted = true;

      // stop here if form is invalid
      if (this.signinForm.invalid) {
          return ;
      }

      this.loading = true;
      this.authService.login(username, password)
        .pipe(first())
        .subscribe(
          data => {
                this.router.navigate(['accueil']);

          },
          error => {

                this.loading = false;
                this.valid = true;
                
          }
        );
     }
     redirect() {
            this.router.navigate(['auth/signup']);
  }
}
