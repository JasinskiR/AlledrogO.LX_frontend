import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../models/tag';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private renderer: Renderer2, private el: ElementRef) {
    this.tags = this.activatedRoute.snapshot.data['tags']
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.resetSearchParams();
    });
  }

  resetSearchParams(){
    const inputElement = this.el.nativeElement.querySelector('.search-input');
    if (inputElement) {
      this.renderer.setProperty(inputElement, 'value', ''); // Clear the value
    }
    this.selectedTags.forEach(tagName => {
      this.deselectCheckbox(tagName);
    });
    this.selectedTags = [];
    this.tagHint = '';
  }

  onInputChange(searchString: string): void {
    const hintBtn = document.getElementsByClassName('hint-tag-button') as HTMLCollectionOf<HTMLElement>;
    hintBtn[0].classList.remove('visible');
    this.tagHint = '';
    if (searchString.startsWith('#')) {
      let searchTag: string = searchString.substring(1);
      if (searchString.includes(' ')) {
        searchTag = searchString.substring(1, searchString.indexOf(' '));
      }
      const matchingTags = this.tags.filter(tag => tag.name.startsWith(searchTag));
      hintBtn[0].classList.add('visible');
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

  searchAll(searchString: string) {
    let bodySearch: string = '';
    let extraTag: string = '';
    if (searchString.startsWith('#')) {
      extraTag = searchString.substring(1, searchString.length);
      if (searchString.includes(' ')) {
        extraTag = searchString.substring(1, searchString.indexOf(' '));
        bodySearch = searchString.substring(searchString.indexOf(' ') + 1);
      }
    }
    else {
      bodySearch = searchString;
    }
    this.selectCheckbox(extraTag);
    this.router.navigate(['/search', JSON.stringify(this.createSearchBody(bodySearch, true))]);
  }

  selectCheckbox(tagName: string) {
    const checkbox = document.getElementById(tagName) as HTMLInputElement;
    if (checkbox) {
      console.log("istnieje");
      if (!checkbox.checked) {
        checkbox.checked = true;
        if (!this.selectedTags.includes(tagName)) {
          this.selectedTags.push(tagName);
        }
      }
    }
  }

  deselectCheckbox(tagName: string) {
    const checkbox = document.getElementById(tagName) as HTMLInputElement;
    if (checkbox) {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    }
  }

  createSearchBody(searchString: string, tagsIncluded: boolean) {
    let searchTags: string[] = [];
    if (tagsIncluded){
      searchTags = this.selectedTags;
    }
    const body = {
      search: {
        queryString: searchString,
        tags: searchTags
      }
    }
    return body;
  }
}
