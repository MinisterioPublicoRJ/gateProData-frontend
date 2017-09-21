// libs
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Injector } from '@angular/core';
import { Config, RouterExtensions, ConsoleService } from '../../../modules/core/index';

import { SelectItem,
         GMapModule  } from 'primeng/primeng';

// services
import { GateProDataServices } from '../../../services/GateProDataServices';

// interfaces
import { ICadastrar } from '../../../services/ICadastrar';

interface SelectObjectItem extends SelectItem {
  object: any;
}

interface ExpandableSelectObjectItem extends SelectObjectItem {
  category: string;
}

interface EditableMultiSelectObjectItem extends SelectObjectItem {
  newOption ?: boolean;
}


@Component({
  moduleId: module.id,
  selector: 'mp-cadastra-it',
  templateUrl: 'mp-cadastra-it.component.html',
  styleUrls: ['mp-cadastra-it.component.css']
})
export class MPCadastraITComponent {

  // autenticação
  isAuthenticated:       boolean;

  // dados do backend para as listas estáticas
  //listaITs:            IITs[];
  listaSolicitantes:   ExpandableSelectObjectItem[];
  listaTipos:          SelectObjectItem[];
  listaEspecialidades: SelectObjectItem[];
  listaAssuntos:       SelectObjectItem[];
  listaEdificacoes:    EditableMultiSelectObjectItem[];
  listaTecnicos:       SelectObjectItem[];

  // dados do backend para as listas dinâmicas
  listaSubTipos:          SelectObjectItem[];
  listaServicos:          EditableMultiSelectObjectItem[];
  listaMPRJPrincipais:    SelectObjectItem[];
  listaMPRJVinculados:    SelectObjectItem[];
  fetchedMPRJsVinculados: String[];

  // resultado do cadastro
  postFormDataResult: ICadastrar;

  // mensagens de erro do backend
  isAuthenticatedErrorMessage:        string;
  //listaITsErrorMessage:               string;
  fetchedMPRJsVinculadosErrorMessage: string;
  listaSolicitantesErrorMessage:      string;
  listaTiposErrorMessage:             string;
  listaEspecialidadesErrorMessage:    string;
  listaAssuntosErrorMessage:          string;
  listaEdificacoesErrorMessage:       string;
  listaTecnicosErrorMessage:          string;
  listaSubTiposErrorMessage:          string;
  listaServicosErrorMessage:          string;
  postFormDataErrorMessage:           string;


  // itens selecionados das listas;
  itId:                       string;
  mprjPrincipalId:            string;
  mprjVinculadoId:            string;
  mprjPrincipalText:          string;
  mprjVinculadoText:          string;
  solicitanteTexto:           string;
  _tipoIdOrNewTipoText:       string;   // editable drop down, com evento de edição
  subTipoIdOrNewSubTipoText:  string;   // editable drop down, sem eventos
  _especialidadeId:           string;
  servicosSelecionados:       string[];
  assuntosSelecionados:       string[];
  edificacoesSelecionadas:    string[];
  tecnicosSelecionados:       string[];

  fileToUpload: File;

  //Datas
  dtElab:     Date;
  dtVistoria: Date;
  // campos de controle do componente calendário
  formato:    any;
  minDate:    Date;
  maxDate:    Date;

  //Mapa
  latitude:  string;
  longitude: string;
  // campos de controle do componente do mapa
  options: any;
  overlays: any[];
  markerTitle: string;
  infoWindow: any;
  draggable: boolean;

  // campos digitáveis
  local:       string;
  logradouro:  string;
  numero:      string;
  complemento: string;
  bairro:      string;
  cidade:      string;
  cep:         string;
  optec:       string;


  constructor(private injector: Injector,
              public routerext: RouterExtensions,
              private console: ConsoleService,
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
        this.listaSolicitantes.push({label: solicitante.nome, value: solicitante.nome, object: solicitante, category: solicitante.craai});
      }
      this.ngOnChanges();
    }, error => this.listaSolicitantesErrorMessage = <any>error);

    // listaTipos
    this.gateProDataServices.fetchListaTipos().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaTipos = [];
      for (let tipo of response) {
        this.listaTipos.push({label: tipo.nome, value: tipo.id, object: tipo});
      }
      this.ngOnChanges();
    }, error => this.listaTiposErrorMessage = <any>error);

    // listaEspecialidades
    this.gateProDataServices.fetchListaEspecialidades().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaEspecialidades = [];
      for (let especialidade of response) {
        this.listaEspecialidades.push({label: especialidade.nome, value: especialidade.id, object: especialidade});
      }
      this.ngOnChanges();
    }, error => this.listaEspecialidadesErrorMessage = <any>error);

    // listaAssuntos
    this.gateProDataServices.fetchListaAssuntos().subscribe(response => {
      response = response.sort((e1, e2) => e2.a < e1.a ? 1 : -1);
      this.listaAssuntos = [];
      for (let assunto of response) {
        this.listaAssuntos.push({label: assunto.a, value: assunto.c, object: assunto});
      }
      this.ngOnChanges();
    }, error => this.listaAssuntosErrorMessage = <any>error);

    // listaEdificacoes
    this.gateProDataServices.fetchListaEdificacoes().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaEdificacoes = [];
      for (let edificacao of response) {
        this.listaEdificacoes.push({label: edificacao.nome, value: edificacao.nome, object: edificacao});
      }
      // prepara lista para poder incluir novos elementos
      this.pMultiSelectOnChange(this.listaEdificacoes);
      this.ngOnChanges();
    }, error => this.listaEdificacoesErrorMessage = <any>error);

    // listaTecnicos
    this.gateProDataServices.fetchListaTecnicos().subscribe(response => {
      response = response.sort((e1, e2) => e2.nome < e1.nome ? 1 : -1);
      this.listaTecnicos = [{label: 'Técnico Inexistente', value: '', object: {}}];
      for (let tecnico of response) {
        this.listaTecnicos.push({label: tecnico.nome, value: tecnico.nome, object: tecnico});
      }
      this.ngOnChanges();
    }, error => this.listaTecnicosErrorMessage = <any>error);

  }

  ngOnChanges() {
    // if (this.listaSolicitantes) {
    //   this.listaSolicitantes = this.listaSolicitantes.sort((e1, e2) => ((e2.craai > e1.craai) || ((e2.craai === e1.craai) && (e2.nome > e1.nome))) ? 1 : -1);
    // }
  }

  searchMPRJPrincipal(event) {
    console.log(`'searchMPRJPrincipal' chamado com '${event.query}'`);
    this.gateProDataServices.fetchListaMPRJsVinculados(event.query).subscribe(response => {
      console.log(`'searchMPRJPrincipal' completou a query e ${response.length} elementos foram retornados`);
      this.fetchedMPRJsVinculados = [];
      this.listaMPRJVinculados = null;
      if (response.length > 0) {
        this.listaMPRJVinculados = [];
        // encontra id do MPRJ digitado, preenche sugestões de MPRJs vinculados e lista de MPRJs vinculados
        for (let mprj of response) {
          if (mprj.mprj == this.mprjPrincipalText) {
            this.mprjPrincipalId = mprj.id;
            this.fetchedMPRJsVinculados.push(mprj.mprj);
          }
          this.listaMPRJVinculados.push({label: mprj.mprj, value: mprj.id, object: mprj});
        }
      }
    }, error => this.fetchedMPRJsVinculadosErrorMessage = <any>error);
  }

  searchMPRJVinculado(event) {
    console.log(`'searchMPRJVinculado' chamado com '${event.query}'`);
    this.gateProDataServices.fetchListaMPRJsVinculados(event.query).subscribe(response => {
      console.log(`'searchMPRJVinculado' completou a query e ${response.length} elementos foram retornados`);
      this.fetchedMPRJsVinculados = [];
      this.listaMPRJPrincipais = null;
      if (response.length > 0) {
        this.listaMPRJPrincipais = [];
        // encontra id do MPRJ digitado, preenche sugestões de MPRJs vinculados e lista de MPRJs vinculados
        for (let mprj of response) {
          if (mprj.mprj == this.mprjVinculadoText) {
            this.mprjVinculadoId = mprj.id;
            this.fetchedMPRJsVinculados.push(mprj.mprj);
          }
          this.listaMPRJPrincipais.push({label: mprj.mprj, value: mprj.id, object: mprj});
        }
      }
    }, error => this.fetchedMPRJsVinculadosErrorMessage = <any>error);
  }

  setFileToUpload($event) {
    let files: FileList = $event.target.files || $event.srcElement.files;
    this.fileToUpload = files[0];
  }

  // Função para ser usada como (onChange) dos componentes p-multiSelect editáveis.
  // Garante que 'multiselectList[0]' será sempre um elemento vazio, para permitir edição.
  // Depende de conteúdo específico da clausula <ng-template> no componente <p-multiSelect>
  //  <input *ngIf="option.newOption" type="text" placeholder="(novo item, digite)" [(ngModel)]="option.value">
  //  <span *ngIf="!option.newOption">{{option.label}}</span>
  pMultiSelectOnChange(multiselectList: EditableMultiSelectObjectItem[]) {
    // garante que elemento #0 está vazio, para poder ser editado
    if ((multiselectList.length == 0) || (!multiselectList[0].newOption) || (multiselectList[0].newOption && (multiselectList[0].value != '')) ) {
      console.log(`um elemento zerado FOI adicionado ao multiselectList`);
      multiselectList.splice(0, 0, {label: '', value: '', newOption: true, object: null});
    } else {
      console.log(`um elemento zerado NÃO foi adicionado ao multiselectList pois #0 = {label: '${multiselectList[0].label}', value: '${multiselectList[0].value}', newOption: ${multiselectList[0].newOption}}. Porém, ${this.mprjVinculadoText}`);
    }
    for (let o of multiselectList) {
      if (o.newOption) {
        o.label = o.value;
      } else {
        break;
      }
    }
  }

  // retorna a mensagem de negação ou uma string vazia, se está tudo certo
  checkNotNullNorEmpty(value: any, fieldName: string): string {
    let isOK;
    if (value == null) {
      isOK = false;
    } else {
      console.log(`Tipo de ${fieldName}: ${typeof value}`);
      if (typeof value === 'string') {
        isOK = value > '';
      } else if (value instanceof Date) {
        isOK = true;
      } else if (typeof value === 'object') {
        isOK = value.length > 0;
      } else {
        isOK = false;
      }
    }

    if (isOK) {
      return '';
    } else {
      return `* Campo ${fieldName}: preencha;\n`;
    }
  }

  submit() {
    let _formFields: any = {
      solicitante:    'CRAAI ANGRA DOS REIS',
      principal:      '15926366',
      vinculado:      '16120829',
      tipo:           'Teste',
      subtipo:        'tester',
      edificacoes:    [{nome: 'edf'}],
      formacao:       '70',
      servicos:       [{nome: 'srv'}],
      assuntos:       [{nome: 'Biossegurança e Organismos Transgênicos '}],
      dtElab:         '05/09/2017',
      dtVistoria:     '05/09/2017',
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
      opiniaoTecnica: 'optec'};

    let formFields: any = {
      solicitante:    this.solicitanteTexto,
      principal:      this.mprjPrincipalId,
      vinculado:      this.mprjVinculadoId,
      tipo:           this.tipoIdOrNewTipoText,
      subtipo:        this.subTipoIdOrNewSubTipoText,
      edificacoes:    (this.edificacoesSelecionadas || []).filter(nomeEdificacao => nomeEdificacao !== '').map(nomeEdificacao => { return {nome: nomeEdificacao}; }),
      formacao:       this.especialidadeId,
      servicos:       (this.servicosSelecionados || []).filter(nomeServico => nomeServico !== '').map(nomeServico => { return {nome: nomeServico}; }),
      assuntos:       (this.assuntosSelecionados || []).filter(nomeAssunto => nomeAssunto !== '').map(nomeAssunto => { return {nome: nomeAssunto}; }),
      dtElab:         (this.dtVistoria && this.dtVistoria.toLocaleDateString('pt-BR')) || '0/0/0',
      dtVistoria:     (this.dtElab     && this.dtElab.toLocaleDateString('pt-BR'))     || '0/0/0',
      local:          this.local,
      logradouro:     this.logradouro,
      num:            this.numero,
      complemento:    this.complemento,
      bairro:         this.bairro,
      cidade:         this.cidade,
      cep:            this.cep,
      latitude:       this.latitude,
      longitude:      this.longitude,
      tecnicos:       (this.tecnicosSelecionados || []).filter(nomeTecnico => nomeTecnico !== '').map(nomeTecnico => { return {mat: (this.listaTecnicos.find(tecnicoSelectObjectItem => tecnicoSelectObjectItem.value == nomeTecnico).object || {}).mat, nome: nomeTecnico}; }),
      opiniaoTecnica: this.optec};

    let isValidated: boolean = false;
    this.postFormDataErrorMessage = this.checkNotNullNorEmpty(this.solicitanteTexto,          'Solicitante') +
                                    this.checkNotNullNorEmpty(this.mprjPrincipalId ||
                                                              this.mprjVinculadoId,           'MPRJ Principal e/ou MPRJ Vinculado') +
                                    this.checkNotNullNorEmpty(this.tipoIdOrNewTipoText,       'Tipo') +
                                    this.checkNotNullNorEmpty(this.subTipoIdOrNewSubTipoText, 'Sub Tipo') +
                                    this.checkNotNullNorEmpty(this.edificacoesSelecionadas,   'Edificações') +
                                    this.checkNotNullNorEmpty(this.especialidadeId,           'Formação') +
                                    this.checkNotNullNorEmpty(this.servicosSelecionados,      'Serviços') +
                                    this.checkNotNullNorEmpty(this.assuntosSelecionados,      'Assuntos') +
                                    this.checkNotNullNorEmpty(this.dtVistoria,                'Data da Vistoria') +
                                    this.checkNotNullNorEmpty(this.dtElab,                    'Data da Elaboração') +
                                    this.checkNotNullNorEmpty(this.local,                     'Local') +
                                    this.checkNotNullNorEmpty(this.logradouro,                'Logradouro') +
                                    this.checkNotNullNorEmpty(this.numero,                    'Número') +
                                    this.checkNotNullNorEmpty(this.bairro,                    'Bairro') +
                                    this.checkNotNullNorEmpty(this.cidade,                    'Cidade') +
                                    this.checkNotNullNorEmpty(this.cep,                       'CEP') +
                                    this.checkNotNullNorEmpty(this.latitude,                  'Latitude') +
                                    this.checkNotNullNorEmpty(this.longitude,                 'Longitude') +
                                    this.checkNotNullNorEmpty(this.tecnicosSelecionados,      'Técnicos') +
                                    this.checkNotNullNorEmpty(this.optec,                     'Opinião Técnica');

    // checa se o CEP tem 8 caracteres e é formado apenas por números
    if ( (this.cep != null) && ( (this.cep.length != 8) || (!Number(this.cep)) ) ) {
      this.postFormDataErrorMessage += '* Campo CEP deve conter 8 números -- e apenas números;\n';
    }
    // checa se número é um campo numérico (não deveria ser, mas, por enquanto, o banco só aceita números)
    if ( (this.numero != null) && (!Number(this.numero)) ) {
      this.postFormDataErrorMessage += '* Campo Número (erradamente) deve conter apenas números;\n';
    }

    isValidated = this.postFormDataErrorMessage === '';

    if (isValidated) {
      console.log(JSON.stringify(formFields));
      this.gateProDataServices.postFormData(this.fileToUpload, formFields).subscribe(response => {
        this.postFormDataResult = response;
      }, error => this.postFormDataErrorMessage = <any>error);
    } else {
      this.postFormDataResult = {errTxt: 'Recusado pelo Frontend', errCod: -1};
      this.postFormDataErrorMessage += "--> Corrija os erros acima e envie novamente";
    }
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
          this.listaSubTipos.push({label: subTipo.nome, value: subTipo.nome, object: subTipo});
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
          this.listaServicos.push({label: servico.servico, value: servico.id, object: servico});
        }
        // prepara lista para poder incluir novos elementos
        this.pMultiSelectOnChange(this.listaServicos);
        this.ngOnChanges();
      }, error => this.listaServicosErrorMessage = <any>error);
    }
  }

  // since 'Number' is not available for use on templates...
  toNumber(v: any): number {
    return Number(v);
  }

  ngOnInit() {
    this.formato = {
      firstDayOfWeek: 1,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    this.options = {
      center: {lat: -22.88756221517449, lng: -43.22021484375},
      zoom: 7
    };
  }

  handleMapClick(event) {
    let lat: string = event.latLng.lat();
    let lng: string = event.latLng.lng();
    console.log(`Map click event -- lat: ${lat}; lng: ${lng}`);
    this.latitude  = lat;
    this.longitude = lng;
  }

/*    handleOverlayClick(event) {
        let isMarker = event.overlay.getTitle != undefined;

        if(isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
        }
        else {
        }
    }

    zoomIn(map) {
        map.setZoom(map.getZoom()+1);
    }

    zoomOut(map) {
        map.setZoom(map.getZoom()-1);
    }

    clear() {
        this.overlays = [];
    }*/
}
