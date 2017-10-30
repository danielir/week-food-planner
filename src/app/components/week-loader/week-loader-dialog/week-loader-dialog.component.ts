import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlanningsService } from '../../../services/plannings.service' 

@Component({
  selector: 'app-week-loader-dialog',
  templateUrl: './week-loader-dialog.component.html',
  styleUrls: ['./week-loader-dialog.component.css']
})
export class WeekLoaderDialogComponent implements OnInit {

  private weeks:any[] = [];
  private weekSelected:any = null;
  
  @Output() loadRequested = new EventEmitter<any>();

  constructor(
    public planningService: PlanningsService,
    public dialogRef: MatDialogRef<WeekLoaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.planningService.loadWeekPlannings().then(data => this.weeks = data);
  }

  cancel() {
    this.dialogRef.close();
  }

  accept() {
    if (this.weekSelected == null) {
      alert('Tienes que seleccionar una semana')
      return;
    }    
    this.loadRequested.emit(this.weekSelected);    
  }

}
