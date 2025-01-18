export type SupportLangTypes = 'en' | 'ko' | 'ja';

export const SupportLangPrefix = /^\/(en|ko|ja)/;

export const LocaleConfigLangs = ['en', 'ko', 'ja'];

export const LocaleConfigDefault = 'en';

export const LocaleConfigLangCookieKey = 'NEXT_LOCALE'; // next-intl 의 쿠키key(변경시 next-intl 설정 확인 필요)

export interface LocaleVo {
  locale: string;
  lang: string;
}
