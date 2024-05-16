import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-in-general',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './post-in-general.component.html',
  styleUrl: './post-in-general.component.scss'
})
export class PostInGeneralComponent {
  @Input() post!: Post;
    
}
