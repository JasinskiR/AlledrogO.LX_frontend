import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
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

  onInputChange(searchString: string): void {
    const hintBtn = document.getElementsByClassName('hint-tag-button') as HTMLCollectionOf<HTMLElement>;
    hintBtn[0].style.visibility = "hidden";
    this.tagHint = '';
    if (searchString.startsWith('#')) {
      const searchTag = searchString.substring(1);
      const matchingTags = this.tags.filter(tag => tag.name.startsWith(searchTag));
      hintBtn[0].style.visibility = "visible";
      if (matchingTags.length > 0) {
        const bestTag = matchingTags.reduce((prev, current) => (prev.postCount > current.postCount) ? prev : current);
        this.tagHint = bestTag ? bestTag.name : '';
      }
      else {
        const bestTag = this.tags.reduce((prev, current) => (prev.postCount > current.postCount) ? prev : current);
        this.tagHint = bestTag.name;
      }
    }
  }

  onHintTagClick(){
    const hint = this.tagHint;
    const checkbox = document.getElementById(hint) as HTMLInputElement;
    if (checkbox) {
      if (!checkbox.checked) {
        checkbox.checked = true;
        if (!this.selectedTags.includes(hint)) {
          this.selectedTags.push(hint);
        }
      }
    }
    console.log(this.selectedTags);
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
    let bodySearch: string = '';
    if (searchString.startsWith('#')) {
      if (searchString.includes(' ')) {
        bodySearch = searchString.substring(searchString.indexOf(' ') + 1);
      }
    }
    const body = {
      search: {
        queryString: bodySearch,
        tags: []
      }
    }
    this.router.navigate(['/search', JSON.stringify(body)]);
  }

  searchAll(searchString: string) {
    let bodySearch: string = '';
    if (searchString.startsWith('#')) {
      if (searchString.includes(' ')) {
        bodySearch = searchString.substring(searchString.indexOf(' ') + 1);
      }
    }
    const body = {
      search: {
        queryString: bodySearch,
        tags: this.selectedTags
      }
    }
    this.router.navigate(['/search', JSON.stringify(body)]);
  }
}
