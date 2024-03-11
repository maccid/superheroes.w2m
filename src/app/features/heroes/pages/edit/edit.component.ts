import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';

@Component({
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrls: ['edit.component.scss']
})
export class EditComponent {

  id: string = '';
  //form!: FormGroup;

  //userFormGroup: ModelFormGroup<UserModel>;

  form = this.builder.group({
    id: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required)
  })

  constructor(
    private builder: FormBuilder, 
    private router: Router,
    private actroute: ActivatedRoute,
    private heroesService: HeroesService) { }

  ngOnInit(): void {

    this.id = this.actroute.snapshot.paramMap.get('id') as string;

  

    
    if (this.id != null && this.id != '') {
      //this.pagetitle = 'Edit customer';
      this.form.controls.id.disable();
      /*
      this.store.dispatch(getCustomer({code:this.editcode}))
      this.store.select(getEditdata).subscribe(item => {
        this.myform.setValue({ code: item.code, name: item.name, email: item.email, phone: item.phone });
      });*/
    }
/*

interface HeroForm {
    id: FormControl<number | null>;
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    createdAt: FormControl<Date | null>;
  }
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
    */
    /*this.heroesService.getHeroe().subscribe(heroes => {

      this.dataSource.set(heroes);
      this.heroes$ = new MatTableDataSource(heroes); 
    }); */

    
  }


  submit(){
    
    console.log(this.form.value);
    //this.form.getRawValue()
    /*
    this.heroesService.create(this.form.value).subscribe((res:any) => {
         console.log('Post created successfully!');
         this.router.navigateByUrl('heroes');
    })
    */
  }

 }
