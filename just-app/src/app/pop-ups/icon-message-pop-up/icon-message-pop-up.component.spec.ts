import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMessagePopUpComponent } from './icon-message-pop-up.component';

describe('IconMessagePopUpComponent', () => {
  let component: IconMessagePopUpComponent;
  let fixture: ComponentFixture<IconMessagePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconMessagePopUpComponent]
    });
    fixture = TestBed.createComponent(IconMessagePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
