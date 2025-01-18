export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  return (
    <div>
      <div>home</div>
      <div>lang: {lang}</div>
    </div>
  );
}
