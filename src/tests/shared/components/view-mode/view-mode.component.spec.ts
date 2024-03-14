import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ViewModeComponent } from 'src/app/shared/components/view-mode/view-mode.component';

describe('ViewModeComponent', () => {
  let component: ViewModeComponent;
  let fixture: ComponentFixture<ViewModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewModeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
