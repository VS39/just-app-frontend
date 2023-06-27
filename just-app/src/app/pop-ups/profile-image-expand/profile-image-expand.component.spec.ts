import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageExpandComponent } from './profile-image-expand.component';

describe('ProfileImageExpandComponent', () => {
  let component: ProfileImageExpandComponent;
  let fixture: ComponentFixture<ProfileImageExpandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileImageExpandComponent]
    });
    fixture = TestBed.createComponent(ProfileImageExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
