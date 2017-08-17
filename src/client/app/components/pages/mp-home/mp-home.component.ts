// libs
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Injector } from '@angular/core';
import { Config, RouterExtensions } from '../../../modules/core/index';

import {SelectItem} from 'primeng/primeng';

// services
import { GateProDataServices } from '../../../services/GateProDataService';

interface ExpandableSelectItem extends SelectItem {
  category: string;
}


@Component({
  moduleId: module.id,
  selector: 'mp-home',
  templateUrl: 'mp-home.component.html',
  styleUrls: ['mp-home.component.css']
})
export class MPHomeComponent {

  // dados do backend para as listas estáticas
  //listaITs:            IITs[];
  listaSolicitantes:   ExpandableSelectItem[];
  listaTipos:          SelectItem[];
  listaEspecialidades: SelectItem[];
  listaAssuntos:       SelectItem[];
  listaEdificacoes:    SelectItem[];
  listaTecnicos:       SelectItem[];

  // dados do backend para as listas dinâmicas
  listaSubTipos: SelectItem[];
  listaServicos: SelectItem[];

  // mensagens de erro do backend
  listaITsErrorMessage:            string;
  listaSolicitantesErrorMessage:   string;
  listaTiposErrorMessage:          string;
  listaEspecialidadesErrorMessage: string;
  listaAssuntosErrorMessage:       string;
  listaEdificacoesErrorMessage:    string;
  listaTecnicosErrorMessage:       string;
  listaSubTiposErrorMessage:       string;
  listaServicosErrorMessage:       string;


  // itens selecionados das listas;
  itId:                       string;
  solicitanteId:              string;
  _tipoIdOrNewTipoText:       string;   // editable drop down, com evento de edição
  subTipoIdOrNewSubTipoText:  string;   // editable drop down, sem eventos
  _especialidadeId:           string;
  servicoId:                  string;
  assuntoId:                  string;
  edificacaoId:               string;
  tecnicoId:                  string;


  constructor(private injector: Injector,
              public routerext: RouterExtensions,
              private gateProDataServices: GateProDataServices) {

    // listaSolicitantes
    this.gateProDataServices.fetchListaSolicitantes().subscribe(response => {
      response = response.sort((e1, e2) => ((e2.craai < e1.craai) || ((e2.craai === e1.craai) && (e2.nome < e1.nome))) ? 1 : -1);
      //response = response.sort((e1, e2) => ((e2.craai < e1.craai) || ((e2.craai === e1.craai) && (e1.craai === e1.nome))) ? 1 : ( ((e2.craai === e1.craai) && (e2.nome < e1.nome) ) ? 1 : -1));
      // response = response.sort((e1, e2) => {
      //   if (e2.craai < e1.craai) {
      //     return 1;
      //   } else if (e2.craai === e1.craai) {
      //     if (e1.craai === e1.nome) {
      //       return 1;
      //     } else if (e2.craai === e2.nome) {
      //       return 0;
      //     } else if (e2.nome <= e1.nome) {
      //       return 1;
      //     }
      //   }
      //   return -1;
      // });
      this.listaSolicitantes = [];
      for (let solicitante of response) {
        this.listaSolicitantes.push({label: solicitante.nome, value: solicitante.id, category: solicitante.craai});
      }
      this.ngOnChanges();
    }, error => this.listaSolicitantesErrorMessage = <any>error);

    // listaTipos
    this.gateProDataServices.fetchListaTipos().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaTipos = [];
      for (let tipo of response) {
        this.listaTipos.push({label: tipo.nome, value: tipo.id});
      }
      this.ngOnChanges();
    }, error => this.listaTiposErrorMessage = <any>error);

    // listaEspecialidades
    this.gateProDataServices.fetchListaEspecialidades().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaEspecialidades = [];
      for (let especialidade of response) {
        this.listaEspecialidades.push({label: especialidade.nome, value: especialidade.id});
      }
      this.ngOnChanges();
    }, error => this.listaEspecialidadesErrorMessage = <any>error);

    // listaAssuntos
    this.gateProDataServices.fetchListaAssuntos().subscribe(response => {
      response = response.sort((e1, e2) => e2.a < e1.a ? 1 : -1);
      this.listaAssuntos = [];
      for (let assunto of response) {
        this.listaAssuntos.push({label: assunto.a, value: assunto.c});
      }
      this.ngOnChanges();
    }, error => this.listaAssuntosErrorMessage = <any>error);

    // listaEdificacoes
    this.gateProDataServices.fetchListaEdificacoes().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaEdificacoes = [];
      for (let edificacao of response) {
        this.listaEdificacoes.push({label: edificacao.nome, value: edificacao.nome});
      }
      this.ngOnChanges();
    }, error => this.listaEdificacoesErrorMessage = <any>error);

    // listaTecnicos
    this.gateProDataServices.fetchListaTecnicos().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaTecnicos = [{label: 'Técnico Inexistente', value: ''}];
      for (let tecnico of response) {
        this.listaTecnicos.push({label: tecnico.nome, value: tecnico.nome});
      }
      this.ngOnChanges();
    }, error => this.listaTecnicosErrorMessage = <any>error);

  }

  ngOnChanges() {
    // if (this.listaSolicitantes) {
    //   this.listaSolicitantes = this.listaSolicitantes.sort((e1, e2) => ((e2.craai > e1.craai) || ((e2.craai === e1.craai) && (e2.nome > e1.nome))) ? 1 : -1);
    // }
  }

  // propriedades para as quais queremos receber os eventos de edição e carregar JSONs dinamicamente
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // tipo
  get tipoIdOrNewTipoText(): string {
    return this._tipoIdOrNewTipoText;
  }
  set tipoIdOrNewTipoText(tipoIdOrNewTipoText: string) {
    this._tipoIdOrNewTipoText = tipoIdOrNewTipoText;
    let tipoId: number = Number(tipoIdOrNewTipoText)
    if (tipoId) {
      this.gateProDataServices.fetchListaSubTipos(tipoId).subscribe(response => {
        response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
        this.listaSubTipos = [];
        for (let subTipo of response) {
          this.listaSubTipos.push({label: subTipo.nome, value: subTipo.nome});
        }
        this.ngOnChanges();
      }, error => this.listaSubTiposErrorMessage = <any>error);
    }
  }

  // especialidade (formação)
  get especialidadeId(): string {
    return this._especialidadeId;
  }
  set especialidadeId(especialidadeId: string) {
    this._especialidadeId = especialidadeId;
    if (Number(especialidadeId)) {
      this.gateProDataServices.fetchListaServicos(Number(especialidadeId)).subscribe(response => {
        response = response.sort((e1, e2) => e2.servico < e1.servico ? 1 : -1);
        this.listaServicos = [];
        for (let servico of response) {
          this.listaServicos.push({label: servico.servico, value: servico.id});
        }
        this.ngOnChanges();
      }, error => this.listaServicosErrorMessage = <any>error);
    }
  }

  // since 'Number' is not available for use on templates...
  toNumber(v: any): number {
    return Number(v);
  }

}
