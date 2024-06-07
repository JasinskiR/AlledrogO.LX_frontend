import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';


export const usersPostsListResolver: ResolveFn<Post[]> = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  return inject(PostsService).getAllUsersPosts();
};
