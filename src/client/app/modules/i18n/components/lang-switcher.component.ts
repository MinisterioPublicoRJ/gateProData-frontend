// libs
import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

// app
import { Config, ILang, LogService } from '../../core/index';
import { IAppState } from '../../ngrx/index';
import { ElectronEventService } from '../../electron/index';
import * as multilingual from '../actions/index';
import { MultilingualService, Languages, LanguageViewHelper } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'lang-switcher',
  templateUrl: 'lang-switcher.component.html',
  styleUrls: ['lang-switcher.component.css'],
})
export class LangSwitcherComponent {

  public lang: string;
  public supportedLanguages: Array<ILang>;
  public language: ILang;

  constructor(
    private store: Store<IAppState>,
    private log: LogService,
    @Inject(Languages) private languages,
    @Inject(LanguageViewHelper) private viewHelper
  ) {
    store.take(1).subscribe((s: any) => {
      // s && s.18n - ensures testing works in all cases (since some tests dont use i18n state)
      this.lang = s && s.i18n ? s.i18n.lang : '';
      this.supportedLanguages = languages;
      this.language = this.getLanguageFromLangCode(this.lang);
    });

    if (Config.IS_DESKTOP()) {
      // allow electron menu to talk to component
      ElectronEventService.on('changeLang').subscribe((e: any) => {
        this.changeLang({ target: { value: e.detail.value } });
      });
    }
  }

  changeLang(e: any) {
    let lang = this.supportedLanguages[0].code; // fallback to default 'en'

    if (Config.IS_MOBILE_NATIVE()) {
      if (e) {
        lang = this.supportedLanguages[e.newIndex].code;
      }
    } else if (e && e.target) {
      lang = e.target.value;
    }
    this.log.debug(`Language change: ${lang}`);
    this.language = this.getLanguageFromLangCode(this.lang);
    this.store.dispatch(new multilingual.ChangeAction(lang));
  }

  ngOnInit() {
    if (Config.IS_MOBILE_NATIVE() && this.viewHelper) {
      // {N} 3.0 requires SegmentedBarItem class for items
      // when binding to SegmentedBar
      this.supportedLanguages = this.viewHelper;
    }
  }

  /** allows changing the language from UI clicks */
  clkSetLanguage(clickedLang: ILang) {
    let lang = clickedLang.code;
    this.language = this.getLanguageFromLangCode(lang);
    this.store.dispatch(new multilingual.ChangeAction(lang));
  }

  /** method to sinc the ILang model to the 'lang' text */
  private getLanguageFromLangCode(langCode: string): ILang {
    for (let i in this.supportedLanguages) {
      let supportedLanguage: ILang = this.supportedLanguages[i];
      if (supportedLanguage.code === langCode) {
        return supportedLanguage;
      }
    }
    // else, return the default language
    return this.supportedLanguages[0];
  }

}
