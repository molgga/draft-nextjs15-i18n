import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const LocaleConfig = Object.freeze({
  Locales: ['en', 'ko', 'ja'],
  DefaultLocale: 'en',
});

const CookeyKey = Object.freeze({
  Lang: 'NEXT_LOCALE',
});

interface LocaleVo {
  locale: string;
  lang: string;
}

/**
 * 언어 꺼내기
 */
function getLocale(request: NextRequest): LocaleVo {
  // 헤더 accept-language
  const acceptedLanguages = request.headers.get('accept-language') || 'en';
  const settingCookieLang = request.cookies.get(CookeyKey.Lang)?.value;

  console.log('acceptedLanguages', acceptedLanguages);
  console.log('settingCookieLang', settingCookieLang);

  if (settingCookieLang) {
    const locale = LocaleConfig.Locales.find(
      (code) => code === settingCookieLang
    );
    if (locale) {
      return { locale, lang: locale.split('-')[0] };
    }
  }

  if (acceptedLanguages) {
    const langCodes = acceptedLanguages.split(',').map((v) => v.split('-')[0]); // 헤더 값에서 언어 코드만 ['en-US'] > ['en']
    const locale = langCodes.find((code) =>
      LocaleConfig.Locales.includes(code)
    ); // locale 찾기
    if (locale) {
      return { locale, lang: locale.split('-')[0] };
    }
  }
  // 지원하는 언어셋 없다면 기본 언어
  return {
    locale: LocaleConfig.DefaultLocale,
    lang: LocaleConfig.DefaultLocale.split('-')[0],
  };
}

const i18nMiddleware = createMiddleware(routing);

/**
 * 언어셋 미들웨어
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { lang, locale } = getLocale(request);

  const pathLocale = LocaleConfig.Locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  console.log('pathLocale', pathLocale);
  console.log('lang, locale', lang, locale);

  if (pathLocale) {
    // const response = NextResponse.next();
    const response = i18nMiddleware(request);
    return response;
  }

  request.nextUrl.pathname = `/${lang}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  return response;
}

export const config = {
  matcher: [
    // 모든 패스에 locale 적용, 특정 패턴 제외
    '/((?!_next|api).*)',
  ],
};
