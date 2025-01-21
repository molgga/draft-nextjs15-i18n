import { SupportLocalePrefix } from '../types';

export function toWithoutLocalePathname(pathname: string) {
  return pathname.replace(SupportLocalePrefix, '');
}
