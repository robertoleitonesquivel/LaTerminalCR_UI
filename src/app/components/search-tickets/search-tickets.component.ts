import { TicketParam } from './../../core/interfaces/ticketParam.interface';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, map, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cities } from '../../core/interfaces/cities.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CitiesService } from '../../core/services/cities.service';
import { AlertsService } from '../../core/services/alerts.service';


@Component({
  selector: 'app-search-tickets',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    AsyncPipe,
    CommonModule
  ],

  templateUrl: './search-tickets.component.html',
  styleUrl: './search-tickets.component.scss'
})
export class SearchTicketsComponent implements OnInit, OnDestroy {


  @Input() isList: boolean = false;
  @Input() data!: TicketParam;
  @Input() cities: Cities[] = [];
  @Output() search = new EventEmitter<TicketParam>();

  private activateRoute = inject(ActivatedRoute);
  private route = inject(Router);
  private fb = inject(FormBuilder);
  private citiesSvc = inject(CitiesService);
  private alertSvc = inject(AlertsService);


  suscription$ = new Subject();
  form!: FormGroup;
  listCities: Cities[] = [];
  listCitiesFilter!: Observable<Cities[]>;
  listCitiesFilterTo!: Observable<Cities[]>;

  ngOnDestroy(): void {
    this.suscription$?.next('');
    this.suscription$?.complete();
  }


  ngOnInit(): void {
    this.onLoad();
  }

  private onLoad(): void {
    this.form = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      affiliateCode: 'DDE',
      travelDate: [new Date(), [Validators.required]]
    });

    if (this.isList) {
      this.form.patchValue(this.data);
      this.listCities = this.cities;
      this.form.controls['from'].setValue(this.listCities.find(x => x.id === this.data.from));
      this.form.controls['to'].setValue(this.listCities.find(x => x.id === this.data.to));
      this.filterCities();
    } else {
      this.loadInitial();
    }

  }

  private loadInitial(): void {
    this.listCities = this.activateRoute.snapshot.data['TicketResolve'] as Cities[];
    this.filterCities();
  }

  private filterCities(): void {
    this.listCitiesFilter = this.form.controls['from'].valueChanges.pipe(
      startWith(''),
      map((value: string | Cities) => value instanceof Object ? value.name : value),
      map((value: string) => this.listCities
        .filter(option => option.name.toLowerCase().includes(value?.toLocaleLowerCase() || ''))
        .slice(0, 10)
      )
    );

    this.listCitiesFilterTo = this.form.controls['to'].valueChanges.pipe(
      startWith(''),
      map((value: string | Cities) => value instanceof Object ? value.name : value),
      map((value: string) => this.listCities
        .filter(option => option.name.toLowerCase().includes(value?.toLocaleLowerCase() || ''))
        .slice(0, 10)
      )
    );
  }

  public displayFn(_citie: Cities): string {
    return _citie.name;
  }

  public searchTickets(): void {
    let data = this.form.value;
    localStorage.setItem('origen', data.from.name);
    localStorage.setItem('destino', data.to.name);
    let travelDateFormatted = data.travelDate;
    if(typeof travelDateFormatted !== 'string'){
      travelDateFormatted = `${data.travelDate.getFullYear()}-${(data.travelDate.getMonth() + 1).toString().padStart(2, '0')}-${data.travelDate.getDate().toString().padStart(2, '0')}`;
    }

    if (this.isList) {
      this.search.emit({
        from: data.from?.id,
        to: data.to?.id,
        affiliateCode: data.affiliateCode,
        travelDate: travelDateFormatted
      } as TicketParam);
    } else {

      this.route.navigate(['list-tickets'], {
        queryParams: {
          from: data.from?.id,
          to: data.to?.id,
          affiliateCode: data.affiliateCode,
          travelDate: travelDateFormatted
        }
      })
    }


  }
  public getDetailCitie(_property: string): void {
    let data = this.form.controls[_property].value as Cities;
    this.citiesSvc.GetDetailCities(data.id).subscribe({
      next: (result) => {
        if ((result.state !== 'SP') && (result.state !== 'PR')) {
          this.form.controls[_property].setValue(null);
          this.alertSvc.Info('Solo se permiten las ciudades de São Paulo y Paraná');
        }
      },
      error: (error) => {
        this.alertSvc.Error(error);
      }
    });
  }

}
