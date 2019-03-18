import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../Models/Categorie';
import { Subscription } from '../../../../node_modules/rxjs';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteCategorieComponent } from '../delete-categorie/delete-categorie.component';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie.component';
import { ViewCategorieComponent } from '../view-categorie/view-categorie.component';


@Component({
  selector: 'app-list-cat',
  templateUrl: './list-cat.component.html',
  styleUrls: ['./list-cat.component.scss']
})
export class ListCatComponent implements OnInit {
  categories:Categorie[];
  CategoriesSubscription:Subscription;
  bsModalRef: BsModalRef;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService:CategorieService,
    private bsModalService: BsModalService ) {
      this.getCategories();
     }


  ngOnInit() {
   this.getCategories();
  }

  ngOnDestroy(){
    this.CategoriesSubscription.unsubscribe;
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
  deleteCategorie(idCategorie) {
 
    this.bsModalRef = this.bsModalService.show(DeleteCategorieComponent);
    this.bsModalRef.content.idCategorie=idCategorie;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
         console.log('deleted');
        }, 5000);
      }
    });

  }
  updateCategorie(categorie:Categorie) {

    this.bsModalRef = this.bsModalService.show(UpdateCategorieComponent);
    this.bsModalRef.content.id=categorie.idCategorie;
    this.bsModalRef.content.title=categorie.titleCategorie;
    this.bsModalRef.content.desc=categorie.descriptionCategorie;


  }
  viewCategorie(categorie:Categorie)
  {
    this.bsModalRef = this.bsModalService.show(ViewCategorieComponent);

    this.bsModalRef.content.title=categorie.titleCategorie;
    this.bsModalRef.content.desc=categorie.descriptionCategorie;
  }
}