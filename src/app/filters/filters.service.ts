import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class FiltersService{
  defaultObj = {};

  private filtersObj = new BehaviorSubject(this.defaultObj);
  currentFilters = this.filtersObj.asObservable();

  constructor(){}

  changefiltersObj(value: any){
    this.filtersObj.next(value);
  }
}
