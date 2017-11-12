import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeSearchComponent } from '../components/recipe-search/recipe-search.component'
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component';
import { SettingsService } from '../services/settings.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
    @ViewChild('planner') weekPlanner;
    @ViewChild('recipeSearch') recipeSearch;
    //@ViewChild('shoppingList') shoppingListComponent;

  
    constructor(public settings:SettingsService, public snackBar: MatSnackBar) { }

    
    recipeSelected(recipe:Recipe) {
      console.log('when recipeSelected should ask for week recipes')
      let weekRecipes:Recipe[][] = this.weekPlanner.getWeekRecipes()
      let recipeInDays:boolean[] = [];
      console.log(weekRecipes.length)
      for (let dayRecipes of weekRecipes) {      
        let found = false
        for (let r of dayRecipes) {
          if (recipe.name == r.name) {
            found = true;
            break;
          }          
        }
        recipeInDays.push(found)
      }
      console.log(recipeInDays) 
      this.recipeSearch.setDayActive(recipeInDays)     
    }

    changeActivedDays(info:any) {
      if (info.dayActive[info.index]) {
        this.weekPlanner.addRecipeToDay(info.index, info.recipe)
      }
      else {
        this.weekPlanner.removeRecipeFromDay(info.index, info.recipe)
      }
      
    }

    
    /*
    requestShoppingList() {
      let recipes : Recipe[][] = this.weekPlanner.getWeekRecipes();
      let noRecipe = true;
      for (let i=0; i<recipes.length; i++) {
        console.log("length"+i+":"+recipes[i].length);
        if (recipes[i].length > 0) {
          noRecipe = false;
          break;
        }      
      }
      
      if (noRecipe) {
        this.openSnackBar("Hey!, creo que antes deberías añadir alguna receta","none");
      }
      else {
        this.shoppingListComponent.requestShoppingList(recipes);
      }
      
    }
  
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
  
    requestMappings() {
      let mappingName = this.settings.getDefaultMapping();
      console.log("mappingName:"+mappingName);
      this.shoppingListComponent.requestMappings(mappingName);
    }
  
    createMercadonaShoppingList() {
      this.shoppingListComponent.createShoppingListInMercadona();
    }
    */
    
  }
  