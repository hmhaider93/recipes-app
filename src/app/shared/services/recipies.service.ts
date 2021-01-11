import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {
  private model = "recipies";

  constructor(private http:HttpClient) { }

  all() {
    console.log(this.getUrl())
    return this.http.get(this.getUrl());
    //return this.recipies;
  }

  find(recipieId) {

  }

  create(recipie) {
    return this.http.post(this.getUrl(), recipie);
  }

  update(recipie) {
    console.log('UPDATE Recipie', recipie);
    return this.http.put(`${this.getUrl()}/${recipie.id}`, recipie);
    //return this.http.put()
  }

  delete(recipieId) {
    console.log('DELETE Recipie', recipieId);
    return this.http.delete(`${this.getUrl()}/${recipieId}`);
  }

  private getUrl(){
    return `${BASE_URL}${this.model}`
  }
}
