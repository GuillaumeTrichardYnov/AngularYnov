import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from '../models/film';

@Component({
  selector: 'film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.css'],
  inputs: ['input']
})
export class FilmModalComponent implements OnInit {
  @Input() film: Film;
  @Output() close = new EventEmitter();
  constructor() { }

  redirect() {
    location.reload();
  }

  closeModal() {
    this.close.emit(1);
  }

  ngOnInit() {
  }

}
