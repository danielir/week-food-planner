import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';
import { ShoppingListItem } from './shopping-list-item';
import { RECIPES } from './mock-recipes';
import { Ingredient } from './ingredient';
import { Product } from './product';

@Injectable()
export class ShoppingListService {
    
    private shoppingListBackendUrl = 'http://localhost:5000/recipes/shopping-list/'; 
    private headers = new Headers({'Content-Type': 'application/json'});
    private mappingUrl = 'http://localhost:5002/mappings/'; 
    private shoppingCartUrl = "http://localhost:5004/scrapper/mercadona/shoppingcart"
    

    constructor(private http: Http) {}
    
    getIngredientsOfWeekRecipes(recipes: Map<number,Recipe[]>): Promise<Ingredient[]> {
        
        this.headers.append('Access-Control-Allow-Origin','*');
        
        let url:string = this.shoppingListBackendUrl;
        console.log("sending recipes: "+JSON.stringify(recipes));
        return this.http
            .post(url, JSON.stringify(recipes), {headers: this.headers})
            .toPromise()
            .then(function(res) {
                let aux = res.json() as Ingredient[];
                return aux;
            })
            .catch(this.handleError);
    }    
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    requestProductForIngredient(mappingName: string, ingredient: Ingredient) : Promise<string>{
        console.log("querying for "+ingredient.item);
        let url:string = this.mappingUrl+"?ingredient="+ingredient.item+"&mapping="+mappingName;
        return this.http
        .get(url)
        .toPromise()
        .then(response => response.json() as string)
        .catch(this.handleError);
    }

    updateMapping(mapping:string) {
        this.headers.append('Access-Control-Allow-Origin','*');
        let url:string = this.mappingUrl;
        return this.http
        .put(url, mapping, {headers: this.headers})
        .toPromise()
        .then(response => console.log(response.json()));        
    }

    createShoppingCart(products:Product[]): Promise<string> {
        this.headers.append('Access-Control-Allow-Origin','*');        
        let url:string = this.shoppingCartUrl;
        console.log("sending products: "+JSON.stringify(products));
        return this.http
            .post(url, JSON.stringify(products), {headers: this.headers})
            .toPromise()
            .then(function(res) {
                let aux = res.json();  
                console.log("aux ="+aux["sent"]);              
                return aux;
            })
            .catch(this.handleError);
    }
   
}