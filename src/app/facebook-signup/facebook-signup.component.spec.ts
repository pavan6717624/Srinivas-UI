import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookSignupComponent } from './facebook-signup.component';

describe('FacebookSignupComponent', () => {
  let component: FacebookSignupComponent;
  let fixture: ComponentFixture<FacebookSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
