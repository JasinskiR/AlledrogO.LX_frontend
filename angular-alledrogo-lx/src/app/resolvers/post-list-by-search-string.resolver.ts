import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
import { inject } from '@angular/core';

export const postListBySearchStringResolver: ResolveFn<Post[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const body = route.params['body'];
  console.log(body);
  return inject(PostsService).getPostsBySearchString(body);
};