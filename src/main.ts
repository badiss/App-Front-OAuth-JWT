/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';


/*if (localStorage.getItem('locale') === null) {
  localStorage.setItem('locale', 'en');
  }
  
  const locale = localStorage.getItem('locale');
  declare const require:any;
  const translations = require(`raw-loader!./locale/messages.${locale}.xlf`);
  
  platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
      {provide: TRANSLATIONS, useValue: translations},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
    ]
  }) .catch(err => console.error(err));*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
