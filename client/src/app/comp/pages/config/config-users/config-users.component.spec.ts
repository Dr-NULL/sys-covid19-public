import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUsersComponent } from './config-users.component';

describe('ConfigUsersComponent', () => {
  let component: ConfigUsersComponent;
  let fixture: ComponentFixture<ConfigUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
