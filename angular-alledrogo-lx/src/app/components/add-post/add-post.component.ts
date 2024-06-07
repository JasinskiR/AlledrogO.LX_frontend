import {AuthService} from "../../services/auth.service";
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    RouterLink, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})

export class AddPostComponent {
  postForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostsService, private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000)
      ])
    });
  }

  addPost() {
    if (this.postForm.valid) {
      const post = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value
      };
      console.log(post);
      this.postService.createPost(post).subscribe(
        response => {
          console.log('Post created successfully');
          this.router.navigate(['/account']);
        },
        error => {
          console.error('Error creating post:', error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/account']);
  }

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

}
