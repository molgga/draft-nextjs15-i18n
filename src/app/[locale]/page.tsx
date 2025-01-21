import { useTranslations } from 'next-intl';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  return (
    <div>
      <div>home</div>
      <div>locale: {locale}</div>
      <br />
      <Home />
    </div>
  );
}

function Home() {
  const tNavi = useTranslations('Navi');
  return (
    <>
      <h3>i18n 출력 테스트: {tNavi('네비_홈')}</h3>
    </>
  );
}
