import { TestBed, ComponentFixture } from '@angular/core/testing';

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

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
