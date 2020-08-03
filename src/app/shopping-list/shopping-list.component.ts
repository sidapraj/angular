import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
 ingredients:Ingredient[] = [
   new Ingredient('Tomatoes',2),
   new Ingredient('Capsicum',5),
   new Ingredient('RedChilly',6)
 ]
 private igChanged: Subscription
  constructor(private shoppinglist:ShoppingListService) { }
  ngOnDestroy(): void {
   this.igChanged.unsubscribe()
  }

  ngOnInit(): void {
    this.ingredients= this.shoppinglist.getIngredients();
    this.igChanged = this.shoppinglist.ingredientsChanged.
    subscribe((ingredients:Ingredient[]) =>{
      this.ingredients = ingredients;
    }
    )
  }
  // onIngredientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient)
  // }
  onEditItem(index:number){
    this.shoppinglist.startedEditing.next(index)
  }
}
