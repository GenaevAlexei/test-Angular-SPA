import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ElementsListComponent  } from "./elementsList/elementsList.component";
import { FiltersComponent } from "./filters/filters.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { ElementsService } from "./elementsList/elements.service";
import { PaginationService } from "./pagination/pagination.service";
import { FiltersService } from "./filters/filters.service";
import { CardComponent } from "./card/card.component";
import { StartPageComponent } from "./start-page/start-page.component";

const appRoutes: Routes =[
  { path: '', component:  StartPageComponent},
  { path: 'card/:name', component: CardComponent},
  // { path: '**', redirectTo: '/card/:name'}
];

@NgModule({
  declarations: [
    AppComponent,
    ElementsListComponent,
    FiltersComponent,
    PaginationComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ElementsService,
    PaginationService,
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
