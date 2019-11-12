import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FseditComponent } from './fsedit.component';

describe('FseditComponent', () => {
  let component: FseditComponent;
  let fixture: ComponentFixture<FseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
