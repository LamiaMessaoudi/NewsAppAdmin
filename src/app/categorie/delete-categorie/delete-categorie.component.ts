import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.scss']
})
export class DeleteCategorieComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  constructor(private bsModalRef: BsModalRef,
              private categorieService:CategorieService) { }

  ngOnInit() {
  }
  onClose() {
    this.bsModalRef.hide();

  }
  deleteCategorie(idCategorie:String)
  {
    this.categorieService.deleteCategorie(idCategorie).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }
}
