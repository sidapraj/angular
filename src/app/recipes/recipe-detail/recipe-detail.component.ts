import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe:Recipe
  constructor(private router:Router,private recipeservice:RecipeService,private route:ActivatedRoute) { }
 id :number;
  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params:Params)=>{
    this.id = +params['id']
    this.recipe = this.recipeservice.getRecipe(this.id)
    })
  }
  onAddToShoppingList(){
   this.recipeservice.addIngredientsToShoppingList(this.recipe.ingredients)
  }
  onEditRecipe(){
  this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDeleteRecipe() {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
