import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ViewModeComponent } from 'src/app/shared/components/view-mode/view-mode.component';

describe('ViewModeComponent', () => {
  let component: ViewModeComponent;
  let fixture: ComponentFixture<ViewModeComponent>;
  let emitSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewModeComponent, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModeComponent);
    component = fixture.componentInstance;

    emitSpy = spyOn(component.mode, 'emit').and.callThrough();

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cambiar modo de vista', () => {
    component.onViewChange('grid');
    expect(emitSpy).toHaveBeenCalledWith('grid');

    component.onViewChange('table');
    expect(emitSpy).toHaveBeenCalledWith('table');

    component.onViewChange('grid');
    expect(emitSpy).toHaveBeenCalledWith('grid');
  });
});
