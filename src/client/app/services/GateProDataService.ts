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
import { Config } from '../modules/core/index';
import { Analytics, AnalyticsService } from '../modules/analytics/index';

// module
import { IITs }            from './IITs';
import { ISolicitantes }   from './ISolicitantes';
import { ITipos }          from './ITipos';
import { ISubTipos }       from './ISubTipos';
import { IEspecialidades } from './IEspecialidades';
import { IAssuntos }       from './IAssuntos';
import { IEdificacoes }    from './IEdificacoes';
import { ITecnicos }       from './ITecnicos';

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

  public fetchListaITs(): Observable < IITs[] > {
    let serviceName: string = 'listaITs';
    let url:         string = this.serviceURLs.listaITs;
    return this.http.get(url)
      .map((response: Response) => {
        return < IITs[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaSolicitantes(): Observable < ISolicitantes[] > {
    let serviceName: string = 'listaSolicitantes';
    let url:         string = this.serviceURLs.listaSolicitantes;
    return this.http.get(url)
      .map((response: Response) => {
        return < ISolicitantes[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaTipos(): Observable < ITipos[] > {
    let serviceName: string = 'listaTipos';
    let url:         string = this.serviceURLs.listaTipos;
    return this.http.get(url)
      .map((response: Response) => {
        return < ITipos[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaSubTipos(idTipo: number): Observable < ITipos[] > {
    let serviceName: string = 'listaSubTipos';
    let url:         string = this.serviceURLs.listaSubTipos.replace('#{parameters}', idTipo);
    return this.http.get(url)
      .map((response: Response) => {
        return < ISubTipos[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaEspecialidades(): Observable < IEspecialidades[] > {
    let serviceName: string = 'listaEspecialidades';
    let url:         string = this.serviceURLs.listaEspecialidades;
    return this.http.get(url)
      .map((response: Response) => {
        return < IEspecialidades[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaAssuntos(): Observable < IAssuntos[] > {
    let serviceName: string = 'listaAssuntos';
    let url:         string = this.serviceURLs.listaAssuntos;
    return this.http.get(url)
      .map((response: Response) => {
        return < IAssuntos[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaEdificacoes(): Observable < IEdificacoes[] > {
    let serviceName: string = 'listaEdificacoes';
    let url:         string = this.serviceURLs.listaEdificacoes;
    return this.http.get(url)
      .map((response: Response) => {
        return < IEdificacoes[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaTecnicos(): Observable < ITecnicos[] > {
    let serviceName: string = 'listaTecnicos';
    let url:         string = this.serviceURLs.listaTecnicos;
    return this.http.get(url)
      .map((response: Response) => {
        return < ITecnicos[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  private getErrorMessage(serviceName: string, url: string) {
    return `Erro ao resgatar '${serviceName}' de '${url}'`;
  }

}
