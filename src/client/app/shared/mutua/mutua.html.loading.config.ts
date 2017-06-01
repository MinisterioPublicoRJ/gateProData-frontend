
/*****************************************************
** AUTOMATICALLY CREATED HTML LOADING CONFIGURATION **
*****************************************************/

// Please, do not edit this file. It is automatically generated by 'build.mutua.ts' task on every build with information present in 'mutua.instance-project.config.ts' and 'mutua.available.modules.and.components.config.ts'

// Included by 'web.modules.ts' to load the needed components and modules and make them available to the application

// components
/////////////

import { NG2AppComponent } from '../../shared/modules/m-ng2-admin/ng2app.component';
import { MPEdificandoOControleInternoHomeComponent } from '../../components/pages/mp-edificando-o-controle-interno-home/mp-edificando-o-controle-interno-home.component';
import { MPFaleComOMPRJComponent } from '../../components/pages/mp-fale-com-o-mprj/mp-fale-com-o-mprj.component';
import { MPInformacoesGeraisComponent } from '../../components/pages/mp-informacoes-gerais/mp-informacoes-gerais.component';
import { MPMetodologiaComponent } from '../../components/pages/mp-metodologia/mp-metodologia.component';
import { MPOutrosRankingsComponent } from '../../components/pages/mp-outros-rankings/mp-outros-rankings.component';
import { MPRankingCompletoComponent } from '../../components/pages/mp-ranking-completo/mp-ranking-completo.component';

export const MutuaExportedComponents: any[] = [NG2AppComponent,MPEdificandoOControleInternoHomeComponent,MPFaleComOMPRJComponent,MPInformacoesGeraisComponent,MPMetodologiaComponent,MPOutrosRankingsComponent,MPRankingCompletoComponent];

// routes
/////////

import { MPEdificandoOControleInternoHomeRoutes } from '../../components/pages/mp-edificando-o-controle-interno-home/mp-edificando-o-controle-interno-home.routes';
import { MPFaleComOMPRJRoutes } from '../../components/pages/mp-fale-com-o-mprj/mp-fale-com-o-mprj.routes';
import { MPInformacoesGeraisRoutes } from '../../components/pages/mp-informacoes-gerais/mp-informacoes-gerais.routes';
import { MPMetodologiaRoutes } from '../../components/pages/mp-metodologia/mp-metodologia.routes';
import { MPOutrosRankingsRoutes } from '../../components/pages/mp-outros-rankings/mp-outros-rankings.routes';
import { MPRankingCompletoRoutes } from '../../components/pages/mp-ranking-completo/mp-ranking-completo.routes';

export const MutuaExportedRoutes: any[] = [...MPEdificandoOControleInternoHomeRoutes,...MPFaleComOMPRJRoutes,...MPInformacoesGeraisRoutes,...MPMetodologiaRoutes,...MPOutrosRankingsRoutes,...MPRankingCompletoRoutes];

// modules
//////////

// MNg2AdminModule
import { MNg2AdminModule } from '../modules/m-ng2-admin/m-ng2-admin.module';
// BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// MHelloWorldModule
import { MHelloWorldModule } from '../modules/m-hello-world/m-hello-world.module';
// NgbModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// PRIMENG_MODULES
import { AccordionModule,AutoCompleteModule,BlockUIModule,BreadcrumbModule,ButtonModule,CalendarModule,CarouselModule,ChartModule,CheckboxModule,CodeHighlighterModule,ConfirmDialogModule,ContextMenuModule,DataGridModule,DataListModule,DataScrollerModule,DataTableModule,DialogModule,DragDropModule,DropdownModule,EditorModule,FieldsetModule,FileUploadModule,GalleriaModule,GMapModule,GrowlModule,InplaceModule,InputMaskModule,InputSwitchModule,InputTextareaModule,InputTextModule,LightboxModule,ListboxModule,MegaMenuModule,MenubarModule,MenuModule,MessagesModule,MultiSelectModule,OrderListModule,OverlayPanelModule,PaginatorModule,PanelMenuModule,PanelModule,PasswordModule,PickListModule,ProgressBarModule,RadioButtonModule,RatingModule,ScheduleModule,SelectButtonModule,SharedModule,SlideMenuModule,SliderModule,SpinnerModule,SplitButtonModule,StepsModule,TabMenuModule,TabViewModule,TerminalModule,TieredMenuModule,ToggleButtonModule,ToolbarModule,TooltipModule,TreeModule,TreeTableModule,TriStateCheckboxModule } from 'primeng/primeng';
let PRIMENG_MODULES: any[] = [AccordionModule,AutoCompleteModule,BlockUIModule,BreadcrumbModule,ButtonModule,CalendarModule,CarouselModule,ChartModule,CheckboxModule,CodeHighlighterModule,ConfirmDialogModule,ContextMenuModule,DataGridModule,DataListModule,DataScrollerModule,DataTableModule,DialogModule,DragDropModule,DropdownModule,EditorModule,FieldsetModule,FileUploadModule,GalleriaModule,GMapModule,GrowlModule,InplaceModule,InputMaskModule,InputSwitchModule,InputTextareaModule,InputTextModule,LightboxModule,ListboxModule,MegaMenuModule,MenubarModule,MenuModule,MessagesModule,MultiSelectModule,OrderListModule,OverlayPanelModule,PaginatorModule,PanelMenuModule,PanelModule,PasswordModule,PickListModule,ProgressBarModule,RadioButtonModule,RatingModule,ScheduleModule,SelectButtonModule,SharedModule,SlideMenuModule,SliderModule,SpinnerModule,SplitButtonModule,StepsModule,TabMenuModule,TabViewModule,TerminalModule,TieredMenuModule,ToggleButtonModule,ToolbarModule,TooltipModule,TreeModule,TreeTableModule,TriStateCheckboxModule];

export const MutuaExportedModules: any[] = [MNg2AdminModule.forRoot(),BrowserAnimationsModule,MHelloWorldModule.forRoot(),NgbModule.forRoot(),...PRIMENG_MODULES];

export const MutuaAppComponent: any = NG2AppComponent;
