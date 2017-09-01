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
    }, error => {
      this.isAuthenticated = false;
      this.isAuthenticatedErrorMessage = <any>error;
    });

    // submissão de usuário e senha para autenticação
    this.gateProDataServices.authenticate('luiz.silveira', 'fcrrp4').subscribe(response => {
      this.autenthicationAttempt = true;
    }, error => {
      this.autenthicationAttempt = false;
      this.authenticationAttemptErrorMessage = <any>error;
    });

  }

  ngOnChanges() {}

  submit() {
    let formFields: any = {
      solicitante:    'SECRETARIA DA PROMOTORIA DE JUSTI\xc7A DE PARATY',
      principal:      '15926366',
      vinculado:      '16120829',
      tipo:           'rese',
      subtipo:        'ewrwer',
      edificacoes:    [{nome: 'copa'}],
      formacao:       '70',
      servicos:       [{nome: 'copa'}],
      assuntos:       [{nome: 'Da Lei Geral da Copa'}],
      dtElab:         '29/08/2017',
      dtVistoria:     '29/08/2017',
      local:          'local',
      logradouro:     'rua',
      num:            '123',
      complemento:    '123',
      bairro:         'bairro',
      cidade:         'rj',
      cep:            '2244035',
      latitude:       '-22.88756221517449',
      longitude:      '-43.22021484375',
      tecnicos:       [{mat:'00007374', nome:'ADRIANA DE LIMA SILVA'}],
      opiniaoTecnica: 'minha optec'};
    //this.gateProDataServices.postFormData(this.fileToUpload, formFields);
  }

  // propriedades para as quais queremos receber os eventos de edição e carregar JSONs dinamicamente
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // since 'Number' is not available for use on templates...
  toNumber(v: any): number {
    return Number(v);
  }

  ngOnInit() {}

}
