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
    const localConfig = await getLocaleConfig(locale);

    if (!localConfig) {
      return;
    }

    loadTranslations(localConfig.translations);
    $localize.locale = locale;
    registerLocaleData(localConfig.locale);
  }
}

async function getLocaleConfig(locale: string) {
  switch (locale) {
    case 'bg':
      return {
        code: 'bg',
        translations: (await import('../../public/locale/messages.bg.json')).translations,
        locale: (await import('../../node_modules/@angular/common/locales/bg')).default,
      };
    default:
      return null;
  }
}
