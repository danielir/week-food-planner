import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ScrapperSearchService } from '../../services/scrapper-search.service';
import { Recipe } from '../../models/recipe';
import { OnInit } from '@angular/core';
import { ShoppingListItem } from '../../models/shopping-list-item';
import { Ingredient } from '../../models/ingredient';
import { Product } from '../../models/product';
import { RecipeService } from '../../services/recipe.service'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']  
})
export class ShoppingListComponent implements OnInit {

  private ingredients: Ingredient[] = [];
  private products: Product[] = [];
  
  constructor(
    private shoppingListService: ShoppingListService, 
    private scrapperSearchService: ScrapperSearchService, 
    private recipeService:RecipeService,
    public snackBar: MatSnackBar ) { }      
  
  ngOnInit(): void {
    this.ingredients = this.recipeService.getWeekRecipesIngredients();
  }

  // Request ingredients needed for all the current recipes
  requestIngredientsFromRecipes() {    
    this.ingredients = this.recipeService.getWeekRecipesIngredients();
    if (this.ingredients.length == 0) {
      let message = "Hey!, creo que antes deberías añadir alguna receta";
      let action = "none";
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }  
    
  }

  requestMappings(mappingName:string) {
    this.products = [];
    this.ingredients.forEach((ingredient, index) => {
      this.products.push({name:'',quantity:1});
      this.shoppingListService.requestProductForIngredient(mappingName, ingredient).then(data => this.products[index].name = data);
    });    
  }

  busca() {
    console.log("buscar");
  }

  searchProducts(ingredient:any, term:string) {
    console.log("search " + term + " for ingredient " + ingredient.value);
    this.scrapperSearchService.searchTermInMercadona(term).then(response => {
      console.log(response);
    }
    );
  } 
  
  createShoppingListInMercadonaWebsite():void {
    this.shoppingListService.createShoppingCart(this.products).then(result => {
      if (result["sent"]==result["added"]) {
        console.log("todo ha ido estupendamente")
      }
      else {
        console.log("no se ha podido resolver: "+result["unresolvedItems"]);
      }
    });        
  }  
}
