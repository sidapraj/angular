import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map,tap, take, exhaustMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService,private auth:AuthService) { }
  storeRecipe(){
   const recipes = this.recipeService.getRecipes()
   return this.http.put('https://ng-course-recipe-cc323.firebaseio.com/recipes.json',recipes)
   .subscribe(response=> {
     console.log(response)
   })
  } 
  fetchRecipes() {
    
      return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-cc323.firebaseio.com/recipes.json'
      ).pipe(  map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  
   
   
      
    
  }
}
