import { Component, OnInit, Input } from "@angular/core";
import { ElementsService } from "./elements.service";
import { PaginationService } from "../pagination/pagination.service";
import { FiltersService } from "../filters/filters.service";

@Component({
  selector: 'app-elementsList',
  templateUrl: './elementsList.component.html',
  styleUrls: ['./elementsList.component.less']
})

export class ElementsListComponent implements OnInit{

  ships: any[];
  loading = true;
  error: any;
  itemsPerPage: number = 5;
  pagesCount: number;
  currentPage: number = 1;
  lastItem: number = 4;

  fromFilters: any;
  changedShips: any[] = [];
  anyName: string = 'GO Ms Tree';


  changePage(value: any){
    value == true ? this.currentPage++ : this.currentPage--;

    this.lastItem = (this.itemsPerPage * this.currentPage) - 1 ;
  }

  constructor(private elementsService : ElementsService,
              private paginationService: PaginationService,
              private filtersService: FiltersService){}

  ngOnInit(): void {
    this.elementsService.getShips().valueChanges.subscribe((result: any) => {
      this.ships = result.data.ships;
      this.loading = result.loading;
      this.error = result.error;

      this.filtersService.currentFilters.subscribe((result: any) => {
        this.fromFilters = result;

        console.log(this.fromFilters);
        console.log(this.ships);
        this.changedShips = this.ships;

        if (this.fromFilters.isActive === true) {

            this.changedShips = [];
            this.currentPage = 1;
            this.lastItem = 4;

            for (let i = 0; i < this.ships.length; i++) {
              const element = this.ships[i];
              let homePort = this.ships[i].home_port;

              for (const port in this.fromFilters.ports) {
                if (this.fromFilters.ports.hasOwnProperty(port)) {
                  const el = this.fromFilters.ports[port];

                  if (el.name == homePort && el.isChecked == true &&
                     element.type == this.fromFilters.type.typeName ) {
                      this.changedShips.push(element);
                    }else if(el.name == homePort && el.isChecked == true &&
                     this.fromFilters.type.isActive === false){
                       this.changedShips.push(element);
                    }
                  }
                }

              if (element.type == this.fromFilters.type.typeName &&
                  this.fromFilters.type.isActive === true &&
                  this.fromFilters.ports.isActive === false) {
                   this.changedShips.push(element);
              }else if(element.name === this.fromFilters.name.shipName &&
                  this.fromFilters.ports.isActive === false &&
                  this.fromFilters.type.isActive === false) {
                   this.changedShips.push(element);
                  }
             }
          }

        console.log(this.changedShips);

        this.pagesCount = this.paginationService.counter(this.changedShips);

      });
    });
  }
}
