import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RecipeSearchService } from './recipe-search.service';
import { ShoppingListService } from './shopping-list.service';
import { ScrapperSearchService } from './scrapper-search.service';
import { MaterialModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeSearchComponent } from './recipe-search.component';
import { ShoppingListComponent } from './shopping-list.component';
import { AlertModule } from 'ngx-bootstrap';
import { routing } from './app.routing';
import { WeekRecipesPlanner } from './week-recipes.planner';
import { WeekRecipesDetail } from './week-recipes-detail';

@NgModule({
  declarations: [
    AppComponent, RecipeSearchComponent, ShoppingListComponent, WeekRecipesPlanner, WeekRecipesDetail
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    routing,
    FormsModule ,
    MaterialModule   
  ],
  entryComponents: [
    WeekRecipesDetail
  ],
  providers: [RecipeSearchService, ShoppingListService, ScrapperSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
