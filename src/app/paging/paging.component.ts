import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs";
@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnChanges {
  public allPages : number[] = [];
  @Input() currentPage: number;
  @Input() lastPage: number;

	@Output()
	change: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnChanges(){
      this.getPageArray();
  }

  ngOnInit() {
  }
	next() {
    this.change.emit(0);
  }

  goToPage(number) {
    this.change.emit(number);
  }

  sortNumber(a,b) {
    return a - b;
  }

  prev() {
    this.change.emit(-1);
  }
  //
  //Fonction qui permet de construre le tableau de nombre pour la pagination "googleLike"
  //
  getPageArray(){
    this.allPages = [];
    for (var i = (this.currentPage-2); i < (this.currentPage+3); i++) {
      if(i > 0 && i < this.lastPage+1)
      {
        this.allPages.push(i);
      }
      this.allPages.sort(this.sortNumber);
    }
  }
}
