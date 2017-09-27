import { Component, Input } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { ScrapperSearchService } from './scrapper-search.service';
import { Recipe } from './recipe';
import { OnInit } from '@angular/core';
import { ShoppingListItem } from './shopping-list-item';
import { Ingredient } from './ingredient';
import { Product } from './product';


@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']  
})
export class ShoppingListComponent implements OnInit {

  @Input()
  private recipes : Map<number,Recipe[]>;  
  
  private shoppingListItems: ShoppingListItem[] = []; 
  private unmappedIngredients: ShoppingListItem[] = [];
  private title:string = "Hola";
  private mappingsRequested: boolean = false;
  private ingredientOfProductSearch: string;
  private termOfProductSearch: string;
  private productsFoundInSearch: Product[];  
  
  ngOnInit(): void {
    this.shoppingListItems = [];
    this.unmappedIngredients = [];
  }

  requestShoppingList() {
    this.shoppingListItems = [];
    this.unmappedIngredients = [];
    this.shoppingListService.getIngredientsOfWeekRecipes(this.recipes).then((res) => {for (let ing of res) { 
      this.shoppingListItems.push({'ingredient':ing, 'product': {'desc':''}});
      this.unmappedIngredients.push({'ingredient':ing, 'product': {'desc':''}});
    }
  });

  }

  requestMappings() {
    for (let shoppingListItem of this.shoppingListItems) {
      console.log(shoppingListItem.ingredient);
      this.requestProductForIngredient(shoppingListItem);
    }    
  }

  requestProductForIngredient(shoppingListItem: ShoppingListItem) {
    this.shoppingListService.requestProductForIngredient(shoppingListItem.ingredient).then(response => {
      shoppingListItem.product = {desc: response};
      this.removeFromUnmappedByIngredient(shoppingListItem.ingredient.item);
      this.mappingsRequested = true;
    });    
  }

  private removeFromUnmappedByIngredient(ingredient:string) {
    let removeIndex = -1;
    for (let i of this.unmappedIngredients) {
      if (i.ingredient.item == ingredient) {
        removeIndex = this.unmappedIngredients.indexOf(i);
        break;
      }      
    }      
    if (removeIndex != -1) 
      this.unmappedIngredients.splice(removeIndex, 1);
  }
  
  

  searchProducts(ingredient:any, term:string) {
    this.ingredientOfProductSearch = ingredient.value;
    this.termOfProductSearch = term;
    console.log("search " + term + " for ingredient " + ingredient.value);
    this.scrapperSearchService.searchTermInMercadona(term).then(response => {
      this.productsFoundInSearch = response;      
    }
    );
  }
  
  assignProduct(product: string) {
    console.log("asigna " + product + " a " + this.ingredientOfProductSearch);
    for (let i of this.shoppingListItems) {
      if (i.ingredient.item == this.ingredientOfProductSearch) {
        i.product.desc = product;
        break;
      }
    }
    this.removeFromUnmappedByIngredient(this.ingredientOfProductSearch);
    let mapping:string = "{ \"" + this.ingredientOfProductSearch + "\":\"" + product + "\"}";
    this.shoppingListService.updateMapping(mapping);
  }
  
  constructor(private shoppingListService: ShoppingListService, private scrapperSearchService: ScrapperSearchService) { }    

  unassignProduct(item: ShoppingListItem) {
    this.unmappedIngredients.push(item);    
    item.product.desc = '';
  }
  
}
