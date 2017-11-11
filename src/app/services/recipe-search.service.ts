import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Recipe } from '../models/recipe';
import { RECIPES } from '../mock-recipes';
import * as Constants from '../components/Constants'

@Injectable()
export class RecipeSearchService {
    
    private recipesBackendUrl = 'http://localhost:5000/recipes/'; 
    //private recipesBackendUrl = 'http://192.168.1.129:5000/recipes/'; 

    constructor(private http: Http) {}
    
    searchRecipes(term:string): Observable<Recipe[]> {
        let url:string = this.recipesBackendUrl;
        if (term != "") {
            url += '?search=' + term;
        }

        return this.http.get(url)
            .map(response => response.json() as Recipe[]).map(data => data.slice(0,Constants.MAX_RECIPE_SUGGESTIONS));
        
        // mock
        //return Promise.resolve(RECIPES.filter(r => r.name.toLowerCase().indexOf(searchTerm.toLowerCase())>=0));
    }
    
    
   
}