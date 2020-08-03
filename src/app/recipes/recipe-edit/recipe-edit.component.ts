import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  preserveWhitespaces:true
})
export class RecipeEditComponent implements OnInit {

  constructor(private router:Router,private recipeService:RecipeService,private route:ActivatedRoute) { }
  id:number;
  editMode = false
  recipeForm:FormGroup
  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
     this.id = +params['id']; 
     this.editMode = params['id'] != null
     console.log(this.editMode)
     this.initForm()
    })
  }
  private initForm(){
    
    let recipeName = "";
    let recipeImagePath = ""
    let recipeDescription = ""
    let recipeIngredients = new FormArray([])
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'quantity': new FormControl(ingredient.quantity,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
   this.recipeForm = new FormGroup({
     'name': new FormControl(recipeName,Validators.required),
     'imagePath': new FormControl(recipeImagePath,Validators.required),
     'description': new FormControl(recipeDescription,Validators.required),
     'ingredients': recipeIngredients

   })
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onSubmit(){
    // const newRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients'])
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    } else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onClear()
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'quantity': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
onClear(){
  this.router.navigate(['../'], {relativeTo: this.route});
}
}
