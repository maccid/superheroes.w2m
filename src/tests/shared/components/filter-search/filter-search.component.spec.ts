import { TestBed, ComponentFixture } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FilterSearchComponent } from 'src/app/shared/components/filter-search/filter-search.component';

describe('FilterSearchComponent', () => {
  let component: FilterSearchComponent;
  let fixture: ComponentFixture<FilterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FilterSearchComponent],
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
    spyOn(component.filterText, 'emit');

    const searchText: string = 'test';
    const input = fixture.debugElement.nativeElement.querySelector('input');

    input.value = searchText;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.filterText.emit).toHaveBeenCalledWith(searchText);
  });

  it('Debe borrar texto y emitir evento con texto vacio cuando pulsa botón borrar', () => {
    spyOn(component.filterText, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.filterValue).toEqual('');
    expect(component.filterText.emit).toHaveBeenCalledWith('');
  });
});
