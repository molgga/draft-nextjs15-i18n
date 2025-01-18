import { cookies } from 'next/headers';
import { LocaleConfigLangCookieKey } from '../types';

interface Options {
  fallbackLang?: 'en' | 'ko' | 'ja';
}

export async function getServerLangByCookie(options?: Options) {
  const { fallbackLang } = options || {};
  const cookie = await cookies();
  return cookie.get(LocaleConfigLangCookieKey)?.value || fallbackLang || '';
}
