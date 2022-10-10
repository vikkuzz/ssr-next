const withImages = require("next-images");
module.exports = withImages();

module.exports = {
  ...module.exports,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
};
