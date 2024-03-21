import { TestBed, ComponentFixture } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { FilterSearchComponent } from 'src/app/shared/components/filter-search/filter-search.component';

describe('FilterSearchComponent', () => {
  let component: FilterSearchComponent;
  let fixture: ComponentFixture<FilterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FilterSearchComponent,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe emitir evento cuando cambia el texto', () => {
    spyOn(component.search, 'emit');

    const filterValue: string = 'Batman';
    const input = fixture.debugElement.nativeElement.querySelector('input');

    input.value = filterValue;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith(filterValue);
  });

  it('Debe borrar texto y emitir evento con texto vacio cuando pulsa botón borrar', () => {
    spyOn(component.search, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    if (button) {
      button.click();
      fixture.detectChanges();

      expect(component.filterValue).toEqual('');
      expect(component.search.emit).toHaveBeenCalledWith('');
    }

    expect().nothing();
  });
});
