import { Component, OnInit,  EventEmitter, Input, Output  } from '@angular/core';
import { FiltersService } from "./filters.service";
import { ElementsService } from "../elementsList/elements.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})

export class FiltersComponent implements OnInit {
  filtersTitle: string = 'Фильтры';
  selectedCount: number = 0 ;
  shipsNameHelp: any[] ;

  filters: any = {
    isActive: false,

    ports:{
      isActive: false,
      portCanaveral:{
        name: 'Port Canaveral',
        isChecked: false
      },
      portOfLA:{
        name: 'Port of Los Angeles',
        isChecked: false
      },
      fortLauderdale: {
        name: 'Fort Lauderdale',
        isChecked: false
      },
    },

    type: {
      typeName: '',
      isActive: false
    },

    name:{
      shipName: '',
      isActive: false,
    },
  };

  constructor(private filtersService: FiltersService,
              private elementsService: ElementsService) {}

  ngOnInit(): void {
    this.elementsService.getShips().valueChanges.subscribe((result: any) => {
      this.shipsNameHelp = result.data.ships;
    });

     // this.filters = JSON.parse(localStorage.getItem('filterState'));
     this.filtersService.changefiltersObj(this.filters);
  }

  shoosePort(port){
    if (port == 'portCanaveral') {
      this.filters.ports.portCanaveral.isChecked = !this.filters.ports.portCanaveral.isChecked;
      this.selectedCounter(this.filters.ports.portCanaveral.isChecked);
    }else
    if(port == 'portOfLA'){
      this.filters.ports.portOfLA.isChecked = !this.filters.ports.portOfLA.isChecked;
      this.selectedCounter(this.filters.ports.portOfLA.isChecked);
    }else
    if(port == 'fortLauderdale'){
      this.filters.ports.fortLauderdale.isChecked = !this.filters.ports.fortLauderdale.isChecked;
      this.selectedCounter(this.filters.ports.fortLauderdale.isChecked);
    }

    this.filters.name.shipName = '';
    this.filters.isActive = true;
    this.filters.ports.isActive = true;
    this.filters.name.isActive = false;

    if (this.filters.ports.portCanaveral.isChecked === false &&
        this.filters.ports.portOfLA.isChecked === false &&
        this.filters.ports.fortLauderdale.isChecked === false) {
          this.filters.ports.isActive = false;
        }

    this.updateFilters()
  }

  selectedCounter(value){
    value == true ? this.selectedCount++ : this.selectedCount-- ;
  }

  shooseType(type){
    this.filters.type.typeName = type;
    this.filters.name.shipName = '';

    this.filters.isActive = true;
    this.filters.type.isActive = true;
    this.filters.name.isActive = false;

    if (this.filters.ports.portCanaveral.isChecked === false &&
        this.filters.ports.portOfLA.isChecked === false &&
        this.filters.ports.fortLauderdale.isChecked === false) {
          this.filters.ports.isActive = false;
        }

    this.updateFilters()
  }

  typeClickHandler(type){
    if(this.filters.type.isActive && this.filters.type.typeName == type){
        this.filters.type.isActive = !this.filters.type.isActive;
        this.filters.type.typeName = '';
    }

    this.updateFilters()
  }

  shooseName(){
    this.filters.isActive = true;

    this.updateFilters()
  }

  clickNameInput(){
    if (this.filters.name.shipName === '') {
        this.filters.isActive = false;
    }

    this.filters.name.isActive = true;
    this.filters.type.isActive = false;
    this.filters.type.typeName = '';
    this.filters.ports.isActive = false;
    this.filters.ports.portCanaveral.isChecked = false;
    this.filters.ports.portOfLA.isChecked = false;
    this.filters.ports.fortLauderdale.isChecked = false;
    this.selectedCount = 0 ;

    this.updateFilters()
  }

  blurInput(){
    if(this.filters.name.shipName === '' &&
      this.filters.type.isActive === false &&
      this.filters.ports.isActive === false){
        this.filters.name.isActive = false;
        // this.filters.isActive = false;
    }
      this.updateFilters()
  }

  updateFilters(){
    if (this.filters.name.isActive == false &&
        this.filters.type.isActive == false &&
        this.filters.ports.isActive == false &&
        this.filters.name.shipName == ''){
          this.filters.isActive = false;
    }

    this.filtersService.changefiltersObj(this.filters);
    localStorage.setItem('filterState', JSON.stringify(this.filters));
  }
}
