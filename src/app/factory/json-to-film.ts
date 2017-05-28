import { Film } from '../models/film';

export function jsonToFilm(input) {
  let film = new Film();
  let arrayUrl = input.url.split("/");
  film.id = arrayUrl[arrayUrl.length - 2]
  film.title = input.title;
  film.director = input.director;
  film.producer = input.producer;
  film.release_date = input.release_date;
  film.url = input.url;
  film.opening_crawl = input.opening_crawl;
  film.characters = input.characters;
  return film;
}


export function jsonArrayToFilmArray(input: Array<any>) {
  let films: Film[] = [];
  for (let entry of input)
  {
    films.push(jsonToFilm(entry))
  }
  return films;
}
