import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe'

@Injectable()
export class SettingsService {

  private defaultServings:number = 2;
  private defaultMapping:string;
  private weekRecipes:Recipe[][];
  
  constructor() { }

  public getDefaultServings() {
    return this.defaultServings;
  }

  public setDefaultServings(num:number) {
    this.defaultServings = num;
  }

  public getDefaultMapping() {
    return this.defaultMapping;
  }

  public setDefaultMapping(mapping:string) {
    this.defaultMapping = mapping;
  }

  





}
