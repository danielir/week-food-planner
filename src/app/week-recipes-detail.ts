import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Recipe } from './recipe'

@Component({
  selector: 'week-recipes-detail',
  templateUrl: './week-recipes-detail.html',
  styles: [`
    ul {
      list-style-type: none;
    }`  
  ]
})
export class WeekRecipesDetail {
  
  @Output()
  removed=new EventEmitter<any>();
  moved=new EventEmitter<any>();
  
  constructor(
    public dialogRef: MdDialogRef<WeekRecipesDetail>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRemove():void {    
    this.removed.emit({recipe: this.data.recipe, selectedDay: this.data.selectedDay, recipeIndex: this.data.recipeIndex});
  }

  onChange(value):void {
    console.log("change to "+value);
    this.moved.emit({ recipe: this.data.recipe, selectedDay: this.data.selectedDay, recipeIndex: this.data.recipeIndex, destinationDay: value})
  }
  
}
