export type SupportLocaleTypes = 'en' | 'ko' | 'ja';

export const SupportLocalePrefix = /^\/(en|ko|ja)/;

export const LocaleConfigLocales = ['en', 'ko', 'ja'];

export const LocaleConfigDefault = 'en';

export const LocaleConfigCookieKey = 'NEXT_LOCALE'; // next-intl 의 쿠키key(변경시 next-intl 설정 확인 필요)

export interface LocaleVo {
  localeFull: string;
  locale: string;
}
