import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RecipeSearchService } from './services/recipe-search.service';
import { ShoppingListService } from './services/shopping-list.service';
import { ScrapperSearchService } from './services/scrapper-search.service';
import { PlanningsService } from './services/plannings.service';
import { SettingsService } from './services/settings.service';
import { RecipeService } from './services/recipe.service';
import { MaterialModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { routing } from './app.routing';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { PlannerComponent } from './components/planner/planner.component';
import { DayComponent } from './components/day/day.component';
import { WeekLoaderComponent } from './components/week-loader/week-loader.component';
import { WeekLoaderDialogComponent } from './components/week-loader/week-loader-dialog/week-loader-dialog.component';
import { WeekStoreComponent } from './components/week-store/week-store.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent, 
    RecipeSearchComponent, 
    ShoppingListComponent, 
    RecipeDetailComponent, 
    PlannerComponent, 
    DayComponent, 
    WeekLoaderComponent, 
    WeekLoaderDialogComponent, WeekStoreComponent, SettingsComponent, HomeComponent 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,    
    routing,
    FormsModule ,
    MaterialModule    
  ],
  entryComponents: [
    RecipeDetailComponent, WeekLoaderDialogComponent, WeekStoreComponent, SettingsComponent
  ],
  providers: [RecipeSearchService, ShoppingListService, ScrapperSearchService, PlanningsService, SettingsService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
