import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../models/tag';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    SearchbarComponent
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  readonly tags: Tag[];
  selectedTags: string[] = [];
  tagHint: string = '';

  constructor(private readonly activatedRoute: ActivatedRoute, private router: Router) {
    this.tags = this.activatedRoute.snapshot.data['tags']
  }

  onTagChange(tag: string, event: any) {
    if (event.target.checked) {
      this.selectedTags.push(tag);
    } else {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
    console.log(this.selectedTags);
  }

  searchByString(searchString: string) {
    const body = {
      search: {
        queryString: searchString,
        tags: []
      }
    }
    this.router.navigate(['/search', JSON.stringify(body)]);
  }

  searchAll(searchString: string) {
    const body = {
      search: {
        queryString: searchString,
        tags: this.selectedTags
      }
    }
    this.router.navigate(['/search', JSON.stringify(body)]);
  }
}
