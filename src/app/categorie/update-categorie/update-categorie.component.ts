import { Component, OnInit ,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { Categorie } from '../../Models/Categorie';
import { CategorieService } from '../../services/categorie.service';
import { first } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.scss']
})
export class UpdateCategorieComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  UpdateCategorie:FormGroup;
  constructor(private bsModalRef:BsModalRef ,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService:CategorieService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm()
  {
    this.UpdateCategorie = this.formBuilder.group({
      id: [{value: '', disabled: true}, [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    }); 
  }
  onClose() 
{
    this.bsModalRef.hide();
 }
 update()
 {
  const id=this.UpdateCategorie.get('id').value;
  const name=this.UpdateCategorie.get('name').value;
  const description=this.UpdateCategorie.get('description').value;
  console.log(id);
  console.log(name);
  console.log(description);
  let categorie:Categorie=new Categorie();
  categorie.descriptionCategorie=description;
  categorie.titleCategorie=name;
  this.categorieService.updateCategorie(categorie,id)
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
