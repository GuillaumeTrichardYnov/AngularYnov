import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personnage } from '../models/personnage';
import { Film } from '../models/film';
import  { DataService } from '../services/data.service';

@Component({
  selector: 'app-detail-personnage',
  templateUrl: './detail-personnage.component.html',
  styleUrls: ['./detail-personnage.component.css']
})
export class DetailPersonnageComponent implements OnInit {
  public url : string = "";
  public displayFilmDetail : boolean = false;
  public loading: boolean = false;
  public personnage : Personnage = new Personnage();
  public film : Film = new Film();
  public listFilm : Film[] = [];

  constructor(private route : ActivatedRoute, private dataService : DataService) {

  }
  //
  //Fonction qui permet de récupèrer les films du personnage affiché 
  //
  getListFilm()
  {
    this.loading = true;
    for (let entry of this.personnage.listFilm) {
      this.dataService.getFilmByUrl(entry)
      .subscribe((result) => {
         this.listFilm.push(result);
         this.loading = false;
      }),
      (error) => {
        console.log(error);
        this.loading = false;
       };
    }
  }
  filmDetail(clickedFilm){
    this.displayFilmDetail = true;
    this.film = clickedFilm;
  }

  closeModal()
  {
      this.displayFilmDetail = false;
  }
  //
  //Au chargement de la page je récupere les informations d'un personnage avec son URL
  //
  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(param => {
        this.url = param['url'];
		})
    this.dataService.getPersonnageByUrl(this.url)
     .subscribe((result) => {
        this.personnage = result;
        this.getListFilm();
        this.loading = false;
     }),
     (error) => {
       console.log(error);
       this.loading = false;
      };
  }
}
