// libs
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Injector } from '@angular/core';
import { Config, RouterExtensions } from '../../../modules/core/index';

import { SelectItem,
         GMapModule  } from 'primeng/primeng';

// services
import { GateProDataServices } from '../../../services/GateProDataService';


@Component({
  moduleId: module.id,
  selector: 'mp-login',
  templateUrl: 'mp-login.component.html',
  styleUrls: ['mp-login.component.css']
})
export class MPLoginComponent {

  // autenticação
  isAuthenticated:         boolean;
  autenthicationAttempted: boolean = false;
  isAuthenticating:        boolean;   // true enquanto estiver aguardando resultado

  // mensagens de erro do backend
  isAuthenticatedErrorMessage:         string;
  authenticationAttemptedErrorMessage: string;

  // campos
  username: string;
  password: string;


  constructor(private injector: Injector,
              public routerext: RouterExtensions,
              private gateProDataServices: GateProDataServices) {

    // consulta de autenticação
    this.gateProDataServices.isAuthenticated().subscribe(response => {
      this.isAuthenticated = response;
    }, error => {
      this.isAuthenticated = false;
      this.isAuthenticatedErrorMessage = <any>error;
    });

  }

  ngOnChanges() {}

  submit() {
    this.isAuthenticating = true;
    // submissão de usuário e senha para autenticação
    this.gateProDataServices.authenticate(this.username, this.password).subscribe(response => {
      this.autenthicationAttempted = true;
      this.isAuthenticated         = true;
      this.isAuthenticating        = false;

      // redireciona
      this.routerext.navigate(['cadastra-it'], {
        transition: {
          duration: 1000,
          name: 'slideTop',
        }
      });

    }, error => {
      this.autenthicationAttempted = true;
      this.isAuthenticated         = false;
      this.isAuthenticating        = false;
      this.authenticationAttemptedErrorMessage = <any>error;
    });
  }

  // propriedades para as quais queremos receber os eventos de edição e carregar JSONs dinamicamente
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // since 'Number' is not available for use on templates...
  toNumber(v: any): number {
    return Number(v);
  }

  ngOnInit() {}

}
