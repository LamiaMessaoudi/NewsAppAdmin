import { Injectable } from '@angular/core';
import { Categorie } from '../Models/Categorie';
import { Subject } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private listCategories:Categorie[]=[];
  public CategoriesSubjet=new Subject<Categorie[]>();
  
  constructor( private httpClient:HttpClient) { 
    this.getAllCategories();
  }


emitCategories()
{
  this.CategoriesSubjet.next(this.listCategories.slice());
}
  getAllCategories()
{
  this.httpClient.get('http://localhost:9999/findAllCategorie').subscribe(
(res:any[])=>{
     console.log('test');
     this.listCategories=res["content"]
     this.emitCategories();
});
}
saveCategorie(categorie:Categorie)
{
  return this.httpClient.post(`http://localhost:9999/saveCategorie`, categorie)
        .pipe(map(categorie => {
            // register successful if there's a jwt token in the response
            if (categorie ) {
                console.log(categorie);
    
                this.getAllCategories();
                
            }
            this.getAllCategories();
            return categorie;
        }));
}


deleteCategorie(idCategorie:String)
{
  return this.httpClient.delete('http://localhost:9999/deleteCategorie/'+idCategorie)
  .pipe(map(any=>{
      console.log("succes");
      this.getAllCategories();
  }));
}
updateCategorie(categorie:Categorie,idCategorie:String)
{
  return this.httpClient.put('http://localhost:9999/updateCategorie/'+idCategorie,categorie)
  .pipe(map(categorie=>{
    if (categorie ) {
      console.log(categorie);

      this.getAllCategories();
      
  }
  this.getAllCategories();
  return categorie;
     
  }));
}


}