import { Component, ViewChild } from '@angular/core';
import { Recipe } from './recipe';
import { WeekRecipesPlanner } from './week-recipes.planner'
import { RecipeSearchComponent } from './recipe-search.component'
import { ShoppingListComponent } from './shopping-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {

  @ViewChild('planner') weekPlanner;

  title = 'Week Food Planner App';
  private weekRecipes : Map<number,Recipe[]> = new Map<number,Recipe[]>(); 

  addRecipeToSelectedDay(recipe:Recipe) {
    this.weekPlanner.addRecipeToSelectedDay(recipe);
  }
  
}