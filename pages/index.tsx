import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { t } = useTranslation();

  const [name, setName] = useState<string>("한윤성");

  return (
    <div>
      <h1>Hello World!</h1>
      <p>{t("common:안녕하세요")}</p>
      <select
        defaultValue={router.locale}
        onChange={(e) =>
          router.push({ pathname, query }, asPath, { locale: e.target.value })
        }
      >
        <option value="ko">{t("common:한국어")}</option>
        <option value="en">{t("common:영어")}</option>
        <option value="ja">{t("common:일본어")}</option>
      </select>

      <h2>변수 사용</h2>
      <input type="text" onChange={(e) => setName(() => e.target.value)} />
      <p>{t("home:이름", { name })}</p>

      <h2>리스트</h2>
      <ol>
        {(t("home:항목", { returnObjects: true }) as [])?.map((elem) => (
          <li key={elem}>{elem}</li>
        ))}
      </ol>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "home"])),
      },
    };
  }

  return {
    props: {},
  };
}
