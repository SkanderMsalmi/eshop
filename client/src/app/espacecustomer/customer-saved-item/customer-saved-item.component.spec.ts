import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSavedItemComponent } from './customer-saved-item.component';

describe('CustomerSavedItemComponent', () => {
  let component: CustomerSavedItemComponent;
  let fixture: ComponentFixture<CustomerSavedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSavedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSavedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
