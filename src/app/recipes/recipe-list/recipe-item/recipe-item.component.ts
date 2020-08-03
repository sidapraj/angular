import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Output() recipeSelected = new EventEmitter<void>()
  constructor(private recipeService: RecipeService) { }
  @Input() recipe: Recipe
  @Input() index:number;
  ngOnInit(): void {
  } 
  // onSelected(){
  //   // this.recipeSelected.emit()
  //   this.recipeService.recipeSelected.emit(this.recipe)
  // }
}
