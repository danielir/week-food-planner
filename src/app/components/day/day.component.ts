import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component'
import { Recipe } from '../../models/recipe'
import * as config from '../../models/config' 

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() title: string;
  @Input() recipes: Recipe[]; 
  
  isActive: boolean; 

  @Output() recipeRemoved=new EventEmitter<any>();
  @Output() recipeMoved=new EventEmitter<any>();
  @Output() recipeChangedServings=new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {    
  }

  openDialog(recipe: Recipe, recipeIndex: number): void {
    
    let dialogRef = this.dialog.open(RecipeDetailComponent, {
      width: '500px',
      data: { weekDays: config.weekDays, recipe: recipe, recipeIndex: recipeIndex }
    });

    const removed = dialogRef.componentInstance.removed.subscribe((data) => {
      this.recipeRemoved.emit(data);
      dialogRef.close();      
    });

    const moved = dialogRef.componentInstance.moved.subscribe((data) => {
      this.recipeMoved.emit(data);
      dialogRef.close();
    });

    const changedServings = dialogRef.componentInstance.changedServings.subscribe((data) => {
      this.recipeChangedServings.emit(data);
      dialogRef.close();
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      removed.unsubscribe();
      moved.unsubscribe();
      changedServings.unsubscribe();
    });
  
  } 

}
