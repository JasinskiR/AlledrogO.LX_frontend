import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { AuthorService } from '../../services/author.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { forkJoin, switchMap } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})


export class EditPostComponent {
  authorInfo: any;
  post: Post;
  editPostForm!: FormGroup;
  postStatus: string = '';
  tags: string[] = [];
  newTags: string[] = [];
  tagsToDelete: string[] = [];
  newStatus: string = '';
  imagesToDelete: any[] = [];
  uploadedImages: any[] = [];

  visibility: string[] = ['---', 'Published', 'Archived'];
  
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private authorService: AuthorService, private postService: PostsService, private router: Router) {
    this.post = this.activatedRoute.snapshot.data['post'];
    this.tags = this.post.tags!;
    this.checkIfUserIsPostAuthor();
  }

  ngOnInit(): void {
    this.checkIfUserIsPostAuthor();
    this.setStatus();
    this.editPostForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.maxLength(1000)
      ]),
      status: new FormControl(this.postStatus),
      image: new FormControl(),
      tag: new FormControl()
    });
  }

  setStatus() {
    this.postStatus = (this.post.status) ? this.visibility[this.post.status] : "Private";
  }

  saveNewPostStatus(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    if (selectedOption) {
      this.newStatus = selectedOption;
    }
  }

  checkIfUserIsPostAuthor() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
    this.authorService.getAuthorId().subscribe(
      (data) => {
        this.authorInfo = data;
        if (this.authorInfo.id !== this.post.authorId) {
          this.router.navigate(['/home']);
        }
      }
    );
  }

  uploadImage(event: any): void {
    const photo = (event.target as HTMLInputElement).files?.[0];
    if (photo) {
      this.postService.uploadPhoto(this.post.id, photo).pipe(
        switchMap(() => this.postService.getPostById(this.post.id))
      ).subscribe(
        (response) => {
          if (response.images) {
            const newImage = response.images.filter(newImage => 
              !this.post.images?.some(existingImage => existingImage.id === newImage.id)
            );
            this.uploadedImages.push(newImage[0]);
          }
          this.post.images = response.images;
        }
      );
      (event.target as HTMLInputElement).value = '';
    }
  }

  setImageToDelete(image: any) {
    const index = this.imagesToDelete.findIndex(img => img.url === image.url);
    if (index === -1) {
      this.imagesToDelete.push(image);
    } else {
      this.imagesToDelete.splice(index, 1);
    }
  }

  async deleteImages(images: any[]) {
    for (const image of images) {
      const imageId = image.id;
      await this.postService.deletePhoto(this.post.id, imageId).toPromise();
    }
    this.imagesToDelete = [];
  }

  async changeDetails() {
    if (this.editPostForm.valid) {
      const post = {
        title: this.editPostForm.controls['title'].value,
        description: this.editPostForm.controls['description'].value
      };
      await this.postService.editPost(this.post.id, post).toPromise();
    }
  }

  changeStatus() {
    if (this.newStatus.length > 0 && this.newStatus !== this.postStatus && this.newStatus != this.visibility[0]) {
      if (this.newStatus === this.visibility[2]) {
        this.postService.archivePost(this.post.id).subscribe();
      }
      else {
        this.postService.publishPost(this.post.id).subscribe();
      }
    }
  }

  setTagToAdd() {
    const tagControl = this.editPostForm.get('tag');
    
    if (tagControl && tagControl.value.trim()) {
      const newTag = tagControl.value.trim();
      if (newTag && !this.tags.includes(newTag)) {
        this.tags.push(newTag);
        this.newTags.push(newTag);
        tagControl.setValue('');
      }
    }
  }

  async addNewTags() {
    for (const tag of this.newTags) {
      await this.postService.addTagForPost(this.post.id, tag).toPromise();
    }
    this.newTags = [];
  }

  setTagToDelete(tag: string) {
    const index = this.tagsToDelete.indexOf(tag);
    if (index === -1) {
      this.tagsToDelete.push(tag);
    } 
    else {
      this.tagsToDelete.splice(index, 1);
    }
  }

  async deleteTags() {
    for (const tag of this.tagsToDelete) {
      await this.postService.deleteTagForPost(this.post.id, tag).toPromise();
    }
    this.tagsToDelete = [];
  }

  isImageMarkedForDeletion(image: any) {
    return this.imagesToDelete.some(img => img.url === image.url);
  }

  isTagMarkedForDelete(tag: string) {
    return this.tagsToDelete.includes(tag);
  }



  async save() {
    await this.addNewTags();
    await this.changeStatus();
    await this.deleteImages(this.imagesToDelete);
    await this.deleteTags();
    await this.changeDetails();
    await this.router.navigate(['/account']);
  }

  cancel() {
    this.deleteImages(this.uploadedImages);
    this.router.navigate(['/account']);
  }

  get title() {
    return this.editPostForm.get('title');
  }

  get description() {
    return this.editPostForm.get('description');
  }
}
