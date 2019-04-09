import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { UpdatePostComponent } from '../update-post/update-post.component';
import { ViewPostComponent } from '../view-post/view-post.component';
import { Post } from '../../Models/Post';
import { Subscription } from '../../../../node_modules/rxjs';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {
  bsModalRef: BsModalRef;
  posts:Post[];
  PostsSubscription:Subscription;

  totalRec : number;
  page: number = 1;
  constructor(  private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService:PostService,
    private bsModalService: BsModalService) {
      this.getPosts();
     }

  ngOnInit() {
    this.getPosts();
  }


  getPosts()
  {
    this.postService.emitPosts();
    this.PostsSubscription=this.postService.PostsSubjet.subscribe(
      (post:Post[])=>{
        this.posts=post;
        this.totalRec = this.posts.length;
       
      }
    );
    this.postService.emitPosts();
  }

  deletePost(idPost:String) {
 
    this.bsModalRef = this.bsModalService.show(DeletePostComponent);
    this.bsModalRef.content.idPost=idPost;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
         console.log('deleted');
        }, 5000);
      }
    });
  }
  updatePost(post:Post) {

    this.bsModalRef = this.bsModalService.show(UpdatePostComponent);
    this.bsModalRef.content.id=post.idPost
    this.bsModalRef.content.title=post.titlePost;
    this.bsModalRef.content.content=post.contenuePost;


  }

  viewPost(post:Post)
  {
    this.bsModalRef = this.bsModalService.show(ViewPostComponent);
    this.bsModalRef.content.id=post.idPost;
    this.bsModalRef.content.title=post.titlePost;
    this.bsModalRef.content.content=post.contenuePost;
    this.bsModalRef.content.photoPost=post.photoPost;
    this.bsModalRef.content.videoPost=post.videoPost;
  }  
}
