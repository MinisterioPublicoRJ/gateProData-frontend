// libs
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Injector } from '@angular/core';
import { Config, RouterExtensions } from '../../../modules/core/index';

@Component({
  moduleId: module.id,
  selector: 'mp-home',
  templateUrl: 'mp-home.component.html',
  styleUrls: ['mp-home.component.css']
})
export class MPHomeComponent {

  cars: SelectItem[];
  selectedCar: string;

  constructor(private injector: Injector, public routerext: RouterExtensions) {
    this.cars = [];
    this.cars.push({label: 'Audi', value: 'Audi'});
    this.cars.push({label: 'BMW', value: 'BMW'});
    this.cars.push({label: 'Fiat', value: 'Fiat'});
    this.cars.push({label: 'Fore', value: 'Ford'});
    this.cars.push({label: 'Honda', value: 'Honda'});
    this.cars.push({label: 'Jaguar', value: 'Jaguar'});
    this.cars.push({label: 'Mercedes', value: 'Mercedes'});
    this.cars.push({label: 'Renault', value: 'Renault'});
    this.cars.push({label: 'VW', value: 'VW'});
    this.cars.push({label: 'Volvo', value: 'Volvo'});
  }

}
