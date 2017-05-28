import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  inputs: ['input']
})
export class ErrorComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit() {
  }

}
