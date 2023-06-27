import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfilePostsComponent } from './show-profile-posts.component';

describe('ShowProfilePostsComponent', () => {
  let component: ShowProfilePostsComponent;
  let fixture: ComponentFixture<ShowProfilePostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProfilePostsComponent]
    });
    fixture = TestBed.createComponent(ShowProfilePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
