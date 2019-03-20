import { Component, OnInit ,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { Post } from '../../Models/Post';
import { PostService } from '../../services/post.service';
import { first } from '../../../../node_modules/rxjs/operators';
@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  UpdatePost:FormGroup;
  constructor(private bsModalRef:BsModalRef ,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService:PostService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm()
  {
    this.UpdatePost = this.formBuilder.group({
      id: [{value: '', disabled: true}, [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    }); 
  }
  onClose() 
{
    this.bsModalRef.hide();
 }
 update()
 {
  const id=this.UpdatePost.get('id').value;
  const title=this.UpdatePost.get('title').value;
  const content=this.UpdatePost.get('content').value;
  console.log(id);
  console.log(title);
  console.log(content);
  let post:Post=new Post();
 post.titlePost=title;
 post.contenuePost=content;
  this.postService.updatePost(post,id)
  .pipe(first())
  .subscribe(
   data=>{
            console.log("succes");
            this.event.emit('OK');
            this.bsModalRef.hide();
   },
   error=>{
            console.log("erreur");
           
   }
  );
   
 }

}
