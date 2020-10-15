import { Component, OnInit } from '@angular/core';
import { ElementsService } from "../elementsList/elements.service";
import { ActivatedRoute} from '@angular/router';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})

export class CardComponent implements OnInit {
  ships: any[];
  missions: string;
  type: string;
  port: string;
  weight: number;
  year: string;
  name: string;

  private subscripton: Subscription;

  constructor( private elementsService: ElementsService,
               private activateRoute: ActivatedRoute) {
        this.subscripton = activateRoute.params.subscribe(params => this.name = params['name']);
               }

  ngOnInit(): void {
    this.elementsService.getShips().valueChanges.subscribe((result: any) => {
      this.ships = result.data.ships;
      console.log(this.ships);

      this.name = this.name.trim();
      let missionsArr = [];

      this.ships.forEach(element => {
        if(element.name == this.name){

          element.missions.forEach(item => {
            missionsArr.push(item.name)
          });
          console.log(missionsArr);
          this.missions = missionsArr.join(',');

          this.type = element.type;
          this.port = element.home_port;
          this.weight = element.weight_kg;
          this.year = element.year_built;
        }
      });
    });
  }
}
