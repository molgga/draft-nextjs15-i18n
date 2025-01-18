import { NextRequest, NextResponse } from 'next/server';

const LocaleConfig = Object.freeze({
  Locales: ['en', 'ko', 'ja'],
  DefaultLocale: 'en',
});

const CookeyKey = Object.freeze({
  Lang: 'fe-lang',
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

/**
 * API 에서는 클라이언트의 셋팅된 언어가 필요하기 때문에 쿠키에 심어둔다.
 * API 에서도 accept-language 헤더 등으로 언어셋을 알 수 있지만
 * 클라이언트에서 en 사용자가 ko 로 언어변경을 해서 사용하고 있다면 ko 언어로 내려줘야한다.
 */
function setCookieLang(response: NextResponse, { lang }: { lang: string }) {
  response.cookies.set(CookeyKey.Lang, lang);
}

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
    const response = NextResponse.next();
    setCookieLang(response, { lang: pathLocale });
    return response;
  }

  request.nextUrl.pathname = `/${lang}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  setCookieLang(response, { lang });
  return response;
}

export const config = {
  matcher: [
    // 모든 패스에 locale 적용, 특정 패턴 제외
    '/((?!_next|api).*)',
  ],
};
