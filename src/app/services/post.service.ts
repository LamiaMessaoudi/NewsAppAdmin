import { Injectable } from '@angular/core';
import { Post } from '../Models/Post';
import { Subject } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private listPosts:Post[]=[];
  public PostsSubjet=new Subject<Post[]>();
  constructor(private httpClient:HttpClient) { 
    this.getAllPosts();
  }
  emitPosts()
  {
    this.PostsSubjet.next(this.listPosts.slice());
  }
    getAllPosts()
  {
    this.httpClient.get('http://localhost:9999/findAllPost').subscribe(
  (res:any[])=>{
       console.log('test');
       this.listPosts=res["content"]
       this.emitPosts();
  });
  }






  savePost(donn:FormData)
{
  return this.httpClient.post(`http://localhost:9999/savePost`, donn)
        .pipe(map(res => {
         
            this.getAllPosts();
      
        }));
}


deletePost(idPost:String)
{
  return this.httpClient.delete('http://localhost:9999/deletePost/'+idPost)
  .pipe(map(any=>{
      console.log("succes");
      this.getAllPosts();
  }));
}
updatePost(post:Post,idPost:String)
{
  return this.httpClient.put('http://localhost:9999/updatePost/'+idPost,post)
  .pipe(map(post=>{
    if (post ) {
      console.log(post);

      this.getAllPosts();
      
  }
  this.getAllPosts();
  return post;
     
  }));
}




}
