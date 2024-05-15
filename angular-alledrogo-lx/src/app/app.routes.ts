import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { postListResolver } from './resolvers/post-list.resolver';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: HomepageComponent, 
    title: 'Homepage',
    resolve: {
      posts: postListResolver
    }
  },
  { 
    path: 'login', 
    component: HomepageComponent, 
    title: 'LogIn'
  },
  { 
    path: 'account', 
    component: HomepageComponent, 
    title: 'Your account'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }