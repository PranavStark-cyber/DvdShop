import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMoviesComponent } from './customer-movies.component';

describe('CustomerMoviesComponent', () => {
  let component: CustomerMoviesComponent;
  let fixture: ComponentFixture<CustomerMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
