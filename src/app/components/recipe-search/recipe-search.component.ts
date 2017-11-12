import { Component, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { RecipeSearchService } from '../../services/recipe-search.service'
import { Recipe } from '../../models/recipe';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatFormField } from '@angular/material'
import * as Constants from '../Constants'


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

  @ViewChild('suggestions') suggestions: ElementRef;
  @ViewChild('actions') actions: ElementRef;
  
  dayActive: boolean[] = [];

  @Output()
  recipeSelected = new EventEmitter<Recipe>();
  @Output()
  changeActivedDays = new EventEmitter<any>();
  
  recipes: Observable<Recipe[]>;    
  private searchTerms = new Subject<string>();  
  weekDays = Constants.BRIEF_WEEKDAYS;
  chosenRecipe:Recipe;
    
  ngOnInit(): void {
    this.actions.nativeElement.style.display = 'none'
     
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
    console.log("search "+searchTerm)
    this.searchTerms.next(searchTerm)
    this.actions.nativeElement.style.display = 'none'
    this.suggestions.nativeElement.style.display = 'block'
  }

  selectRecipe(recipe:Recipe) {    
    this.chosenRecipe = recipe
    this.recipeSelected.emit(recipe)
    this.suggestions.nativeElement.style.display = 'none'
    this.actions.nativeElement.style.display = 'block'
  }

  setDayActive(dayActive:boolean[]) {
    this.dayActive = dayActive    
    console.log('days actived')    
  }

  toggleDayActive(index) {
    this.dayActive[index] = !this.dayActive[index]
    this.changeActivedDays.emit({recipe:this.chosenRecipe, dayActive:this.dayActive, index})
  }

    
}
