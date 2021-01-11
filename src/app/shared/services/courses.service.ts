
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private model = "courses";
  private courses = [
    {
      id: 1,
      title: 'Angular 9 Fundamentals!!',
      description: 'Learn the fundamentals of Angular 9',
      percentComplete: 26,
      favorite: true
    },
    {
      id: 2,
      title: 'JavaScript The Really REALLY HARD PARTS!!',
      description: 'Worship Will Sentance',
      percentComplete: 50,
      favorite: true
    }
  ];

  constructor(private http:HttpClient) { }

  all() {
    console.log(this.getUrl())
    return this.http.get(this.getUrl());
    //return this.courses;
  }

  find(courseId) {

  }

  create(course) {
    return this.http.post(this.getUrl(), course);
  }

  update(course) {
    console.log('UDDATE COURSE', course);
    return this.http.put(`${this.getUrl()}/${course.id}`, course);
    //return this.http.put()
  }

  delete(courseId) {
    console.log('DLETE COURSE', courseId);
    return this.http.delete(`${this.getUrl()}/${courseId}`);
  }

  private getUrl(){
    return `${BASE_URL}${this.model}`
  }
}
