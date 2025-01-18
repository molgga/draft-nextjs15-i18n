import { useTranslations } from 'next-intl';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  return (
    <div>
      <div>about</div>
      <div>lang: {lang}</div>
      <br />
      <About />
    </div>
  );
}

function About() {
  const tNavi = useTranslations('Navi');

  return (
    <>
      <h3>네비_홈: {tNavi('네비_홈')}</h3>
      <h3>네비_소개: {tNavi('네비_소개')}</h3>
    </>
  );
}
