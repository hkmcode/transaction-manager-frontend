import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcompanyComponent } from './add-subcompany.component';

describe('AddSubcompanyComponent', () => {
  let component: AddSubcompanyComponent;
  let fixture: ComponentFixture<AddSubcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
