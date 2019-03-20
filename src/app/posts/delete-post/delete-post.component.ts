import { Component, OnInit ,EventEmitter} from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { PostService } from '../../services/post.service';
@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  constructor(private bsModalRef: BsModalRef,
    private postService:PostService) { }

  ngOnInit() {
  }
  onClose() {
    this.bsModalRef.hide();

  }
  deletePost(idPost:String)
  {
    this.postService.deletePost(idPost).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

}
