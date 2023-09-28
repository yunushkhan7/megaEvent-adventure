import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  defaultLangCode =  'en';
  language = [
    { code: 'en', key: 'english', value: 'English' },
    { code: 'ch', key: 'Chinese', value: '中國人' },
    { code: 'ja', key: 'Japanese', value: '日本語' },
  ];
  activeLang: any;

  constructor(
    public translate: TranslateService,
  ){
    if (localStorage.getItem('currentLanguage')) {
      (translate.getLangs().includes(localStorage.getItem('currentLanguage') || '') ?
        this.activeLang = localStorage.getItem('currentLanguage')  :
        this.activeLang = this.defaultLangCode
      )
    }
    else{
      this.activeLang = this.defaultLangCode;
    }
  }

  ngOnInit() {
    this.translate.use(this.activeLang);
  }

  onLanguageChange() {
    localStorage.setItem('currentLanguage', this.activeLang);
    this.translate.use(this.activeLang);
 }

}
