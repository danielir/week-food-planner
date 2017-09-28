import { Component, OnInit } from '@angular/core';
import { MdTabsModule } from '@angular/material';
import { Recipe } from './recipe';
import { RecipeSearchComponent } from './recipe-search.component'
import { ShoppingListComponent } from './shopping-list.component';
import { Router, ActivatedRoute } from '@angular/router'
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { WeekRecipesDetail } from './week-recipes-detail'


@Component({
  selector: 'week-recipes-planner',
  templateUrl: './week-recipes.planner.html',
  styleUrls: ['./app.component.css']  
})
export class WeekRecipesPlanner implements OnInit {

  title = 'Week Food Planner App';
  private weekRecipes : Map<number,Recipe[]> = new Map<number,Recipe[]>();
  selectedDay = 0; //monday
  weekDays : string[] = ["lunes","martes","miercoles","jueves","viernes"];  
  servings = 2;
  
  constructor(public dialog: MdDialog) {}

  ngOnInit(): void {
    this.weekRecipes[0]=[];
    this.weekRecipes[1]=[];
    this.weekRecipes[2]=[];
    this.weekRecipes[3]=[];
    this.weekRecipes[4]=[];    
  }

  addRecipeToSelectedDay(recipe:Recipe) {
    let r:Recipe = new Recipe(recipe.id, recipe.name, this.servings);
    this.weekRecipes[this.selectedDay].push(r);    
  }

  onLinkClick($event: any) {
    this.selectedDay = $event.index;
    console.log(JSON.stringify(this.weekRecipes));
  }

  openDialog(recipe: Recipe): void {
    let dialogRef = this.dialog.open(WeekRecipesDetail, {
      width: '250px',
      data: { recipe: recipe }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  
  }

}


