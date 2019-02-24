import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChequeComponent } from './edit-cheque.component';

describe('EditChequeComponent', () => {
  let component: EditChequeComponent;
  let fixture: ComponentFixture<EditChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
