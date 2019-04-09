export class Admin {
	idAdmin:String;
	nomAdmin:String ;
	prenomAdmin : String;
	emailAdmin : String;
	passwordAdmin :String;
	avatarAdmin : String;
    constructor(nom:String,prenom:String,email:String,password:String) {
		this.nomAdmin=nom;
		this.prenomAdmin=prenom;
		this.emailAdmin=email;
		this.passwordAdmin=password;
    }

}
