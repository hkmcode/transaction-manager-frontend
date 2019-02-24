import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditComponent } from './edit-credit.component';

describe('EditCreditComponent', () => {
  let component: EditCreditComponent;
  let fixture: ComponentFixture<EditCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
