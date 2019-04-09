import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Admin } from '../Models/Admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
admin:Admin;
id:String;
nom:String;
prenom:String;
email:String
  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.admin=this.authservice.currentAdminValue;
    this.id=this.admin.idAdmin;
    this.nom=this.admin.nomAdmin;
    this.prenom=this.admin.prenomAdmin;
    this.email=this.admin.emailAdmin;

  }

}
