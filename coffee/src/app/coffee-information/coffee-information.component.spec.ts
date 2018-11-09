import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeInformationComponent } from './coffee-information.component';

describe('CoffeeInformationComponent', () => {
  let component: CoffeeInformationComponent;
  let fixture: ComponentFixture<CoffeeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
