import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesPopupComponent } from './likes-popup.component';

describe('LikesPopupComponent', () => {
  let component: LikesPopupComponent;
  let fixture: ComponentFixture<LikesPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikesPopupComponent]
    });
    fixture = TestBed.createComponent(LikesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
