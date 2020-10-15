import { Injectable } from "@angular/core";
// import { Input } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class PaginationService{

  constructor(){ }

  counter(ships){
    let shipsQuantity: number = 0;
    let pagesCount: number = 0;
    let itemsPerPage: number = 5;

    for (let i = 0; i < ships.length; i++) {
       shipsQuantity++;
     }

     return pagesCount = Math.ceil(shipsQuantity/itemsPerPage);
  }
}
