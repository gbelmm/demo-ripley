import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransfersComponent } from './new-transfers.component';

describe('NewTransfersComponent', () => {
  let component: NewTransfersComponent;
  let fixture: ComponentFixture<NewTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
