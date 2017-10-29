import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { SettingsService } from './settings.service' 
import { ShoppingListService } from './shopping-list.service' 

@Injectable()
export class RecipeService {

  constructor(private settings:SettingsService, private shoppingListService:ShoppingListService) { }

  public isRecipesEmpty():boolean {
    let weekrecipes = this.getWeekRecipes();  
    console.log(weekrecipes);  
    for (let dayrecipes of weekrecipes) {
      for (let recipe of dayrecipes) {
        return false;
      }
    }    
    return true;
  }

  
  public getWeekRecipes() {
    if (!localStorage.getItem('recipes')) {
      localStorage.setItem('recipes', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('recipes'));
  }

  public setWeekRecipes(recipes:Recipe[][]) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setWeekRecipesIngredients();
  }

  public getWeekRecipesIngredients() {
    if (!localStorage.getItem('weekRecipesIngredients')) {
      localStorage.setItem('weekRecipesIngredients', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('weekRecipesIngredients'));
  }

  private setWeekRecipesIngredients() {
    this.shoppingListService.getIngredientsOfWeekRecipes(this.getWeekRecipes()).then( data => {
      localStorage.setItem('weekRecipesIngredients', JSON.stringify(data));
    });
    
  }


  public addRecipeToSelectedDay(recipe:Recipe, selectedDay:number) {
    let newRecipe:Recipe = new Recipe(recipe.id, recipe.name, this.settings.getDefaultServings());
    let recipes: Recipe[][] = this.getWeekRecipes();
    recipes[selectedDay].push(newRecipe);    
    this.setWeekRecipes(recipes);
  }

  public moveRecipe(event: any, originDayIndex: number) {
    let recipe = event.recipe;
    let r:Recipe = new Recipe(recipe.id, recipe.name, recipe.servings);
    let recipes: Recipe[][] = this.getWeekRecipes();
    recipes[event.destinationDay].push(r);
    recipes[originDayIndex].splice(event.recipeIndex,1);
    this.setWeekRecipes(recipes);
  }

  public removeRecipe(event: any, dayIndex:number) {
    let recipes: Recipe[][] = this.getWeekRecipes();
    recipes[dayIndex].splice(event.recipeIndex, 1);
    this.setWeekRecipes(recipes);    
  }


}
