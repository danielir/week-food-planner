import { Component, Output, EventEmitter } from '@angular/core';
import { RecipeSearchService } from '../../services/recipe-search.service'
import { Recipe } from '../../models/recipe';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatFormField } from '@angular/material'


// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']  
})
export class RecipeSearchComponent implements OnInit {

  @Output()
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Observable<Recipe[]>;
  private searchTerms = new Subject<string>();
    
  ngOnInit(): void {
    this.recipes = this.searchTerms
      .debounceTime(300) 
      .distinctUntilChanged()
      .switchMap(term => term ? this.recipeSearchService.searchRecipes(term) : Observable.of<Recipe[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Recipe[]>([]);
      });  
    
  }

  constructor(private recipeSearchService: RecipeSearchService) { }  
  
  // push search term into the observable stream
  search(searchTerm:string): void {
    console.log("search "+searchTerm);
    this.searchTerms.next(searchTerm);
  }

  selectRecipe(recipe:Recipe) {    
    this.recipeSelected.emit(recipe);
  }

    
}
