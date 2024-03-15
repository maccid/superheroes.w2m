import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IndexListComponent } from 'src/app/shared/components/index-list/index-list.component';

describe('IndexListComponent', () => {
  let component: IndexListComponent;
  let fixture: ComponentFixture<IndexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexListComponent);
    component = fixture.componentInstance;

    component.fields = [
      { name: 'superhero', label: 'Heroe', flex: 2, titlecase: true },
      { name: 'alter_ego', label: 'Personaje', flex: 2 },
      { name: 'publisher', label: 'Editorial', flex: 2, hide: ['sm'] },
      {name: 'first_appearance', label: 'Estreno', flex: 2, hide: ['sm', 'md'] },
    ];

    component.actions = [
      { name: 'edit', label: 'Editar' },
      { name: 'delete', label: 'Eliminar' },
    ];

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe comprobar el numero de columnas de la tabla dinamica', () => {
    const matTable = fixture.debugElement.query(By.css('mat-table')).nativeElement;
    const columns = matTable.querySelectorAll('mat-header-cell');

    expect(columns.length).toBe(component.fields.length + 1);
  });

});
