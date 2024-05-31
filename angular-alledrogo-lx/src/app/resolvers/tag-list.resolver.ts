import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Tag } from '../models/tag';
import { TagsService } from '../services/tags.service';
import { inject } from '@angular/core';

export const tagListResolver: ResolveFn<Tag[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(TagsService).getAllTags();
};
