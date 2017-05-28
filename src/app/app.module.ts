import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule  } from 'ng2-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DataService } from './services/data.service';
import { ErrorComponent } from './error/error.component';
import { DetailPersonnageComponent } from './detail-personnage/detail-personnage.component';
import { LoaderComponent } from './loader/loader.component';
import { FilmModalComponent } from './film-modal/film-modal.component';
import { PagingComponent } from './paging/paging.component';
import { NullOrEmptyPipe } from './null-or-empty.pipe';
import { GetNamePipe } from './get-name.pipe';

const approutes: Routes = [
  {path:"accueil", component: AccueilComponent },
  {path:"detail/:url", component: DetailPersonnageComponent },
  {path:"", redirectTo: "/accueil", pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ErrorComponent,
    DetailPersonnageComponent,
    LoaderComponent,
    FilmModalComponent,
    PagingComponent,
    NullOrEmptyPipe,
    GetNamePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(approutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
