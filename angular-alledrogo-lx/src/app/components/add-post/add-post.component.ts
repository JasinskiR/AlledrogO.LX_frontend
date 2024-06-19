import {AuthService} from "../../services/auth.service";
import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { AuthorService } from "../../services/author.service";

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})

export class AddPostComponent {
  postForm!: FormGroup;
  authorInfo: any;
  authorEmail: string = '';
  authorNumber: string = '';

  constructor(private activatedRoute: ActivatedRoute, private postService: PostsService, private authService: AuthService, private router:Router, private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.getAuthorDetails();
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
    console.log(this.authorEmail);
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000)
      ]),
      email: new FormControl('', [
        Validators.email,
      ]),
      phoneNumber: new FormControl('', [
      ])
    });
  }

  addPost() {
    if (this.postForm.valid) {
      const formEmail = this.postForm.controls['email'].value;
      const formPhoneNumber = this.postForm.controls['phoneNumber'].value;

      if (formEmail && formPhoneNumber) {
        this.authorEmail = formEmail;
        this.authorNumber = formPhoneNumber;
      }
      console.log(this.authorEmail);
      console.log(this.authorNumber);
      const post = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        authorDetails: {
          email: this.authorEmail,
          phoneNumber: this.authorNumber,
        }
      };
      console.log(post);
      console.log(this.authorEmail);
      console.log(this.authorNumber);

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

  getAuthorDetails() {
    this.authorService.getAuthorId().subscribe(
      (data) => {
          this.authorInfo = data.details;
          this.authorEmail = this.authorInfo.email;
          this.authorNumber = this.authorInfo.phoneNumber;
      }
    )
  }

  cancel() {
    this.router.navigate(['/account']);
  }

  get email() {
    return this.postForm.get('email');
  }

  get phoneNumber() {
    return this.postForm.get('phoneNumber');
  }

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

}
