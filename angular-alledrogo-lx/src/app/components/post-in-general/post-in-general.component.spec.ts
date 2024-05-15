import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInGeneralComponent } from './post-in-general.component';

describe('PostInGeneralComponent', () => {
  let component: PostInGeneralComponent;
  let fixture: ComponentFixture<PostInGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostInGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostInGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
