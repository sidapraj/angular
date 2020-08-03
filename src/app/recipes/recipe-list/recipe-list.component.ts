import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>()
recipes:Recipe[] = [
  // new Recipe('Chicken Biryani','Delicious Indian taste','https://www.awesomecuisine.com/wp-content/uploads/2007/10/Chicken-Biryani_resized.jpg',[]),
  // new Recipe('Italian Pizza','King Of Continentals','https://www.midnightblueelephant.com/wp-content/uploads/2020/03/aurelien-lemasson-theobald-x00CzBt4Dfk-unsplash.jpg',[])

];
subscription:Subscription
// onRecipeSelected(recipe:Recipe){
//    this.recipeWasSelected.emit(recipe)
// }
  constructor(private router:Router,private route:ActivatedRoute, private recipe:RecipeService) { }

  ngOnInit(): void {
    this.subscription = this.recipe.recipesChanged.subscribe(
      (recipes:Recipe[]) => {
       this.recipes = recipes
      }
    )
    this.recipes = this.recipe.getRecipes()
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(){
  this.subscription.unsubscribe()
  }
}
