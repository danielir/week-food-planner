import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Recipe } from '../../models/recipe'

@Component({
  selector: 'wmp-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [`
    ul {
      list-style-type: none;
    }`  
  ]
})
export class RecipeDetailComponent {
  
  removed=new EventEmitter<any>();
  moved=new EventEmitter<any>();
  changedServings=new EventEmitter<any>();
  
  constructor(
    public dialogRef: MdDialogRef<RecipeDetailComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  cancel(): void {
    this.dialogRef.close();
  }

  onRemove():void {    
    this.removed.emit({recipe: this.data.recipe, selectedDay: this.data.selectedDay, recipeIndex: this.data.recipeIndex});
  }

  onMoved(value):void {    
    this.moved.emit({ recipe: this.data.recipe, selectedDay: this.data.selectedDay, recipeIndex: this.data.recipeIndex, destinationDay: value});
  }

  accept() {
    this.changedServings.emit({recipe: this.data.recipe, selectedDay: this.data.selectedDay, recipeIndex: this.data.recipeIndex});
    this.dialogRef.close();    
  }
  
}
