import { Component, OnInit ,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { Post } from '../../Models/Post';
import { PostService } from '../../services/post.service';
import { first } from '../../../../node_modules/rxjs/operators';
import { Categorie } from '../../Models/Categorie';
import { Subscription } from '../../../../node_modules/rxjs';
import { CategorieService } from '../../services/categorie.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  UpdatePost:FormGroup;
  cat:Categorie;
  categories:Categorie[];
  CategoriesSubscription:Subscription;
  file1:File;
  file2:File;
  constructor(private bsModalRef:BsModalRef ,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService:PostService,
    private categorieService:CategorieService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getCategories();
    this.initForm();
   
  }

  selectFile1(event)
  {
     let reader=new FileReader();
     if(event.target.files && event.target.files.length>0)
     {
        this.file1=event.target.files[0];
        console.log(this.file1);
     }
  }
  selectFile2(event)
  {
     let reader=new FileReader();
     if(event.target.files && event.target.files.length>0)
     {
        this.file2=event.target.files[0];
        console.log(this.file2);
     }
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

  initForm()
  {
    this.UpdatePost = this.formBuilder.group({
      id: [{value: '', disabled: true}, [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      categorie:[],
      file1:[],
      file2:[]
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
  if(this.categories.length<2){
    this.cat=this.categories[0];

  }
  const date=new Date();
  var datePipe=new DatePipe('en-US');
  const datecreation=datePipe.transform(date,'dd-MM-yyyy');
  const admin=this.authService.currentAdminValue;
  const donn:FormData=new FormData();
  
  donn.append('image',this.file1);
  donn.append('video',this.file2);
  donn.append("post",new Blob([JSON.stringify(new Post(title,content,datecreation,admin,this.cat,[],[]))], {
       type: "application/json"
  })
);
  this.postService.updatePost(donn,id)
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
