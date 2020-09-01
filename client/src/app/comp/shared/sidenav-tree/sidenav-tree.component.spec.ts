import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavTreeComponent } from './sidenav-tree.component';

describe('SidenavTreeComponent', () => {
  let component: SidenavTreeComponent;
  let fixture: ComponentFixture<SidenavTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
