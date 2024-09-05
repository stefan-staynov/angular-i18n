import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { loadTranslations } from '@angular/localize';
import { registerLocaleData } from '@angular/common';

import bgLocale from '@angular/common/locales/bg';
import bgTranslations from '../../public/locale/messages.bg.json';

const locale = localStorage.getItem('locale') || 'en';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: locale,
    }
  ]
};

function initializeAppFactory() {
  return () => {
    const localConfig = getLocaleConfig(locale);

    if (!localConfig) {
      return;
    }

    loadTranslations(localConfig.translations);
    $localize.locale = locale;
    registerLocaleData(localConfig.locale);
  };
}

function getLocaleConfig(locale: string) {
  switch (locale) {
    case 'bg':
      return {
        code: 'bg',
        translations: bgTranslations.translations,
        locale: bgLocale,
      };
    default:
      return null;
  }
}
