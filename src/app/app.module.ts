import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import { ListCatComponent } from './categorie/list-cat/list-cat.component';
import { AddCatComponent } from './categorie/add-cat/add-cat.component';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { ProfilComponent } from './profil/profil.component';
import { CategorieService } from './services/categorie.service';
import { PostService } from './services/post.service';
import { StatisticalComponent } from './statistical/statistical.component';
import { DeleteCategorieComponent } from './categorie/delete-categorie/delete-categorie.component';
import { UpdateCategorieComponent } from './categorie/update-categorie/update-categorie.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ViewCategorieComponent } from './categorie/view-categorie/view-categorie.component';



const appRoutes: Routes = [
  {path: 'auth/signin' , component: SigninComponent},
  {path: 'auth/signup' , component: SignupComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: 'ListCategorie',component:ListCatComponent},
  {path: 'ListPosts',component:ListPostComponent},
  {path: 'Post/add',component:AddPostComponent},
  {path: 'Category/add',component:AddCatComponent},
  {path: 'Statistical',component:StatisticalComponent},
  {path: 'Profil',component:ProfilComponent},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/signin' }
]
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    ListCatComponent,
    AddCatComponent,
    ListPostComponent,
    AddPostComponent,
    ProfilComponent,
    StatisticalComponent,
    DeleteCategorieComponent,
    UpdateCategorieComponent,
    ViewCategorieComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot()
  ],
  providers: [
     AuthGuardService,
    AuthService,
    CategorieService,
    PostService,
    BsModalService

    ],
  bootstrap: [AppComponent],
  entryComponents:[
    DeleteCategorieComponent,
    UpdateCategorieComponent,
    ViewCategorieComponent
  ]
})
export class AppModule { }
