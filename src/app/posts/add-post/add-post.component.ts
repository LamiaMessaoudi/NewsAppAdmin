import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute,Router } from '../../../../node_modules/@angular/router';

import { PostService } from '../../services/post.service';
import { first } from '../../../../node_modules/rxjs/operators';
import { Post } from '../../Models/Post';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../Models/Categorie';
import { Subscription } from '../../../../node_modules/rxjs';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  categories:Categorie[];
  CategoriesSubscription:Subscription;
  AddPost:FormGroup;
  AddCategorie:FormGroup;
  loading = false;
  submitted = false;
  valid = false;
  cat:Categorie;
  constructor(   private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService:PostService,
    private categorieService:CategorieService,
    private authService: AuthService
     ) { }

  ngOnInit() {
    this.initForm();
    this.getCategories();
  }


  get f() { return this.AddPost.controls; }

  initForm() {
    this.AddPost = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
  
    });
 }



 getCategories()
 {
   this.categorieService.emitCategories();
   this.CategoriesSubscription=this.categorieService.CategoriesSubjet.subscribe(
     (categorie:Categorie[])=>{
       this.categories=categorie;
     
      
     }
   );
   this.categorieService.emitCategories();
 }
 
 SelectIdCategorie(idCategorie:number)
 {
   this.cat=this.categories[idCategorie];

  
 }


 onSubmit() {
  const title = this.AddPost.get('title').value;
  const content = this.AddPost.get('content').value;
  if(this.categories.length<2){
    this.cat=this.categories[0];

  }
  this.submitted = true;

 // stop here if form is invalid
  if (this.AddPost.invalid) {
      return ;
  }

  this.loading = true;
  let post:Post=new Post();
  post.titlePost=title;
  post.contenuePost=content;
  post.categoriePost=this.cat;
  const date=new Date();
  var datePipe=new DatePipe('en-US');
  const datecreation=datePipe.transform(date,'dd-MM-yyyy');
  post.admin=this.authService.currentAdminValue;
  post.listComment=[];
  post.listLike=[];
  //console.log(datecreation);
  post.datePost=datecreation;
 this.postService.savePost(post)
  .pipe(first())
  .subscribe(
   data=>{
            //console.log("succes");
            this.router.navigate(['ListPosts']);
   },
   error=>{
            //console.log("erreur");
            this.loading = false;
            this.valid = true;
   }
  );
 }


}
