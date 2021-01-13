import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecipiesService } from '../shared/services/recipies.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.scss']
})
export class RecipiesComponent implements OnInit {

  selectedRecipie = null;
  recipies = this.db.collection('recipe').valueChanges({idField: 'this'});
  re : Recipe
  

  constructor(private recipiesService: RecipiesService,private db: AngularFirestore) { }

  ngOnInit(): void {
    this.resetSelectedRecipie();
    //this.loadRecipies();

  }

  loadRecipies(){
    console.log("loadingRecipies Now");
    console.log(this.recipies);
    //this.recipies = this.db.collection('recipe').valueChanges({idField: 'id'});
    //this.cancel();

    //  this.recipiesService.all()
    //  .subscribe(recipies => this.recipies = recipies);
    //  this.cancel();
  }

  resetSelectedRecipie() {
    const emptyRecipie = {
      dishName: '',
      ingredients: '',
      timeNeeded: '',
      description: '',
      rating: 0,
      pictureUrl: '',
    };

    this.selectedRecipie = emptyRecipie;
  }

  selectRecipie(recipie) {
    this.selectedRecipie = recipie;
  }

  saveRecipie(recipie) {
    if(recipie.id) {
      this.recipiesService.update(recipie).subscribe(result => this.loadRecipies());
    } else {
      this.db.collection('recipe').add(recipie).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        recipie.id = docRef.id;
      
      })
        .catch(function(error) {
          console.error("Error adding document: ", error);
      })
    }
  }

  deleteRecipie(recipieId) {
    this.recipiesService.delete(recipieId)
    .subscribe(result => this.loadRecipies());
  }

  cancel() {
    this.resetSelectedRecipie();
  }

  suggestNextIngredient(){
    console.log("Next Ingredient Button has been pressed");
  }
}
