import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PaginationService } from "./pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})

export class PaginationComponent implements OnInit {

  constructor(private pagination: PaginationService) { }

  ngOnInit(): void {}

  @Output() changePage = new EventEmitter();
  clickArrow(value: any){
    this.changePage.emit(value)
  }

  @Input() myPage: number;
  @Input() pages: number;

}
