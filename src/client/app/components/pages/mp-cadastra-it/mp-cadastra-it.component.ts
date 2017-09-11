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


interface ExpandableSelectItem extends SelectItem {
  category: string;
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
  listaSolicitantes:   ExpandableSelectItem[];
  listaTipos:          SelectItem[];
  listaEspecialidades: SelectItem[];
  listaAssuntos:       SelectItem[];
  listaEdificacoes:    SelectItem[];
  listaTecnicos:       SelectItem[];

  // dados do backend para as listas dinâmicas
  listaSubTipos:          SelectItem[];
  listaServicos:          SelectItem[];
  listaMPRJPrincipais:    SelectItem[];
  listaMPRJVinculados:    SelectItem[];
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
  solicitanteId:              string;
  _tipoIdOrNewTipoText:       string;   // editable drop down, com evento de edição
  subTipoIdOrNewSubTipoText:  string;   // editable drop down, sem eventos
  _especialidadeId:           string;
  servicoId:                  string;
  assuntoId:                  string;
  edificacaoId:               string;
  tecnicoId:                  string;

  fileToUpload: File;

  //Data
  formato: any;
  calendario: Date;
  minDate: Date;
  maxDate: Date;

  //Mapa
  options: any;
  overlays: any[];
  dialogVisible: boolean;
  markerTitle: string;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean;

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
          this.listaMPRJVinculados.push({label: mprj.mprj, value: mprj.id});
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
          this.listaMPRJPrincipais.push({label: mprj.mprj, value: mprj.id});
        }
      }
    }, error => this.fetchedMPRJsVinculadosErrorMessage = <any>error);
  }

  setFileToUpload($event) {
    let files: FileList = $event.target.files || $event.srcElement.files;
    this.fileToUpload = files[0];
  }

  submit() {
    // post de algo como
    // {"solicitante":"CRAAI ANGRA DOS REIS",
    //  "principal":"15926366",
    //  "vinculado":"16120829",
    //  "tipo":"Teste",
    //  "subtipo":"tester",
    //  "edificacoes":[{"nome":"edf"}],
    //  "formacao":"70",
    //  "servicos":[{"nome":"srv"}],
    //  "assuntos":[{"nome":"Biossegurança e Organismos Transgênicos "}],
    //  "dtElab":"05/09/2017",
    //  "dtVistoria":"05/09/2017",
    //  "local":"local",
    //  "logradouro":"rua",
    //  "num":123,
    //  "complemento":"123",
    //  "bairro":"bairro",
    //  "cidade":"cidadeuf",
    //  "cep":"2244035",
    //  "latitude":-22.826820400544044,
    //  "longitude":-43.2861328125,
    //  "tecnicos":[{"mat":"00007374","nome":"ADRIANA DE LIMA SILVA"}],
    //  "opiniaoTecnica":"optec"}
    let formFields: any = {
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
    this.gateProDataServices.postFormData(this.fileToUpload, formFields).subscribe(response => {
      this.postFormDataResult = response;
    }, error => this.postFormDataErrorMessage = <any>error);
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
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };
  }

    handleMapClick(event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    }

    handleOverlayClick(event) {
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
    }
}

export class MyModel {

    options: any;

    overlays: any[];

    ngOnInit() {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };
    }

}
