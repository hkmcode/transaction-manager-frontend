import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChequeComponent } from './manage-cheque.component';

describe('ManageChequeComponent', () => {
  let component: ManageChequeComponent;
  let fixture: ComponentFixture<ManageChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
