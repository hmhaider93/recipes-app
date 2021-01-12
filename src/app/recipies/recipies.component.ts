import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecipiesService } from '../shared/services/recipies.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.scss']
})
export class RecipiesComponent implements OnInit {

  selectedRecipie = null;

  recipies:any = null;

  constructor(private recipiesService: RecipiesService,private db: AngularFirestore) { }

  ngOnInit(): void {
    this.resetSelectedRecipie();
    this.loadRecipies();

  }

  loadRecipies(){
    console.log("loadingRecipies Now");
    this.db.collection('recipe').get().subscribe(
      //start
      this.recipies = function(querySnapshot) {
        let recipiesRecieved: any[] = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            recipiesRecieved.push(doc.data())
          
            

        })
        console.log(recipiesRecieved);
      return recipiesRecieved;
      }
      //end
    );
    console.log(this.recipies);
    this.cancel();

    //  this.recipiesService.all()
    //  .subscribe(recipies => this.recipies = recipies);
    //  this.cancel();
  }

  resetSelectedRecipie() {
    const emptyRecipie = {
      id: null,
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
      recipie.id = 1;
      this.db.collection('recipe').add(recipie).then(function(docRef) {
        //this.loadRecipies();
        console.log("Document written with ID: ", docRef.id);})
        .catch(function(error) {
          console.error("Error adding document: ", error);
      })
      .finally( () => 
        this.loadRecipies()
        );
      // Old
      //this.recipiesService.create(recipie)
      //.subscribe(result => this.loadRecipies());

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
