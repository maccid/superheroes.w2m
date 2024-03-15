import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IndexGridComponent } from 'src/app/shared/components/index-grid/index-grid.component';

describe('IndexGridComponent', () => {
  let component: IndexGridComponent;
  let fixture: ComponentFixture<IndexGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexGridComponent);
    component = fixture.componentInstance;

    component.fields = [
      { name: 'superhero', label: 'Heroe', titlecase: true },
      { name: 'alter_ego', label: 'Personaje' },
    ];
    
    component.actions = [{ name: 'edit', label: 'Editar' }, { name: 'delete', label: 'Eliminar' }];
    
    component.dataSource = [
      { id: '1', superhero: 'Superman', alter_ego: 'Clark Kent' },
      { id: '2', superhero: 'Spiderman', alter_ego: 'Peter Parker' },
    ];

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
 
  it('Debe contener los datos correctos', () => {
    const matCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(matCards.length).toBe(component.dataSource.length);

    matCards.forEach((matCard, index) => {
      const superheroElement = matCard.query(By.css('mat-card-title')).nativeElement;
      const alterEgoElement = matCard.query(By.css('mat-card-content')).nativeElement;

      expect(superheroElement.textContent.trim()).toBe(component.dataSource[index].superhero);
      expect(alterEgoElement.textContent.trim()).toContain(component.dataSource[index].alter_ego);
    });
  });
  
});
