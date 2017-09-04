// libs
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Injector } from '@angular/core';
import { Config, RouterExtensions } from '../../../modules/core/index';

import { SelectItem,
         GMapModule  } from 'primeng/primeng';

// services
import { GateProDataServices } from '../../../services/GateProDataServices';


@Component({
  moduleId: module.id,
  selector: 'mp-home',
  templateUrl: 'mp-home.component.html',
  styleUrls: ['mp-home.component.css']
})
export class MPHomeComponent {

  // autenticação
  isAuthenticated:       boolean;
  autenthicationAttempt: boolean;

  // mensagens de erro do backend
  isAuthenticatedErrorMessage:       string;
  authenticationAttemptErrorMessage: string;


  constructor(private injector: Injector,
              public routerext: RouterExtensions,
              private gateProDataServices: GateProDataServices) {

    // consulta de autenticação
    this.gateProDataServices.isAuthenticated().subscribe(response => {
      this.isAuthenticated = response;

      // redireciona para lista de its
      if (this.isAuthenticated) {
        this.routerext.navigate(['/listaITs'], {
          transition: {
            duration: 1000,
            name: 'slideTop',
          }
        });
      }

    }, error => {
      this.isAuthenticated = false;
      this.isAuthenticatedErrorMessage = <any>error;

      // redireciona para login
      if (!this.isAuthenticated) {
        this.routerext.navigate(['/login'], {
          transition: {
            duration: 1000,
            name: 'slideTop',
          }
        });
      }

    });

  }

  ngOnChanges() {}

  ngOnInit() {}

}
