import { Component, OnInit } from '@angular/core';
import { MdTabsModule } from '@angular/material';
import { Recipe } from './recipe';
import { RecipeSearchComponent } from './recipe-search.component'
import { ShoppingListComponent } from './shopping-list.component';
import { Router, ActivatedRoute } from '@angular/router'
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { WeekRecipesDetail } from './week-recipes-detail'
import { PlanningsService } from './plannings.service'


@Component({
  selector: 'week-recipes-planner',
  templateUrl: './week-recipes.planner.html',
  styleUrls: ['./app.component.css']  
})
export class WeekRecipesPlanner implements OnInit {

  private weekRecipes : Map<number,Recipe[]> = new Map<number,Recipe[]>();
  selectedDay = 0; //monday
  weekDays : string[] = ["lunes","martes","miercoles","jueves","viernes"];  
  servings = 2;
  
  constructor(public dialog: MdDialog, private planningService: PlanningsService) {}

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

  getWeekRecipes():Map<number,Recipe[]> {
    return this.weekRecipes;
  }

  onLinkClick($event: any) {
    this.selectedDay = $event.index;
    console.log(JSON.stringify(this.weekRecipes));
  }

  storeWeek(weekName:string) {
    console.log("save week: "+JSON.stringify(this.weekRecipes));
    this.planningService.storeWeekPlanning(weekName, this.weekRecipes).then(response => 
      {
        if (response["n"]==1 && response["ok"]=="1") {
          console.log("modificado correctamente");
        }
        if (response["nModified"]==0) {
          console.log("no ha introducido ningun cambio");
        }
      }
    );
  }

  openDialog(recipe: Recipe, selectedDay: number, recipeIndex: number): void {
    
    let dialogRef = this.dialog.open(WeekRecipesDetail, {
      width: '500px',
      data: { weekDays: this.weekDays, recipe: recipe, selectedDay: selectedDay, recipeIndex: recipeIndex }
    });

    const removed = dialogRef.componentInstance.removed.subscribe((data) => {
      if (this.weekRecipes[data.selectedDay][data.recipeIndex].name==data.recipe.name) {
        this.weekRecipes[data.selectedDay].splice(data.recipeIndex, 1);
        dialogRef.close();
      }
    });

    const moved = dialogRef.componentInstance.moved.subscribe((data) => {
      if (this.weekRecipes[data.selectedDay][data.recipeIndex].name==data.recipe.name) {
        this.weekRecipes[data.selectedDay].splice(data.recipeIndex, 1);
        dialogRef.close();
      }
      this.weekRecipes[data.destinationDay].push(data.recipe);

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      removed.unsubscribe();
    });
  
  } 

}


