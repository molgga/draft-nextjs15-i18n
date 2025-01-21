import { cookies } from 'next/headers';
import { LocaleConfigCookieKey, SupportLocaleTypes } from '../types';

interface Options {
  fallbackLocale?: SupportLocaleTypes;
}

export async function getServerLocaleByCookie(options?: Options) {
  const { fallbackLocale } = options || {};
  const cookie = await cookies();
  return cookie.get(LocaleConfigCookieKey)?.value || fallbackLocale || '';
}
