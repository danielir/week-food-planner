import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Recipe } from './recipe'

@Component({
  selector: 'week-recipes-detail',
  templateUrl: './week-recipes-detail.html'  
})
export class WeekRecipesDetail {
  constructor(
    public dialogRef: MdDialogRef<WeekRecipesDetail>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
