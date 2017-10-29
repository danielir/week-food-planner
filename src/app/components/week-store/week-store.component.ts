import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-week-store',
  templateUrl: './week-store.component.html',
  styleUrls: ['./week-store.component.css']
})
export class WeekStoreComponent implements OnInit {

  @Output() storeRequested = new EventEmitter<any>();

  private weekName : string = '';

  constructor(
    public dialogRef: MdDialogRef<WeekStoreComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.weekName = this.data.weekName;
  }

  cancel() {
    this.dialogRef.close();
  }

  accept() {
    this.storeRequested.emit(this.weekName);
  }

}
