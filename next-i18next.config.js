module.exports = {
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en", "ja"],

    /** true로 설정 시 Next.js에서 자동으로 접속한 사용자의 로케일로 표시함 */
    localeDetection: false,

    pages: {
      "*": ["common"],
    },
  },
};
