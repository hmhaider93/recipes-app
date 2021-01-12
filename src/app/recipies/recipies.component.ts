import { Component, OnInit } from '@angular/core';
import { RecipiesService } from '../shared/services/recipies.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.scss']
})
export class RecipiesComponent implements OnInit {

  selectedRecipie = null;

  recipies:any = null;

  constructor(private recipiesService: RecipiesService) { }

  ngOnInit(): void {
    this.resetSelectedRecipie();
    this.loadRecipies();

  }

  loadRecipies(){
    this.recipiesService.all()
    .subscribe(recipies => this.recipies = recipies);
    this.cancel();
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
      this.recipiesService.create(recipie)
      .subscribe(result => this.loadRecipies());

    }
  }

  deleteRecipie(recipieId) {
    this.recipiesService.delete(recipieId)
    .subscribe(result => this.loadRecipies());
  }

  cancel() {
    this.resetSelectedRecipie();
  }
}
