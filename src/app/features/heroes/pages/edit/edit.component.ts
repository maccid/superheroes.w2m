import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['edit.component.scss'],
})
export class EditComponent implements OnInit {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _route: Router = inject(Router);
  private readonly _heroesService: HeroesService = inject(HeroesService);
  private readonly _notifierService: NotifierService = inject(NotifierService);
  private readonly _translate: TranslateService = inject(TranslateService);

  readonly heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    superhero: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    alter_ego: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    publisher: new FormControl<string>('', Validators.required),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  readonly publishers: Publisher[] = Object.values(Publisher);

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id') as string;
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
    if (this.heroForm.invalid) return;

    const id = this._activatedRoute.snapshot.paramMap.get('id') as string;

    const http =
      id != null && id != ''
        ? this._heroesService.update(this.heroForm.getRawValue())
        : this._heroesService.create(this.heroForm.getRawValue());

    http.subscribe(() => {
      const type = id != null && id != '' ? 'add' : 'edit';

      const message = this._translate.instant('notify.hero.' + type, {
        id: this.heroForm.get('id')?.value,
      });

      this._notifierService.openSuccess(message);

      this._route.navigateByUrl('heroes');
    });
  }
}
