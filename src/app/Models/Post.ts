import { Admin } from './Admin';
import { Categorie } from './Categorie';
import { Like } from './Like';

export class Post {
	idPost:String;
	titlePost:String ;
	contenuePost : string;
	datePost : string;
	photoPost :string;
    videoPost : string;
    admin:Admin;
    categoriePost:Categorie;
    listLike:Like[];
    listComment:Comment[];
    constructor() {
    }

}