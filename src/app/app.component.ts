import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Cook Book';
  links = [
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/recipies', icon: 'view_list', title: 'Edit Recipies' },
  ];

  constructor() {}
}
