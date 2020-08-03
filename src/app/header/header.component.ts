import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  collapsed = true;
  constructor(private data:DataStorageService,private auth:AuthService) { }
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  isAuthenticated = false
  usersub:Subscription
  ngOnInit(): void {
    this.usersub = this.auth.user.subscribe(user => {
    this.isAuthenticated = !!user;
    })
  }
  ngOnDestroy(){
   this.usersub.unsubscribe()
  }
  Onlogout(){
    this.auth.logout()
  }
  SaveRecipe(){
   this.data.storeRecipe()
  }
  onFetchData() {
    this.data.fetchRecipes().subscribe();
  }
}
