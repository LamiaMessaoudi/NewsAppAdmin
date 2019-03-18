import { Component, OnInit,EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute,Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-view-categorie',
  templateUrl: './view-categorie.component.html',
  styleUrls: ['./view-categorie.component.scss']
})
export class ViewCategorieComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  ViewCategorie:FormGroup;
  constructor(private bsModalRef: BsModalRef ,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();

  }
initForm()
{
  this.ViewCategorie = this.formBuilder.group({
    name: [{value: '', disabled: true}, [Validators.required]],
    description: [{value: '', disabled: true}, [Validators.required]]
  }); 
}
onClose() 
{
    this.bsModalRef.hide();
 }
}
