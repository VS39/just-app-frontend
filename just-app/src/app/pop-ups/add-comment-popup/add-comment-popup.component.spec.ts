import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentPopupComponent } from './add-comment-popup.component';

describe('AddCommentPopupComponent', () => {
  let component: AddCommentPopupComponent;
  let fixture: ComponentFixture<AddCommentPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommentPopupComponent]
    });
    fixture = TestBed.createComponent(AddCommentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
