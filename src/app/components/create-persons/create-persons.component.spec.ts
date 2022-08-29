import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonsComponent } from './create-persons.component';

describe('CreatePersonsComponent', () => {
  let component: CreatePersonsComponent;
  let fixture: ComponentFixture<CreatePersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
