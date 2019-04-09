import { Component, OnInit,EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute,Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  ViewPost:FormGroup;
  id:String;
  constructor(private bsModalRef: BsModalRef ,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.id=this.ViewPost.get('id').value;

  }
  initForm()
{
  this.ViewPost = this.formBuilder.group({
    title: [{value: '', disabled: true}, [Validators.required]],
    content: [{value: '', disabled: true}, [Validators.required]],
    photoPost:[],
    videoPost:[],
    id:[]
  }); 
}
onClose() 
{
    this.bsModalRef.hide();
 }

}
