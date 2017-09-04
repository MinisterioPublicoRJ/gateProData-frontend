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

// interfaces
import { IITs } from '../../../services/IITs';



@Component({
  moduleId: module.id,
  selector: 'mp-lista-its',
  templateUrl: 'mp-lista-its.component.html',
  styleUrls: ['mp-lista-its.component.css']
})
export class MPListaITsComponent {

  // autenticação
  isAuthenticated:       boolean;
  autenthicationAttempt: boolean;

  // dados do backend
  listaITs:            IITs[] = [];

  // mensagens de erro do backend
  isAuthenticatedErrorMessage:       string;
  authenticationAttemptErrorMessage: string;
  listaITsErrorMessage:              string;

  // itens selecionados das listas;
  itId:                       string;


  constructor(private injector: Injector,
              public routerext: RouterExtensions,
              private gateProDataServices: GateProDataServices) {

    // consulta de autenticação
    this.gateProDataServices.isAuthenticated().subscribe(response => {
      this.isAuthenticated = response;
    }, error => {
      this.isAuthenticated = false;
      this.isAuthenticatedErrorMessage = <any>error;

      // redireciona
      if (!this.isAuthenticated) {
        this.routerext.navigate(['/login'], {
          transition: {
            duration: 1000,
            name: 'slideTop',
          }
        });
      }

    });

    // listaITs
    this.gateProDataServices.fetchListaITs().subscribe(response => {
      response = response.sort((e1, e2) => e2.dk < e1.dk ? 1 : -1);
      this.listaITs = response;
      // for (let tipo of response) {
      //   this.listaTipos.push({label: tipo.nome, value: tipo.id});
      // }
      this.ngOnChanges();
    }, error => this.listaITsErrorMessage = <any>error);

  }

  ngOnChanges() {}

  submit() {
  }

  // propriedades para as quais queremos receber os eventos de edição e carregar JSONs dinamicamente
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // since 'Number' is not available for use on templates...
  toNumber(v: any): number {
    return Number(v);
  }

  formatIT(itDk: string): string {
    return itDk.length === 9 ? +itDk.substring(4) + '/' + itDk.substring(0, 4) : itDk;
  }

  stringToDate(date: string): Date {
    return new Date(date);
  }

  ngOnInit() {}

}
