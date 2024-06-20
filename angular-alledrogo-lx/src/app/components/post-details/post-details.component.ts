import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { Post } from '../../models/post';
import {ChatService} from "../../services/chat.service";
import {LoginService} from "../../services/login.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {
  readonly post: Post;
  mainPhoto: string | null;
  selectedPhotoIndex: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,) {
    this.post = this.activatedRoute.snapshot.data['post'];
    if (this.post.images && this.post.images.length > 0) {
      this.mainPhoto = this.post.images[0].url;
    }
    else {
      this.mainPhoto = null;
    }
    console.log("cze");
    console.log(this.mainPhoto);
    this.selectedPhotoIndex = 0;
  }

  changeMainPhoto(photo: string, index: number) {
    this.mainPhoto = photo;
    this.selectedPhotoIndex = index;
  }

  redirectToChat() {
    if( this.authService.isLoggedIn) {
      this.chatService.createChat(this.post.authorId).subscribe(chatId => {

        console.log("Chat id" + chatId);
        this.router.navigate(['/chat'], { queryParams: { chatId } });
      });
    }
    else {
      this.router.navigate(['/login']);
    }

  }

}
