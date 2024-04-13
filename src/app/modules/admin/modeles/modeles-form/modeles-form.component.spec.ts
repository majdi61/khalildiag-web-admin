import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelesFormComponent } from './modeles-form.component';

describe('ModelesFormComponent', () => {
  let component: ModelesFormComponent;
  let fixture: ComponentFixture<ModelesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
