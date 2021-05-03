import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecipientComponent } from './list-recipient.component';

describe('ListRecipientComponent', () => {
  let component: ListRecipientComponent;
  let fixture: ComponentFixture<ListRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
