import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Recipe } from './recipe';

@Injectable()
export class PlanningsService {
    
    private planningsUrl = 'http://localhost:5000/plannings/'; 
    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http) {}
    
    storeWeekPlanning(weekName:string, recipes: Map<number,Recipe[]>): Promise<string> {
        
        this.headers.append('Access-Control-Allow-Origin','*');
        
        let url:string = this.planningsUrl;
        let request = {
            weekName: weekName,
            weekRecipes: recipes
        }
        console.log("sending week recipes: "+JSON.stringify(recipes));
        return this.http
            .post(url, JSON.stringify(request), {headers: this.headers})
            .toPromise()
            .then(function(res) {
                let aux = res.json();
                return aux;
            })
            .catch(this.handleError);
    }    
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    
   
}