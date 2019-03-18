import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute,Router } from '../../../../node_modules/@angular/router';
import { Categorie } from '../../Models/Categorie';
import { CategorieService } from '../../services/categorie.service';
import { first } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.scss']
})
export class AddCatComponent implements OnInit {
   AddCategorie:FormGroup;
   loading = false;
   submitted = false;
   valid = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService:CategorieService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  get f() { return this.AddCategorie.controls; }

  initForm() {
    this.AddCategorie = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
 }

 onSubmit() {
  const title = this.AddCategorie.get('title').value;
  const description = this.AddCategorie.get('description').value;
  console.log(title);
  console.log(description);
  this.submitted = true;

  // stop here if form is invalid
  if (this.AddCategorie.invalid) {
      return ;
  }

  this.loading = true;
  let categorie:Categorie=new Categorie();
  categorie.titleCategorie=title;
  categorie.descriptionCategorie=description;
  this.categorieService.saveCategorie(categorie)
  .pipe(first())
  .subscribe(
   data=>{
            console.log("succes");
            this.router.navigate(['ListCategorie']);
   },
   error=>{
            console.log("erreur");
            this.loading = false;
            this.valid = true;
   }
  );
 }






}
