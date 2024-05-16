import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
import { inject } from '@angular/core';

export const postListResolver: ResolveFn<Post[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PostsService).getAllPosts();
};