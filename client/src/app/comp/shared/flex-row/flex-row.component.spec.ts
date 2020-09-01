import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexRowComponent } from './flex-row.component';

describe('FlexRowComponent', () => {
  let component: FlexRowComponent;
  let fixture: ComponentFixture<FlexRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
