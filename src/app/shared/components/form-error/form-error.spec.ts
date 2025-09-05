import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormError } from './form-error';

describe('FormError', () => {
  let component: SharedFormError;
  let fixture: ComponentFixture<SharedFormError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFormError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFormError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
