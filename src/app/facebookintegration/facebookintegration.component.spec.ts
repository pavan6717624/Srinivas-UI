import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookintegrationComponent } from './facebookintegration.component';

describe('FacebookintegrationComponent', () => {
  let component: FacebookintegrationComponent;
  let fixture: ComponentFixture<FacebookintegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookintegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookintegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
