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
import { IMPRJDocuDK }     from './IMPRJDocuDK';
import { IMPRJ }           from './IMPRJ';
import { ISolicitantes }   from './ISolicitantes';
import { ITipos }          from './ITipos';
import { ISubTipos }       from './ISubTipos';
import { IEspecialidades } from './IEspecialidades';
import { IServicos }       from './IServicos';
import { IAssuntos }       from './IAssuntos';
import { IEdificacoes }    from './IEdificacoes';
import { ITecnicos }       from './ITecnicos';

/** especificação dos backends disponíveis */
interface IIAvailableBackendServices {

  // autenticação
  ///////////////

  isAuthenticated: string;
  authenticate:    string;  // parâmetros: usuário/senha codificada

  // serviços estáticos
  /////////////////////

  listaITs:            string;
  listaSolicitantes:   string;
  listaTipos:          string;
  listaEspecialidades: string;  // também chamado de "formação"
  listaAssuntos:       string;
  listaEdificacoes:    string;
  listaTecnicos:       string;

  // serviços parametrizados
  //////////////////////////

  /** parâmetro: mprj */
  verificaMPRJ:         string;

  /** parâmetro: mprj */
  listaMPRJsVinculados: string;

  /** parâmetro: tipoId */
  listaSubTipos:        string;

  /** parâmetro: especialidadeId (ou formaçãoId) */
  listaServicos:        string;

  /** parâmetro: itId */
  downloadPDF:          string;

  /** post do cadastro */
  formPost:             string;

}

@Injectable()
export class GateProDataServices {

  private testServiceURLsPrefix: string = `${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/dados/testes/`;
  private testServiceURLsSuffix: string = '.json';
  private testServiceURLs: IIAvailableBackendServices = {
    isAuthenticated:      `${this.testServiceURLsPrefix}authenticate${this.testServiceURLsSuffix}`,
    authenticate:         `/gate/api/authentication?password=#{senhaCodificada}&username=#{usuario}`,
    formPost:             `/gate/api/candidate`,
    listaITs:             `${this.testServiceURLsPrefix}listaIts${this.testServiceURLsSuffix}`,
    listaSolicitantes:    `${this.testServiceURLsPrefix}listaSolicitantes${this.testServiceURLsSuffix}`,
    listaTipos:           `${this.testServiceURLsPrefix}listaTipos${this.testServiceURLsSuffix}`,
    listaEspecialidades:  `${this.testServiceURLsPrefix}listaEspecialidades${this.testServiceURLsSuffix}`,
    listaAssuntos:        `${this.testServiceURLsPrefix}listaAssuntos${this.testServiceURLsSuffix}`,
    listaEdificacoes:     `${this.testServiceURLsPrefix}listaEdificacoes${this.testServiceURLsSuffix}`,
    listaTecnicos:        `${this.testServiceURLsPrefix}listaTecnicos${this.testServiceURLsSuffix}`,
    verificaMPRJ:         `${this.testServiceURLsPrefix}verificaMPRJ_#{parameters}${this.testServiceURLsSuffix}`,
    listaMPRJsVinculados: `${this.testServiceURLsPrefix}listaMPRJs_#{parameters}${this.testServiceURLsSuffix}`,
    listaSubTipos:        `${this.testServiceURLsPrefix}listaSubTipos_#{parameters}${this.testServiceURLsSuffix}`,
    listaServicos:        `${this.testServiceURLsPrefix}listaServicos_#{parameters}${this.testServiceURLsSuffix}`,
    downloadPDF:          `${this.testServiceURLsPrefix}downloadPDF_#{parameters}.pdf`,
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

  public fetchListaSubTipos(tipoId: number): Observable < ITipos[] > {
    let serviceName: string = 'listaSubTipos';
    let url:         string = this.serviceURLs.listaSubTipos.replace('#{parameters}', String(tipoId));
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

  public fetchListaServicos(especialidadeId: number): Observable < IServicos[] > {
    let serviceName: string = 'listaServicos';
    let url:         string = this.serviceURLs.listaSubTipos.replace('#{parameters}', String(especialidadeId));
    return this.http.get(url)
      .map((response: Response) => {
        return < IServicos[] > response.json();
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

  public fetchVerificaMPRJ(mprj: string): Observable < IMPRJDocuDK > {
    let serviceName: string = 'verificaMPRJ';
    let url:         string = this.serviceURLs.verificaMPRJ.replace('#{parameters}', mprj);
    return this.http.get(url)
      .map((response: Response) => {
        return < IMPRJDocuDK > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public fetchListaMPRJsVinculados(mprj: string): Observable < IMPRJ[] > {
    let serviceName: string = 'listaMPRJsVinculados';
    let url:         string = this.serviceURLs.listaMPRJsVinculados.replace('#{parameters}', mprj);
    return this.http.get(url)
      .map((response: Response) => {
        return < IMPRJ[] > response.json();
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public postFormData(fileToUpload: File, formFields: any) {
    let serviceName:     string = 'formPost';
    let url:             string = this.serviceURLs.formPost;
    const headers               = new Headers({});
    let options                 = new RequestOptions({headers});

    let formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.set('form', formFields);

    this.http.post(url, formData, options).subscribe(res => {
      let body = res.json();
    });
  }

  public isAuthenticated(): Observable < boolean > {
    let serviceName: string = 'authenticated';
    let url:         string = this.serviceURLs.isAuthenticated;
    return this.http.get(url)
      .map((response: Response) => {
        return true;
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  public authenticate(user: string, unencodedPassword: string): Observable < boolean > {
    let serviceName:     string = 'authenticate';
    let encodedPassword: string = btoa(unencodedPassword);
    let url:             string = this.serviceURLs.authenticate.replace('#{usuario}', user).replace('#{senhaCodificada}', encodedPassword);
    const headers               = new Headers({});
    let options                 = new RequestOptions({headers});
    // let formData: FormData = new FormData();
    // formData.append('username',         user);
    // formData.append('password',         encodedPassword);
    // formData.append('ignoreAuthModule', 'ignoreAuthModule');
    let _formData: any = {username: user, password: encodedPassword, ignoreAuthModule: 'ignoreAuthModule'};
    return this.http.post(url, _formData, options)
      .map((response: Response) => {
        return true;
      }).catch((error:any) => Observable.throw(error.json().error || this.getErrorMessage(serviceName, url)));
  }

  private getErrorMessage(serviceName: string, url: string) {
    return `Erro ao resgatar '${serviceName}' de '${url}'`;
  }

}
