import { Component, OnInit } from '@angular/core';
import { Personnage } from '../models/personnage';
import  { DataService } from '../services/data.service';
import  { jsonToPersonnage, jsonArrayToPersonnageArray } from '../factory/json-to-personnage';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  	ngOnInit() {

  	}
    public lastPage : number = 8;
    public currentPage : number = 1;
    public loading: boolean = false;
    public keyWord: string = "";
    public error: boolean = false;
    public errorText: string = "Une erreur est survenue";
	  public listPersonnages: Personnage[] = [];
    public filtredPersonnages: Personnage[] = [];
  	constructor(private dataService : DataService) {
      //
      //J'affiche au chargement de l'application tout les personnages
      //
      this.loading = true;
       dataService.getList()
      .subscribe((result) => {
         this.listPersonnages = result;
         this.loading = false;
         this.lastPage = this.dataService.getLastPage();
      }),
      (error) => {
        this.loading = false;
        this.error = true
       };
    }
    //
    //Fonction lancé quand l'utilisateur souhaite changer de page
    //
    handleUserUpdated(page) {
        this.loading = true;
    		if(page == 0)
        {
           this.dataService.getNextPage()
          .subscribe((result) => {
             this.listPersonnages = result;
             this.loading = false;
          }),
          (error) => {
            console.log(error);
            this.loading = false;
           };
        }
    		else if(page == -1){
          this.loading = true;
           this.dataService.getPrevPage()
          .subscribe((result) => {
             this.listPersonnages = result;
             this.loading = false;
          }),
          (error) => {
            console.log(error);
            this.loading = false;
           };
      	}
        else
        {
          this.loading = true;
           this.dataService.getPage(page)
          .subscribe((result) => {
             this.listPersonnages = result;
             this.loading = false;
          }),
          (error) => {
            console.log(error);
            this.loading = false;
           };
        }
        this.currentPage = this.dataService.getCurrentPage();
    }
    //
    //Fonction lancé quand l'utilisateur fait une recherche
    //
    valider()
  	{
  		if(this.keyWord.length > 100)
  		{
  			this.error = true
  			this.errorText = "Votre recherche est trop longue pour contenir des résultats";
  		}
      else if(this.keyWord.length == 0)
      {
        this.error = true
  			this.errorText = "Votre recherche ne contiens aucun mot";
      }
  		else
  		{
        this.loading = true;
  			this.error = false;


        this.dataService.serchPersonnage(this.keyWord)
       .subscribe((result) => {
         if(result.length == 0){
           this.error = true;
           this.errorText = "Votre recherche ne contiens aucun résultats";
           this.loading = false;
         }
         else{
           this.filtredPersonnages = result;
           this.listPersonnages = result;
           this.lastPage = this.dataService.getLastPage();
           this.currentPage = this.dataService.getCurrentPage();

           this.loading = false;
         }
          this.loading = false;
       }),
       (error) => {
         console.log(error);
         this.loading = false;
        };

  		}
  	}

}
