import { TestBed, ComponentFixture } from '@angular/core/testing';

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

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
