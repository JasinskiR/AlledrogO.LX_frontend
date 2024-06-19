import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { inject } from '@angular/core';
import {Chat} from "../models/chat";

export const chatListResolver: ResolveFn<Chat> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ChatService).getChats();
};
