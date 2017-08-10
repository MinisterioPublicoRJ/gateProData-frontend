import {Component} from '@angular/core';

import {GlobalState} from '../../global.state';

@Component({
  moduleId: module.id,
  selector: 'ba-content-top',
  styleUrls: ['baContentTop.component.css'],
  templateUrl: 'baContentTop.component.html',
})
export class BaContentTop {

  public activePageTitle:string = '';

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
