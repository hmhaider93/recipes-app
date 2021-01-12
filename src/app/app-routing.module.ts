import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { RecipiesComponent } from './recipies/recipies.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path : 'recipies', component: RecipiesComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
