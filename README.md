# next.js에서 다국어(i18n) 적용하기

## Install

```shell
yarn add next-i18next
```

## 번역 파일

```md
public
└── locales
├── [language]
| └── [namespace].json
```

- 파일 위치를 수정하려면 `localePath` 옵션을 참고

## Config

### `next-i18next.config.js` 작성

```js
module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en", "ja"],

    /** true로 설정 시 Next.js에서 자동으로 접속한 사용자의 로케일로 표시함 */
    localeDetection: false,
  },
};
```

`next.config.js`

```js
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
};

module.exports = nextConfig;
```

### appWithTranslation로 app 감싸기

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
```

## 적용

- pages/index.tsx

```tsx
export default function Home() {
  const { t } = useTranslation();

  return (
    // ...
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }

  return {
    props: {},
  };
}
```

- 기본

```tsx
// { "안녕하세요": "안녕하세요" }
<p>{t("common:안녕하세요")}</p>
```

- 변수 사용

```tsx
// { "이름": "저는 {{name}}입니다." }
<p>{t("home:이름", { name })}</p>
```

- 리스트

```tsx
// { "항목": ["오늘 점심은 무엇을 먹을까요", "오늘 저녁을 무엇을 먹을까요?"] }
{
  (t("home:항목", { returnObjects: true }) as [])?.map((elem) => (
    <li key={elem}>{elem}</li>
  ));
}
```

## 라우팅

```tsx
export default function Home() {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return (
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
  );
}
```

- [nextjs i18n-routing](https://nextjs.org/docs/advanced-features/i18n-routing#transition-between-locales)

## 파일 분리

```ts
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["home"])),
      },
    };
  }

  return {
    props: {},
  };
}
```

`serverSideTranslations` 두번째 인자에 namespace를 넣는다.

## 참고

- [next-i18next](https://github.com/i18next/next-i18next)
- [nextjs document - i18n](https://nextjs.org/docs/advanced-features/i18n-routing)
- [cereme.dev](https://cereme.dev/frontend/i18n-flask-babel-next-i18next/)
