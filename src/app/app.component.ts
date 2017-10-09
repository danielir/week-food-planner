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
  @ViewChild('shoppingList') shoppingListComponent;


  title = 'Week Food Planner';  

  addRecipeToSelectedDay(recipe:Recipe) {
    this.weekPlanner.addRecipeToSelectedDay(recipe);    
  }

  requestShoppingList() {
    let recipes : Map<number,Recipe[]> = this.weekPlanner.getWeekRecipes();
    this.shoppingListComponent.requestShoppingList(recipes);
  }

  requestMappings(mappingName:string) {
    console.log("mappingName:"+mappingName);
    this.shoppingListComponent.requestMappings(mappingName);
  }

  createMercadonaShoppingList() {
    this.shoppingListComponent.createShoppingListInMercadona();
  }
  
}
