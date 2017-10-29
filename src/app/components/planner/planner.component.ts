import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { MdTabsModule } from '@angular/material';
import { Recipe } from '../../models/recipe';
import { RecipeSearchComponent } from '../recipe-search/recipe-search.component'
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { Router, ActivatedRoute } from '@angular/router'
import { PlanningsService } from '../../services/plannings.service'
import { DayComponent } from '../day/day.component'
import * as config from '../../models/config' 
import { WeekStoreComponent } from '../week-store/week-store.component'
import { SettingsComponent } from '../settings/settings.component'
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { RecipeService } from '../../services/recipe.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']  
})
export class PlannerComponent implements OnInit {

  @ViewChildren(DayComponent) days: QueryList<DayComponent>;
  
  private weekRecipes : Recipe[][] = [];  
  weekDays : string[] = config.weekDays;  
  weekName: string = '';
  
  constructor(
    private planningService: PlanningsService, 
    public dialog: MdDialog, 
    private recipeService: RecipeService,
    private settings: SettingsService) {}

  ngOnInit(): void {    
    this.weekRecipes = this.recipeService.getWeekRecipes();
    console.log("init:"+this.weekRecipes);
    if (!this.weekRecipes) {
      console.log("initialization");
      this.weekRecipes = [];
      this.weekRecipes[0]=[];
      this.weekRecipes[1]=[];
      this.weekRecipes[2]=[];
      this.weekRecipes[3]=[];
      this.weekRecipes[4]=[];
    }    
  }

  addRecipe(recipe:Recipe) {        
    let active:boolean[] = this.days.map(d => d.isActive);
    active.forEach( (item,index) => { if (item) this.recipeService.addRecipeToSelectedDay(recipe,index); } );
    this.weekRecipes = this.recipeService.getWeekRecipes();
  }

  getWeekRecipes():Recipe[][] {
    return this.weekRecipes;
  }

  openSettings() : void {
    let dialogRef = this.dialog.open(SettingsComponent, {
      width: '500px',
      data: { }
    });
  }

  openStoreDialog(): void {
    
    let aux = this.weekName;
    if (aux=='') {
      aux = "Semana";
    }
    
    let dialogRef = this.dialog.open(WeekStoreComponent, {
      width: '500px',
      data: { weekName: aux}
    });

    const storeOk = dialogRef.componentInstance.storeRequested.subscribe((data) => {
      this.weekName = data;
      this.storeWeek();
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  
  } 

  
  storeWeek() {
    
    if (this.weekName==null || this.weekName=='') {
      alert('please set a name');
      return false;
    }

    this.planningService.storeWeekPlanning(this.weekName, this.weekRecipes).then(response => 
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

  moveRecipe(event: any, originDayIndex: number) {
    this.recipeService.moveRecipe(event,originDayIndex);
    this.weekRecipes = this.recipeService.getWeekRecipes();
  }

  removeRecipe(event: any, dayIndex:number) {
    this.recipeService.removeRecipe(event,dayIndex);
    this.weekRecipes = this.recipeService.getWeekRecipes();
  }

  loadWeek(week:any) {
    this.planningService.loadWeekPlanningById(week.id).then(data => {
      this.weekName = data.weekName;
      this.recipeService.setWeekRecipes(data.weekPlanning);
      this.weekRecipes = this.recipeService.getWeekRecipes();      
    });

  }

  updateRecipes() {
    this.recipeService.setWeekRecipes(this.weekRecipes);
  }

  

}


