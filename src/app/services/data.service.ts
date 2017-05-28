import  {Injectable} from "@angular/core";
import  {Http, Response} from "@angular/http";
import { Personnage } from '../models/personnage';
import { Film } from '../models/film';
import  { jsonToPersonnage, jsonArrayToPersonnageArray } from '../factory/json-to-personnage';
import  { jsonToFilm, jsonArrayToFilmArray } from '../factory/json-to-film';
import { Observable } from 'rxjs/Observable';
import "rxjs";


@Injectable()
export class DataService{

	private oldSearch : string = "";
	private currentPage : number = 0;
	private lastPage : number = 0;

	constructor(private http : Http){
	}
	//
	//Méthode appelé en cas d'erreur
	//
	private handleError (error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  //console.error(errMsg);
  return Observable.throw(errMsg);
}
	//
	//Récupération de tout les personnages
	//
	getList(): Observable<Personnage[]>{
		if(this.oldSearch != "")
		{
			return this.serchPersonnage(this.oldSearch);
		}
		else{
			return this.http.get("https://swapi.co/api/people")
			.map((response) => {
				this.currentPage = 1;
				this.lastPage = Math.ceil(response.json()["count"]/10);
				return jsonArrayToPersonnageArray(response.json()["results"]);
			}).catch(this.handleError);
			}
	}

	//
	//Fonction de récupération d'une page en particulier
	//
	getPage(pageNumber): Observable<Personnage[]>{
			this.currentPage = pageNumber;
			return this.http.get("https://swapi.co/api/people/?page="+pageNumber)
			.map((response) => {
				return jsonArrayToPersonnageArray(response.json()["results"]);
			}).catch(this.handleError);
	}

	getCurrentPage(): number{
		return this.currentPage;
	}

	getLastPage(): number{
		return this.lastPage;
	}

	getNextPage(): Observable<Personnage[]>{
			this.currentPage++;
			return this.http.get("https://swapi.co/api/people/?page="+this.currentPage)
			.map((response) => {
				return jsonArrayToPersonnageArray(response.json()["results"]);
			}).catch(this.handleError);
	}

	getPrevPage(): Observable<Personnage[]>{
			this.currentPage--;
			return this.http.get("https://swapi.co/api/people/?page="+this.currentPage)
			.map((response) => {
				return jsonArrayToPersonnageArray(response.json()["results"]);
			}).catch(this.handleError);
	}

	getPersonnageByUrl(url): Observable<Personnage>{
			return this.http.get(url)
			.map((response) => {
				return jsonToPersonnage(response.json());
			}).catch(this.handleError);
	}
	//
	//Fonction qui permet de récupérer juste le nom d'un objet en fonction de son URL
	//
	getNameByUrl(url): Observable<string>{
			return this.http.get(url)
			.map((response) => {
				return response.json()['name'];
			}).catch(this.handleError);
	}


	getFilmByUrl(url): Observable<Film>{
			return this.http.get(url)
			.map((response) => {
				return jsonToFilm(response.json());
			}).catch(this.handleError);
	}

	//
	//Fonction de recherche d'un personnage
	//
	serchPersonnage(motClef): Observable<Personnage[]>{
		this.oldSearch = motClef;
		this.currentPage = 1;
			return this.http.get("https://swapi.co/api/people/?search="+motClef)
			.map((response) => {
				this.lastPage = Math.ceil(response.json()["count"]/10);
			return jsonArrayToPersonnageArray(response.json()["results"]);
			}).catch(this.handleError);
	}

}
