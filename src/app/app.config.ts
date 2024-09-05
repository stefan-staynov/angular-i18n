import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { loadTranslations } from '@angular/localize';
import { registerLocaleData } from '@angular/common';

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

function initializeAppFactory(): () => Promise<void> {
  return async () => {
    const localConfig = await getLocalConfig(locale);

    if (!localConfig) {
      return;
    }

    const localeMessages = await fetch(localConfig.url).then(r => r.json());

    loadTranslations(localeMessages.translations);
    $localize.locale = locale;
    registerLocaleData(localConfig.module);
  }
}

async function getLocalConfig(locale: string) {
  switch (locale) {
    case 'bg':
      return {
        locale: 'bg',
        url: '/locale/messages.bg.json',
        module: (await import('../../node_modules/@angular/common/locales/bg')).default,
      };
    default:
      return null;
  }
}
