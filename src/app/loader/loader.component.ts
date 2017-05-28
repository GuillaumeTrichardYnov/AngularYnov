import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  inputs: ['input']
})
export class LoaderComponent implements OnInit {
  @Input() loading: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
