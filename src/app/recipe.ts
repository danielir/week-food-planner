export class Recipe {
    id: string;
    name: string;
    servings: number;

    constructor(id:string, name:string, servings:number) {   
        this.id = id;
        this.name = name;
        this.servings = servings;     
    }
}