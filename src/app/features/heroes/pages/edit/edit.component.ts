import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { Router } from '@angular/router';
import { Hero, Publisher } from '../../models/heroes.interface';
import { HeroesService } from '../../services/heroes.services';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['edit.component.scss'],
})
export class EditComponent implements OnInit {
  heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>('', Validators.required),
    superhero: new FormControl<string>('', Validators.required),
    alter_ego: new FormControl<string>('', Validators.required),
    publisher: new FormControl<string>('', Validators.required),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  publishers: Publisher[] = Object.values(Publisher);
  submitted = false;

  constructor(
    private _actroute: ActivatedRoute,
    private _route: Router,
    private _heroesService: HeroesService,
    private _notifierService: NotifierService,
  ) {}

  ngOnInit(): void {
    const id = this._actroute.snapshot.paramMap.get('id') as string;
    const superheroControl = this.heroForm.get('superhero');

    if (id != null && id != '') {
      this._heroesService.get(id).subscribe((item: Hero) => {
        this.heroForm.get('id')?.disable();
        this.heroForm.setValue(item);       
      });
    }

    superheroControl?.valueChanges.subscribe(() => {
      superheroControl.patchValue(superheroControl.value.toUpperCase(), {
        emitEvent: false,
      });
    });
  }

  get getField(): { [key: string]: AbstractControl } {
    return this.heroForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.heroForm.invalid) {
      return;
    }

    const id = this._actroute.snapshot.paramMap.get('id') as string;

    const http =
      id != null && id != ''
        ? this._heroesService.update(this.heroForm.getRawValue())
        : this._heroesService.create(this.heroForm.getRawValue());

    http.subscribe(() => {
      const type = id != null && id != '' ? 'editado' : 'creado';

      const message = `El heroe ${this.heroForm.value.id} ha sido ${type} correctamente`;

      this._notifierService.openSuccess(message);

      this._route.navigateByUrl('heroes');
    });
  }
}
