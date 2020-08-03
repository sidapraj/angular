import { AuthService } from './../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  private recipes:Recipe[] = [
    // new Recipe('Chicken Biryani','Delicious Indian taste',
    // 'https://www.awesomecuisine.com/wp-content/uploads/2007/10/Chicken-Biryani_resized.jpg',
    // [
    //   new Ingredient('Tomatoes',2),new Ingredient('Meat',2),new Ingredient('Mayaonese',2)
    // ]),
    // new Recipe('Italian Pizza','King Of Continentals',
    // 'https://www.midnightblueelephant.com/wp-content/uploads/2020/03/aurelien-lemasson-theobald-x00CzBt4Dfk-unsplash.jpg',
    // [
    //   new Ingredient('Pizza Base',2),new Ingredient('Chilli Flakes',2),new Ingredient('Mayaonese',2)
    // ])
  
  ];
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index]
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]){
   this.shoppinglist.addIngredients(ingredients)
  }
  addRecipe(recipe: Recipe){
   this.recipes.push(recipe)
   this.recipesChanged.next(this.recipes.slice())
  }
  updateRecipe(index: number, newRecipe:Recipe){
   this.recipes[index] = newRecipe;
   this.recipesChanged.next(this.recipes.slice())
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  constructor(private shoppinglist:ShoppingListService,private auth:AuthService) { }
}
