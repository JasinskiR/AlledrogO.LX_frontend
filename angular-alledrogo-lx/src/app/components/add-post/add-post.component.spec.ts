import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';
import { AuthorService } from '../../services/author.service';
import { AddPostComponent } from './add-post.component';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let postsServiceMock: any;
  let authServiceMock: any;
  let authorServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(waitForAsync(() => {
    postsServiceMock = {
      createPost: jasmine.createSpy('createPost').and.returnValue(of({}))
    };

    authServiceMock = {
      isLoggedIn: true
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [
        AddPostComponent,
        CommonModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: PostsService, useValue: postsServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock} ,
        { provide: AuthorService, useValue: authServiceMock}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.postForm).toBeDefined();
    expect(component.postForm.controls['title']).toBeDefined();
    expect(component.postForm.controls['description']).toBeDefined();
    expect(component.postForm.controls['email']).toBeDefined();
    expect(component.postForm.controls['phoneNumber']).toBeDefined();
  });

  it('form should be invalid when empty', () => {
    expect(component.postForm.valid).toBeFalsy();
  });

  it('form should be valid with correct values', () => {
    component.postForm.controls['title'].setValue('Test Title');
    component.postForm.controls['description'].setValue('Test Description');
    component.postForm.controls['email'].setValue('email@gmail.com');
    component.postForm.controls['phoneNumber'].setValue('123456789');
    expect(component.postForm.valid).toBeTruthy();
  });

  it('should call createPost and navigate on success', () => {
    component.postForm.controls['title'].setValue('Test Title');
    component.postForm.controls['description'].setValue('Test Description');
    component.postForm.controls['email'].setValue('email@gmail.com');
    component.postForm.controls['phoneNumber'].setValue('123456789');
    component.addPost();
    expect(postsServiceMock.createPost).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
      authorDetails: {
        email: 'email@gmail.com',
        phoneNumber: '123456789'
      }
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/account']);
  });

  it('should handle error during post creation', () => {
    postsServiceMock.createPost.and.returnValue(throwError('Error'));
    spyOn(console, 'error');
    component.postForm.controls['title'].setValue('Test Title');
    component.postForm.controls['description'].setValue('Test Description');
    component.postForm.controls['email'].setValue('email@gmail.com');
    component.postForm.controls['phoneNumber'].setValue('123456789');
    component.addPost();
    expect(console.error).toHaveBeenCalledWith('Error creating post:', 'Error');
  });

  it('should navigate to home if not logged in', () => {
    authServiceMock.isLoggedIn = false;
    component.ngOnInit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });
});