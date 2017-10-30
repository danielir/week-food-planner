import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public settings:SettingsService, public dialogRef: MatDialogRef<SettingsComponent>) { }

  private servings:number;
  private mapping:string;

  ngOnInit() {
    this.servings = this.settings.getDefaultServings();  
    this.mapping = this.settings.getDefaultMapping();  
  }
  
  accept() {
    this.settings.setDefaultServings(this.servings);
    this.settings.setDefaultMapping(this.mapping);
    console.log("default mapping:"+this.mapping)
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

}
