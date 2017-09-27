import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Product } from './product';

@Injectable()
export class ScrapperSearchService {
    
    private scrapperServiceMercadona = 'http://localhost:5004/scrapper/mercadona/search/'; 
    
    constructor(private http: Http) {}
    
    searchTermInMercadona(term: string) : Promise<Product[]>{
        console.log("searchTermInMercadona "+term);
        let url:string = this.scrapperServiceMercadona+term;
        return this.http.get(url).toPromise().then(response => response.json() as Product[]);        
    }
   
}