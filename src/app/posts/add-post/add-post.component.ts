import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute,Router } from '../../../../node_modules/@angular/router';

import { PostService } from '../../services/post.service';
import { first } from '../../../../node_modules/rxjs/operators';
import { Post } from '../../Models/Post';
import { DatePipe } from '../../../../node_modules/@angular/common';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  AddPost:FormGroup;
  AddCategorie:FormGroup;
  loading = false;
  submitted = false;
  valid = false;
  constructor(   private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService:PostService) { }

  ngOnInit() {
    this.initForm();
  }


  get f() { return this.AddPost.controls; }

  initForm() {
    this.AddPost = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
 }







 onSubmit() {
  const title = this.AddPost.get('title').value;
  const content = this.AddPost.get('content').value;
  console.log(title);
  console.log(content);
  this.submitted = true;

  // stop here if form is invalid
  if (this.AddPost.invalid) {
      return ;
  }

  this.loading = true;
  let post:Post=new Post();
  post.titlePost=title;
  post.contenuePost=content;
  const date=new Date();
  var datePipe=new DatePipe('en-US');
  const datecreation=datePipe.transform(date,'dd-MM-yyyy');
  console.log(datecreation);
  post.datePost=datecreation;
 this.postService.savePost(post)
  .pipe(first())
  .subscribe(
   data=>{
            console.log("succes");
            this.router.navigate(['ListPosts']);
   },
   error=>{
            console.log("erreur");
            this.loading = false;
            this.valid = true;
   }
  );
 }


}
