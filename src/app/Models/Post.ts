import { Admin } from './Admin';
import { Categorie } from './Categorie';
import { Like } from './Like';

export class Post {
	idPost:String;
	titlePost:String ;
	contenuePost : String;
	datePost : String;
	photoPost :String;
    videoPost : String;
    admin:Admin;
    categoriePost:Categorie;
    listLike:Like[];
    listComment:Comment[];
    constructor(title:String,contenu:String,datep:String,admin:Admin,categorie:Categorie,likes:Like[],comments:Comment[]) {
        this.titlePost=title;
        this.contenuePost=contenu;
        this.datePost=datep;
        this.admin=admin;
        this.categoriePost=categorie
        this.listLike=likes;
        this.listComment=comments;
    }

}