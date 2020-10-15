import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: 'root'
})

export class ElementsService {

  constructor(private apollo: Apollo){}

  getShips(){
    return this.apollo.watchQuery({
            query: gql`
                {
                  ships {
                     name
                     type
                     home_port
                     weight_kg
                     year_built
                     missions{
                       name
                     }
                   }
                }
              `,
            })
  }

}
