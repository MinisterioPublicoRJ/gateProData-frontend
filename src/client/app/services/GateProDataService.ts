/** <pre>
 * GateProDataService
 * ==================
 * (created by luiz on Ter, ago, 15, 2017)
 *
 * Consulta serviços do backend para carregar dados dinâmicos
 *
 * @see RelatedClass(es)
 * @author luiz
 */

import { Injectable } from '@angular/core';
import {
         Http,
         Headers,
         RequestOptions,
         Response        } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../../../modules/core/index';
import { Analytics, AnalyticsService } from '../../../../modules/analytics/index';

// module
import { IRankings }       from './IRankings';
import { IDadosMunicipio } from './IDadosMunicipio';

/** especificação dos backends disponíveis */
interface IIAvailableBackendServices {

  // serviços estáticos
  /////////////////////

  listaITs:            string;
  listaSolicitantes:   string;
  listaTipos:          string;
  listaEspecialidades: string;
  listaAssuntos:       string;
  listaEdificacoes:    string;
  listaTecnicos:       string;

  // serviços parametrizados
  //////////////////////////

  /** parâmetro: mprj */
  verificaMPRJ:            string;

  /** parâmetro: mprj */
  listaMPRJsVinculados:    string;

  /** parâmetro: tipoId */
  listaSubTipos:           string;

  /** parâmetro: formaçãoId */
  listaServicos:           string;

  /** parâmetro: itId */
  downloadPDF:             string;

}

@Injectable()
export class GateProDataServices {

  private testServiceURLsPrefix: string = `${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/dados/testes/`;
  private testServiceURLsSuffix: string = '.json';
  private testServiceURLs: IIAvailableBackendServices = {
    listaITs:                `${this.testServiceURLsPrefix}listaIts${this.testServiceURLsSuffix}`,
    listaSolicitantes:       `${this.testServiceURLsPrefix}listaSolicitantes${this.testServiceURLsSuffix}`,
    listaTipos:              `${this.testServiceURLsPrefix}listaTipos${this.testServiceURLsSuffix}`,
    listaEspecialidades:     `${this.testServiceURLsPrefix}listaEspecialidades${this.testServiceURLsSuffix}`,
    listaAssuntos:           `${this.testServiceURLsPrefix}listaAssuntos${this.testServiceURLsSuffix}`,
    listaEdificacoes:        `${this.testServiceURLsPrefix}listaEdificacoes${this.testServiceURLsSuffix}`,
    listaTecnicos:           `${this.testServiceURLsPrefix}listaTecnicos${this.testServiceURLsSuffix}`,
    verificaMPRJ:            `${this.testServiceURLsPrefix}verificaMPRJ_#{parameters}${this.testServiceURLsSuffix}`,
    listaMPRJsVinculados:    `${this.testServiceURLsPrefix}listaMPRJs_#{parameters}${this.testServiceURLsSuffix}`,
    listaSubTipos:           `${this.testServiceURLsPrefix}listaSubTipos_#{parameters}${this.testServiceURLsSuffix}`,
    listaServicos:           `${this.testServiceURLsPrefix}listaServicos_#{parameters}${this.testServiceURLsSuffix}`,
    downloadPDF:             `${this.testServiceURLsPrefix}downloadPDF_#{parameters}.pdf`,
  };

  // private productionServiceURLs: IIAvailableBackendServices = {
  //
  // };

  private serviceURLs: IIAvailableBackendServices;

  constructor(private http: Http) {
    this.serviceURLs = this.testServiceURLs;
  }

  public fetchRankings(): Observable < IRankings[] > {
    return this.http.get(this.rankingsJsonFileURL)
      .map((response: Response) => {
        return < IRankings[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Erro no servidor ao resgatar rankings'));
  }

  public fetchDadosMunicipios(): Observable < IDadosMunicipio[] > {
    return this.http.get(this.dadosMunicipiosJsonFileURL)
      .map((response: Response) => {
        return < IDadosMunicipio[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || 'Erro no servidor ao resgatar dados dos municípios'));
  }

}
