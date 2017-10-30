import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeekLoaderDialogComponent } from './week-loader-dialog/week-loader-dialog.component';

@Component({
  selector: 'app-week-loader',
  templateUrl: './week-loader.component.html',
  styleUrls: ['./week-loader.component.css']
})
export class WeekLoaderComponent implements OnInit {

  @Output() loadRequested = new EventEmitter<any>();
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  loadWeek(): void {
    
    let dialogRef = this.dialog.open(WeekLoaderDialogComponent, {
      width: '500px',
      data: {}
    });

    const loadRequested = dialogRef.componentInstance.loadRequested.subscribe((data) => {
      this.loadRequested.emit(data);
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  
  } 

}
