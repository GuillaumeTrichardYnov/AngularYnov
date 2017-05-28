import { Personnage } from '../models/personnage';

export function jsonToPersonnage(input) {
  let personnage = new Personnage();
  let arrayUrl = input.url.split("/");
  personnage.id = arrayUrl[arrayUrl.length - 2]
  personnage.name = input.name;
  personnage.birth_year = input.birth_year;
  personnage.eye_color = input.eye_color;
  personnage.gender = input.gender;
  personnage.hair_color = input.hair_color;
  personnage.url = input.url;
  personnage.listFilm = input.films;
  personnage.homeworld = input.homeworld;
  personnage.height = input.height;
  personnage.mass = input.mass;
  personnage.skin_color = input.skin_color;
  return personnage;
}

export function jsonArrayToPersonnageArray(input: Array<any>) {
  let personnages: Personnage[] = [];
  for (let entry of input)
  {
    personnages.push(jsonToPersonnage(entry))
  }
  return personnages;
}
