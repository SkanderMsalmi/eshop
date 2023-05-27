import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStatusComponent } from './dialog-status.component';

describe('DialogStatusComponent', () => {
  let component: DialogStatusComponent;
  let fixture: ComponentFixture<DialogStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
