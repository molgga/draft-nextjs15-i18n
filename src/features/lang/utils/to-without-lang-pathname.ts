import { SupportLangPrefix } from '../types';

export function toWithoutLangPathname(pathname: string) {
  return pathname.replace(SupportLangPrefix, '');
}
