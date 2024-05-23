import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { postListResolver } from './resolvers/post-list.resolver';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { postDetailsResolver } from './resolvers/post-details.resolver';
import { tagListResolver } from './resolvers/tag-list.resolver';
import { postListBySearchStringResolver } from './resolvers/post-list-by-search-string.resolver';

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
      posts: postListResolver,
      tags: tagListResolver
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
  },
  {
    path: 'details/:postId',
    component: PostDetailsComponent,
    title: 'Details',
    resolve: {
      post: postDetailsResolver
    }
  },
  { 
    path: 'search/:body', 
    component: HomepageComponent, 
    title: 'Search',
    resolve: {
      searchedPosts: postListBySearchStringResolver,
      tags: tagListResolver
    }
  },
  { 
    path: 'search', 
    component: HomepageComponent, 
    title: 'Search',
    resolve: {
      posts: postListBySearchStringResolver,
      tags: tagListResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }