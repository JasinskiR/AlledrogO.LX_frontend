import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
import { inject } from '@angular/core';

export const postDetailsResolver: ResolveFn<Post> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const postId = route.params['postId'];
  return inject(PostsService).getPostById(postId);
};
