import { Subscription } from 'rxjs/Subscription';
import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  preserveWhitespaces:true
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('addForm') slForm:NgForm
// @ViewChild('name') nameInputRef: ElementRef
// @ViewChild('quantity') quantityInputRef: ElementRef
// @Output() ingredientAdded = new EventEmitter<Ingredient>()
  constructor(private shoppinglist:ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  editMode = false;
subscription: Subscription
editedItemIndex: number
editedItem:Ingredient
  ngOnInit(): void {
    this.subscription = this.shoppinglist.startedEditing.subscribe(
      (index:number)=> {
        this.editedItemIndex = index;
       this.editMode = true
       this.editedItem = this.shoppinglist.getIngredient(index)
       this.slForm.setValue({
         name: this.editedItem.name,
         quantity: this.editedItem.quantity
       })
      }
    )
  }
  AddItem(form:NgForm){
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingquantity = this.quantityInputRef.nativeElement.value
   const newIngredient = new Ingredient(value.name,value.quantity)
   if(this.editMode) {
     this.shoppinglist.updateIngredient(this.editedItemIndex,newIngredient)
     
   }else {
    this.shoppinglist.addIngredient(newIngredient);
   }
   this.editMode = false
   form.reset()
  //  this.ingredientAdded.emit(newIngredient)
  }
  onClear(){
    this.slForm.reset()
    this.editMode = false
  }
  onDelete(){
    this.shoppinglist.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
}
